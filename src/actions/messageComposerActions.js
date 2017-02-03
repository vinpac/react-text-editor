import {
  createAsyncAction,
  createMetaAction,
} from '../lib/reduxUtils';
import { fetchJSON } from '../lib/requestUtils';

export const SEND_MESSAGE = 'SEND_MESSAGE';

const sendMessageAction = createMetaAction(SEND_MESSAGE);
export function sendMessage(message) {
  return createAsyncAction(sendMessageAction,
    (dispatch, getState) => {
      const { auth: { user: authUser } } = getState();
      if (!authUser) {
        throw new Error('Not logged in');
      }

      return fetchJSON('/api/messages/send', {
        body: { message },
      });
    },
  );
}
