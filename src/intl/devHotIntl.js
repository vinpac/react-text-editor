/* eslint-disable global-require */

import { flattenObject } from '../lib/objectUtils';
import { getCurrentLocale, setupIntl } from '.';
import { __DEV__ } from '../config';


export default function devHotIntl(callback) {
  if (module.hot) {
    const currentLocale = getCurrentLocale();
    require('./messages/default');
    const requireCurrentIntlMessages = () => {
      switch (currentLocale) {
        case 'pt-br': return require('./messages/pt-br');
        case 'en-us': return require('./messages/en-us');
        default: return null;
      }
    };
    requireCurrentIntlMessages();

    if (__DEV__) {
      const intlChangeHandler = () => {
        let messages;
        const defaultMessages = flattenObject(
          require('./messages/default'),
        );
        try {
          messages = {
            ...defaultMessages,
            ...flattenObject(requireCurrentIntlMessages()),
          };
        } catch (e) {
          messages = defaultMessages;
        }

        setupIntl({
          locale: currentLocale,
          messages,
        });

        callback();
      };
      module.hot.accept(
        require.resolve('./messages/default.js'),
        intlChangeHandler,
      );
      module.hot.accept(
        require.resolve(`./messages/${currentLocale}.js`),
        intlChangeHandler,
      );
    }
  }
}
