/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';

class NotFound extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title } = this.props;
    return (
      <div className="view-not-found view-spacer">
        <div className="container">
          <h1>{title}</h1>
          <p>Sorry, the page you were trying to view does not exist.</p>
        </div>
      </div>
    );
  }
}

export default NotFound;