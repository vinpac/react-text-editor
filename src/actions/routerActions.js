import history from '../core/history';

export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
export const CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';

function updateLocation(method) {
  return (...args) => {
    history[method](...args);
    return {
      type: CALL_HISTORY_METHOD,
      payload: { method, args },
    };
  };
}

/**
 * These actions correspond to the history API.
 * The associated routerMiddleware will capture these events before they get to
 * your reducer and reissue them as the matching function on your history.
 */
export const push = updateLocation('push');
export const replace = updateLocation('replace');
export const go = updateLocation('go');
export const goBack = updateLocation('goBack');
export const goForward = updateLocation('goForward');