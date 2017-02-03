import { DEFAULT_LOCALE } from '../common/constants';

const state = {
  messages: {},
  locale: DEFAULT_LOCALE,
};

export function setupIntl({ locale, messages }) {
  if (locale) { state.locale = locale; }
  if (messages) { state.messages = messages; }
}

export function getIntlMessage(message, defaultMessage) {
  if (state.messages[message]) {
    return state.messages[message];
  }

  if (!defaultMessage) {
    if (__DEV__) {
      // eslint-disable-next-line
      console.warn(`INTL: '${message}' message doesn't exist`);
    }
    return message;
  }

  return defaultMessage;
}

export function getAllIntlMesssages() {
  return state.messages;
}

export function createIntlThunk({ prefix = '' } = {}) {
  return (message, defaultMessage) => {
    if (state.messages[`${prefix}${message}`]) {
      return state.messages[`${prefix}${message}`];
    }
    if (!defaultMessage) {
      if (__DEV__) {
        // eslint-disable-next-line
        console.warn(`INTL: '${prefix}${message}' message doesn't exist`);
      }
      return message;
    }

    return defaultMessage;
  };
}

export function getCurrentLocale() {
  return state.locale;
}
