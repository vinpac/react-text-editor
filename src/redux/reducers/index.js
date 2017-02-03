import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RouterReducer from './RouterReducer';

export default combineReducers({
  auth: AuthReducer,
  router: RouterReducer,
});
