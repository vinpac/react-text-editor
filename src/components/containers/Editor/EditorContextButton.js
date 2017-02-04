import React, { PropTypes } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import { getSelectionRect } from '../../../lib/editor/utils';
import cx from 'classnames';
import autobind from 'autobind-decorator';
import { addImage } from '../../../lib/editor/modifiers';

class EditorContextButton extends React.Component {
  static propTypes = {
    editorState: PropTypes.object.isRequired,
    setEditorState: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = this.getState(props);
    this.modifiers = [
      { type: 'table', icon: 'table' },
      { type: 'divider' },
      { type: 'list', icon: 'list' },
      { type: 'list-numbered', icon: 'list-ol' },
      { type: 'checklist', icon: 'check-square-o' },
      { type: 'divider' },
      { type: 'code', icon: 'code' },
    ];
  }

  componentWillReceiveProps(nextProps) {
    setTimeout(() => {
      if (!this.cliked) {
        const newState = this.getState(nextProps);
        if (newState) {
          this.setState(newState);
        }
      }
      this.cliked = false;
    }, 100)
  }

  @autobind
  getState(props) {
    const { editorState } = props;
    const selection = editorState.getSelection();
    if (this.lastSelection === selection) {
      return null;
    }

    this.lastSelection = selection;
    const content = editorState.getCurrentContent();
    const block = content.getBlockForKey(selection.getAnchorKey());
    const isCurrentBlockEmpty = !block.getText().length;
    const currentBlockType = RichUtils.getCurrentBlockType(editorState);
    const isVisible = (
      (selection.getAnchorKey() === selection.getFocusKey())
      && isCurrentBlockEmpty && currentBlockType === 'unstyled'
    );

    const currentStyle = this.state && this.state.style;
    let style;
    const nativeSelection = isVisible && getSelection(window);
    if (isVisible && nativeSelection.rangeCount) {
      const { scrollX, scrollY } = window;
      const boundingRect = getSelectionRect(nativeSelection);
      style = {
        left: (scrollX + boundingRect.left),
        top: (scrollY + boundingRect.top),
      };
    } else {
      style = currentStyle;
    }

    return {
      isActive: false,
      isVisible,
      style,
    };
  }

  @autobind
  toggle() {
    this.cliked = true;
    this.setState({
      isActive: !this.state.isActive
    });
  }

  @autobind
  onInputImageFileChange(event) {
    const { editorState, setEditorState } = this.props;
    const { files } = event.target;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = e => {
      const image = new Image();
      image.src = reader.result;
      image.onload = () => {
        setEditorState(
          addImage(
            EditorState.forceSelection(
              editorState,
              this.lastSelection,
            ),
            reader.result,
            { width: image.width, height: image.height },
          ),
        );
      };
    };

    reader.readAsDataURL(file);
  }

  render() {
    const { isActive, isVisible, style } = this.state;
    return (
      <div
        className={cx("editor-context-button", {
          visible: isVisible,
          active: isActive,
        })}
        style={style}
      >
        <button
          className="btn"
          onClick={this.toggle}
        />
        <div className="editor-context-modifiers">
          <span className="editor-context-item form-file">
            <input
              type="file"
              onChange={this.onInputImageFileChange}
              ref={node => { this.inputImage = node; }}
            />
            <i className="fa fa-image" />
          </span>
          { this.modifiers.map((modifier, i) => (
            modifier.type === 'divider'
              ? <span key={i} className="editor-context-divider" />
              : (
                <span
                  key={i}
                  className="editor-context-item"
                  onClick={() => this.onModifierClick(modifier.type)}
                >
                  <i className={`fa fa-${modifier.icon}`} />
                </span>
              )
          ))}
        </div>
      </div>
    );
  }
}

export default EditorContextButton;
