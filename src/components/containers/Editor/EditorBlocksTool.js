import { RichUtils } from 'draft-js';
import React, { PropTypes } from 'react';
import { BLOCKS, INLINE_STYLES } from '../../../lib/editor/blocks';
import { getSelectionRect } from '../../../lib/editor/utils';
import EditorToolbar from './EditorToolbar';
import EditorToolbarButton from './EditorToolbarButton';

const EditorBlocksTool = (props) => {
  const { onToggleInlineStyle, onToggleBlockType, editorState } = props;
  const currentStyle = editorState.getCurrentInlineStyle();
  const currentBlockType = RichUtils.getCurrentBlockType(editorState);
  const selectionState = editorState.getSelection();
  const visible = !selectionState.isCollapsed() && selectionState.hasFocus;

  return (
    <EditorToolbar
      visible={visible}
      editorState={editorState}
      getBoundingRect={() => {
        const nativeSelection = getSelection(window);
        if (!nativeSelection.rangeCount) {
          return null;
        }
        return getSelectionRect(nativeSelection);
      }}
    >
      {INLINE_STYLES.map(type =>
        (!type.notOn || type.notOn.indexOf(currentBlockType) === -1) && (
          <EditorToolbarButton
            key={type.label}
            {...type}
            onToggle={onToggleInlineStyle}
            active={currentStyle.has(type.label)}
          />
      ))}
      <div className="editor-toolbar-divisor" />
      { BLOCKS.map(type =>
        (!type.notOn || type.notOn.indexOf(currentBlockType) === -1) && (
          <EditorToolbarButton
            key={type.label}
            {...type}
            onToggle={onToggleBlockType}
            active={currentBlockType === type.label}
          />
      ))}
    </EditorToolbar>
  );
};

EditorBlocksTool.displayName = 'EditorBlocksTool';
EditorBlocksTool.propTypes = {
  editorState: PropTypes.object.isRequired,
  onToggleInlineStyle: PropTypes.func,
  onToggleBlockType: PropTypes.func,
};

export default EditorBlocksTool;
