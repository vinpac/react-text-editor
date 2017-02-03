import { LOCALES } from '../common/constants';
import { flattenObject } from '../lib/objectUtils';
import * as defaultMessages from '../intl/messages/default';

/* eslint-disable
  global-require,
  import/no-dynamic-require,
  no-param-reassign
*/
const flattenedDefaultMessages = flattenObject(defaultMessages);

export function getLocaleMessages(locale) {
  try {
    const messages = require(`../intl/messages/${locale}`);

    return {
      ...flattenedDefaultMessages,
      ...flattenObject(messages),
    };
  } catch (e) {
    return flattenedDefaultMessages;
  }
}

export default function configureIntlMiddleware(app) {
  app.get('/set_locale/:locale', (req, res) => {
    const { locale } = req.params;
    if (LOCALES.indexOf(locale) !== -1) {
      req.session.locale = locale;
    } else {
      res.status(400);
    }
    res.redirect('/');
  });

  app.post('/set_locale/:locale', (req, res) => {
    const { locale } = req.params;
    if (LOCALES.indexOf(locale) !== -1) {
      req.session.locale = locale;
      res.json({ success: `Locale set to ${locale}` });
    } else {
      res.status(400);
      res.json({ failed: 'Invalid locale' });
    }
  });
}
