import blacklist from 'blacklist';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from '../../actions/routerActions';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends React.Component {
  static propTypes = {
    activeClassName: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    isActive: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool,
    ]),
    location: PropTypes.object,
    onClick: PropTypes.func,
    to: PropTypes.string.isRequired,
  };

  handleClick = (event) => {
    const { onClick, dispatch } = this.props;
    if (onClick) {
      onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    dispatch(push(this.props.to));
  };

  isActive() {
    const { isActive, location, to } = this.props;
    if (typeof isActive === 'function') {
      return isActive(location, this.props);
    }

    if (typeof isActive === 'boolean') {
      return isActive;
    }

    return location.pathname === to;
  }

  render() {
    const {
      to,
      children,
      className,
      activeClassName,
      ...props
    } = this.props;

    return (
      <a
        href={to}
        className={this.isActive() ?
          [className, activeClassName].join(' ').trim() : className
        }
        {...blacklist(props, 'dispatch', 'location', 'isActive')}
        onClick={this.handleClick}
      >
        {children}
      </a>
    );
  }
}

const mapStateToProps = ({ router: { location } }) => ({
  location,
});

export default connect(
  mapStateToProps,
  undefined,
  undefined,
  { pure: true },
)(Link);
