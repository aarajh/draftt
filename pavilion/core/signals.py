from django.db.models.signals import post_save
from .models import User
from .email import WelcomeEmail


def send_welcome_email(sender, instance, created, update_fields, **kwargs):
    """ Sends a welcome email when account is verified """
    if created or update_fields is None or 'is_verified' not in update_fields:
        return
    if instance.is_verified and not instance.is_superuser:
        context = {'user': instance}
        WelcomeEmail(context=context).send([instance.email])


post_save.connect(send_welcome_email, sender=User)
