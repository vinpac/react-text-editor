/* eslint-disable import/prefer-default-export */
import isPlainObject from 'is-plain-object';
import fetch from '../core/fetch';

export function fetchJSON(url, opts) {
  const options = opts;
  if (options) {
    if (isPlainObject(options.body)) {
      options.body = JSON.stringify(options.body);
      options.headers = options.headers || {};
      options.headers['Content-Type'] = 'application/json';
    }
  }

  return fetch(url, options)
    .then(resp => resp.json()
      .then(data => new Promise((resolve, reject) => {
        if (resp.status !== 200) {
          reject(data);
        } else {
          resolve(data);
        }
      })),
    );
}
