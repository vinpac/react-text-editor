/* eslint-disable max-len, no-underscore-dangle */

const isDebug = !process.argv.includes('--release');
const NODE_ENV = process.env.NODE_ENV;
export const __PROD__ = NODE_ENV === 'production' || !isDebug;
export const __DEV__ = NODE_ENV === 'development' || (isDebug && !__PROD__);

export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;
export const sessionKey = 'ioqh4sFDS1kj241877';
export const sessionSecret = '654987qw9e41627987';
export const maps = {
  google: {
    apiId: 'AIzaSyA6FtG9g5KebYrjsnA8iBtX4NDty3Rofp0',
  },
};
export const analytics = {
  // https://analytics.google.com/
  google: {
    trackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },
};

// NOTE: values must be stringfied to json
export const globals = {
  __PROD__,
  __DEV__,
  'process.env.NODE_ENV': __DEV__ ? '"development"' : '"production"',
};
