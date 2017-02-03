import { getIntlMessage as __ } from '../intl';

/* eslint-disable global-require */
export default {

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [
    require('./home').default,

    // Wildcard routes, e.g. { path: '*', ... } (must go last)
    require('./notFound').default,
  ],

  async action({ next }) {
    const APP_NAME = __('app.name');
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = route.title ? `${route.title} - ${APP_NAME}` : APP_NAME;
    route.description = route.description || '';

    return route;
  },

};
