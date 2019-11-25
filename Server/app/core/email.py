from django.contrib.auth.tokens import default_token_generator
from .utils import encode_uid
from django.conf import settings
from django.core import mail
from django.template.context import make_context
from django.template.loader import get_template
from django.template.loader_tags import BlockNode, ExtendsNode
from django.views.generic.base import ContextMixin


class EmailMessage(mail.EmailMultiAlternatives, ContextMixin):
    _node_map = {
        'subject': 'subject',
        'text_body': 'body',
        'html_body': 'html',
    }
    template_name = None

    def __init__(self, request=None, context=None, template_name=None,
                 *args, **kwargs):
        super(EmailMessage, self).__init__(*args, **kwargs)

        self.request = request
        self.context = {} if context is None else context
        self.html = None

        if template_name is not None:
            self.template_name = template_name

    def get_context_data(self, **kwargs):
        ctx = super(EmailMessage, self).get_context_data(**kwargs)
        context = dict(ctx, **self.context)

        domain = settings.DOMAIN
        protocol = context.get('protocol') or 'https'
        site_name = context.get('site_name') or settings.SITE_NAME
        user = context.get('user')

        context.update({
            'domain': domain,
            'protocol': protocol,
            'site_name': site_name,
            'user': user
        })
        return context

    def render(self):
        context = make_context(self.get_context_data(), request=self.request)
        template = get_template(self.template_name)
        with context.bind_template(template.template):
            blocks = self._get_blocks(template.template.nodelist, context)
            for block_node in blocks.values():
                self._process_block(block_node, context)
        self._attach_body()

    def send(self, to, *args, **kwargs):
        self.render()

        self.to = to
        self.cc = kwargs.pop('cc', [])
        self.bcc = kwargs.pop('bcc', [])
        self.reply_to = kwargs.pop('reply_to', [])

        super(EmailMessage, self).send(*args, **kwargs)

    def _process_block(self, block_node, context):
        attr = self._node_map.get(block_node.name)
        if attr is not None:
            setattr(self, attr, block_node.render(context).strip())

    def _get_blocks(self, nodelist, context):
        blocks = {}
        for node in nodelist:
            if isinstance(node, ExtendsNode):
                parent = node.get_parent(context)
                blocks.update(self._get_blocks(parent.nodelist, context))
        blocks.update({
            node.name: node for node in nodelist.get_nodes_by_type(BlockNode)
        })
        return blocks

    def _attach_body(self):
        if self.body and self.html:
            self.attach_alternative(self.html, 'text/html')
        elif self.html:
            self.body = self.html
            self.content_subtype = 'html'


class ActivationEmail(EmailMessage):
    template_name = "activate_account.html"

    def get_context_data(self):
        # ActivationEmail can be deleted
        context = super().get_context_data()

        user = context.get("user")
        context["uid"] = encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.ACTIVATION_URL.format(**context)
        return context
