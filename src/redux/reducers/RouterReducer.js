import history from '../../core/history';
import {
  CALL_HISTORY_METHOD,
  LOCATION_CHANGE,
} from '../../actions/routerActions';

const initialState = {
  locationBeforeTransitions: null,
};

export default function router(state = initialState, { type, payload } = {}) {
  if (type === LOCATION_CHANGE) {
    return {
      ...state,
      locationBeforeTransitions: payload,
    };
  }

  if (type === CALL_HISTORY_METHOD) {
    return {
      ...state,
      location: history.location,
    };
  }

  return state;
}
