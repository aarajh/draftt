import { SET_USER_INFO } from '../actions';

const defaultState = {
  email: '',
  username: '',
  uid: '',
  timestamp: '',
};

export default function user(state = defaultState, action) {
  const { data } = action;
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        ...data,
      };
    default:
      return state;
  }
}
