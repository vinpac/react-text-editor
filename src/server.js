/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import bodyParser from 'body-parser';
import connectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import express from 'express';
import expressSession from 'express-session';
import path from 'path';
import PrettyError from 'pretty-error';
import React from 'react';
import ReactDOM from 'react-dom/server';
import UniversalRouter from 'universal-router';
import assets from './assets'; // eslint-disable-line import/no-unresolved
import { DEFAULT_LOCALE } from './common/constants';
import App from './components/App';
import Html from './components/Html';
import { __PROD__, port, sessionKey, sessionSecret } from './config';
import configureAuthentication from './core/configureAuthentication';
import configureIntlMiddleware, {
  getLocaleMessages,
} from './core/configureIntlMiddleware';
import passport from './core/passport';
import { getAllIntlMesssages, setupIntl } from './intl';
import configureStore from './redux/store/configureStore';
import routes from './routes';
import ErrorPage from './routes/error/ErrorPage';

const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
const RedisStore = connectRedis(expressSession);
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
  name: sessionKey,
  secret: sessionSecret,
  store: new RedisStore(),
  resave: true,
  saveUninitialized: true,
  rolling: true,
  cookie: {
    httpOnly: false,
    secure: false,
    maxAge: 86400000,
  },
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
configureIntlMiddleware(app);

//
// Authentication
// -----------------------------------------------------------------------------
app.use(passport.initialize());
app.use(passport.session());
configureAuthentication(app, passport);

if (__PROD__) {
  app.enable('trust proxy');
}

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  const locale = req.session.locale || DEFAULT_LOCALE;
  setupIntl({
    locale,
    messages: getLocaleMessages(locale),
  });

  try {
    const store = configureStore({
      router: {
        location: { pathname: req.path, query: req.query },
      },
      auth: {
        user: req.user || null,
      },
    }, {
      cookie: req.headers.cookie,
    });

    const css = new Set();

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
      // Initialize a new Redux store
      // http://redux.js.org/docs/basics/UsageWithReact.html
      store,
    };

    const route = await UniversalRouter.resolve(routes, {
      ...context,
      path: req.path,
      query: req.query,
    });

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    data.children = ReactDOM.renderToString(
      <App context={context}>{route.component}</App>,
    );
    data.style = [...css].join('');
    data.scripts = [
      assets.vendor.js,
      assets.client.js,
    ];
    data.locale = locale;
    data.intlState = { locale, messages: getAllIntlMesssages() };
    data.state = context.store.getState();
    if (assets[route.chunk]) {
      data.scripts.push(assets[route.chunk].js);
    }

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
    >
      {ReactDOM.renderToString(<ErrorPage error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);
});
/* eslint-enable no-console */
