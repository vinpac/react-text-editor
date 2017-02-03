/** global __PROD__ */

import React, { PropTypes } from 'react';

class ErrorPage extends React.Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
  };

  render() {
    if (__PROD__) {
      const { error } = this.props;
      return (
        <div>
          <h1>{error.name}</h1>
          <p>{error.message}</p>
          <pre>{error.stack}</pre>
        </div>
      );
    }

    return (
      <div>
        <h1>Error</h1>
        <p>Sorry, a critical error occurred on this page.</p>
      </div>
    );
  }
}

export default ErrorPage;
