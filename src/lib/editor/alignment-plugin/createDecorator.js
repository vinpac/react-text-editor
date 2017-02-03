import React, { PropTypes } from 'react';
import { getDisplayName } from '../../componentUtils';

export default (store) => (Component) => (
  class BlockAlignmentDecorator extends React.Component {
    static displayName = `BlockAlignment(${getDisplayName(Component)})`;
    static Component = Component.Component || Component;
    static propTypes = {
      blockProps: PropTypes.object,
      block: PropTypes.object,
    };

    componentDidUpdate() {
      const { blockProps, block } = this.props;
      if (blockProps.isFocused) {
        const boundingRect = this.node.getBoundingClientRect();
        store.merge({
          boundingRect,
          setAlignment: blockProps.setAlignment,
          alignment: blockProps.alignment,
          visibleBlock: block.getKey(),
        });
      } else if (store.get('visibleBlock') === block.getKey()) {
        store.set('visibleBlock', null);
      }
    }

    componentWillUnmount() {
      const { block } = this.props;
      if (store.get('visibleBlock') === block.getKey()) {
        store.set('visibleBlock', null);
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          refNode={node => { this.node = node; }}
        />
      );
    }
  }
);
