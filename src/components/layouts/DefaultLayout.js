import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

class DefaultLayout extends React.Component {
  static defaultProps = {
    isFullMode: true,
  };

  static propTypes = {
    authUser: PropTypes.object,
    className: PropTypes.string,
    isFullMode: PropTypes.bool,
    renderedView: PropTypes.node,
    view: PropTypes.func,
    viewProps: PropTypes.object,
  }

  render() {
    const {
      view: View,
      renderedView,
      isFullMode,
      viewProps,
      authUser,
    } = this.props;

    const className = cx({
      'layout-default': true,
      'layout-default-full': isFullMode,
    }, this.props.className);

    return (
      <div className={className}>
        { View &&
          <View
            authUser={authUser}
            {...viewProps}
          />
        }
        {renderedView}
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  authUser: user,
});

export default connect(mapStateToProps)(DefaultLayout);
