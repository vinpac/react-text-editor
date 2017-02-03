import { fetchJSON } from '../lib/requestUtils';
import {
  createAsyncAction,
  createMetaAction,
} from '../lib/reduxUtils';

export const LOGIN = 'LOGIN';

const loginAction = createMetaAction(LOGIN);
export function tryToLogin(email, password) {
  return createAsyncAction(loginAction,
    () => {
      const form = new FormData();
      form.append('a', 1);

      return fetchJSON('http://httpbin.org/post', {
        method: 'POST',
        body: { email, password },
      });
    },
  );
}
