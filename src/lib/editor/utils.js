import { getDefaultKeyBinding } from 'draft-js';
import { forEach } from '../objectUtils';

export function getSelectionRect(selection) {
  let rect = selection.getRangeAt(0).getBoundingClientRect();
  if (!(rect && rect.top)) {
    rect = selection.getRangeAt(0).getClientRects()[0];
  }

  if (!rect &&
    (selection.anchorNode && selection.anchorNode.getBoundingClientRect)
  ) {
    rect = selection.anchorNode.getBoundingClientRect();
    rect.isEmptline = true;
  }

  return rect;
}

export function hasAltModifier(e) {
  return e.nativeEvent.altKey;
}

export function hasCommandModifier(e) {
  return e.nativeEvent.ctrlKey;
}


export function createSubscribeableStore(initialState, asArray = false) {
  let state = initialState || {};
  const listeners = [];

  const subscribe = (callback) => {
    listeners.push(callback);
  };

  const unsubscribe = (callback) => {
    const index = listeners.indexOf(callback);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  };

  const merge = (obj) => {
    if (!asArray) {
      state = { ...state, ...obj };
    } else {
      state = [...state, ...obj];
    }

    listeners.forEach(listener => listener());
  };

  const set = (key, item) => {
    if (!asArray) {
      if (state[key] === item) {
        return;
      }

      state = {
        ...state,
        [key]: item,
      };
    } else {
      state = [
        ...state,
        key,
      ];
    }


    listeners.forEach(listener => listener());
  };

  const includes = (item) => {
    let contain = false;
    forEach(state, storeItem => {
      contain = storeItem === item;
      return !contain;
    });
    return contain;
  };

  const get = (key) => state[key];

  return {
    get,
    includes,
    merge,
    subscribe,
    unsubscribe,
    [asArray ? 'add' : 'set']: set,
  };
}


export function createSubscribeableArrayStore(initialState) {
  return createSubscribeableStore(initialState, true);
}

export function keyBindingFn(e) {
  /* ctrl+alt+1 */
  if (e.keyCode === 49 && hasAltModifier(e) && hasCommandModifier(e)) {
    return 'header-one';
  }
  /* ctrl+alt+2 */
  if (e.keyCode === 50 && hasAltModifier(e) && hasCommandModifier(e)) {
    return 'header-two';
  }

  return getDefaultKeyBinding(e);
}
