import { createAction } from 'redux-actions';

export const createMetaAction = (type) => (
  createAction(type, undefined, (_, meta) => meta)
);

export function createAsyncAction(actionCreator, fn) {
  return async (dispatch, getState) => {
    dispatch(actionCreator());
    try {
      const data = await fn(dispatch, getState);
      dispatch(actionCreator(data));
    } catch (error) {
      if (!(error instanceof Error)) {
        // Pass it as a meta then
        dispatch(actionCreator(new Error(error), error));
        return;
      }
      dispatch(actionCreator(error));
    }
  };
}

export function handleAsyncAction(handlePayload, state, action) {
  if (action.error) {
    return {
      failed: true,
      error: action.meta,
    };
  }

  if (action.payload) {
    if (!handlePayload) {
      return {};
    }

    if (typeof handlePayload === 'string') {
      return {
        [handlePayload]: action.payload,
      };
    }

    if (typeof handlePayload === 'function') {
      return handlePayload(action.payload);
    }

    return handlePayload;
  }

  return {
    isFetching: true,
  };
}
