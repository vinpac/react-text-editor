import { LOGIN } from '../../actions/authActions';
import { handleAsyncAction } from '../../lib/reduxUtils';

const initialState = {};
const AuthUser = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN:
      return handleAsyncAction('user', state, action);
    default:
      return state;
  }
};

export default AuthUser;
