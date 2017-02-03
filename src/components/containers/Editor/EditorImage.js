import blacklist from 'blacklist';
import React, { PropTypes } from 'react';
import ProgressiveImage from '../../elements/ProgressiveImage';

const EditorImage = (props) => {
  const {
    block,
    blockProps,
    className,
    contentState,
    onClick,
    refNode,
    ...rest
  } = blacklist(
    props,
    'isFocused',
    'customStyleFn',
    'customStyleMap',
    'decorator',
    'forceSelection',
    'offsetKey',
    'selection',
    'tree',
  );
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { width, height, src } = entity.data;
  const { alignment } = blockProps;

  return (
    <div
      ref={refNode}
      className={`editor-image editor-block-${alignment}`}
      style={{ width }}
      {...rest}
    >
      <ProgressiveImage
        images={[src]}
        width={width}
        height={height}
        containerProps={{ className, onClick }}
      />
    </div>
  );
}

EditorImage.displayName = 'EditorImage';
EditorImage.propTypes = {
  block: PropTypes.object,
  blockProps: PropTypes.object,
  className: PropTypes.string,
  contentState: PropTypes.object,
  onClick: PropTypes.func,
  refNode: PropTypes.func,
};

export default EditorImage;

