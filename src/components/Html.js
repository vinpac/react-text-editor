/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import serialize from 'serialize-javascript';
import { analytics, maps } from '../config';

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    locale: PropTypes.string,
    style: PropTypes.string,
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    state: PropTypes.object,
    intlState: PropTypes.object,
    children: PropTypes.string,
  };

  render() {
    const {
      title,
      description,
      image,
      style,
      locale,
      scripts,
      state,
      intlState,
      children,
    } = this.props;
    return (
      <html className="no-js" lang={locale}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="image" content={image} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="apple-touch-icon" href="apple-touch-icon.png" />
          <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700" rel="stylesheet" />
          {style && <style id="css" dangerouslySetInnerHTML={{ __html: style }} />}
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />

          { maps.google.apiId &&
            <script
              src={`https://maps.googleapis.com/maps/api/js?key=${maps.google.apiId}&libraries=places&language=${locale}`}
            />
          }
          {state && (
            <script
              dangerouslySetInnerHTML={{ __html:
              `
              window.APP_STATE=${serialize(state, { isJSON: true })}
              window.APP_INTL=${serialize(intlState, { isJSON: true })}` }}
            />
          )}
          {scripts && scripts.map(script => <script key={script} src={script} />)}
          {analytics.google.trackingId &&
            <script
              dangerouslySetInnerHTML={{ __html:
              'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
              `ga('create','${analytics.google.trackingId}','auto');ga('send','pageview')` }}
            />
          }
          {analytics.google.trackingId &&
            <script src="https://www.google-analytics.com/analytics.js" async defer />
          }
        </body>
      </html>
    );
  }
}

export default Html;
