import autobind from 'autobind-decorator';
import React, { PropTypes } from 'react';
import { getDisplayName } from '../../componentUtils';

export default (store, theme) => (Component) => (
  class BlockFocusDecorator extends React.Component {
    static displayName = `BlockFocus(${getDisplayName(Component)})`;
    static Component = Component.Component || Component;
    static propTypes = {
      blockProps: PropTypes.object,
      className: PropTypes.string,
    };

    @autobind
    onClick(event) {
      const { blockProps } = this.props;
      event.preventDefault();
      if (!blockProps.isFocused) {
        blockProps.setFocusToBlock();
      }
    }

    render() {
      const { className, blockProps: { isFocused } } = this.props;
      return (
        <Component
          {...this.props}
          onClick={this.onClick}
          className={[
            isFocused ? theme.focused : theme.unfocused,
            className,
          ].join(' ').trim()}
        />
      );
    }
  }
);
