import autobind from 'autobind-decorator';
import {
  ContentState,
  EditorState,
  RichUtils,
  convertFromHTML,
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import React from 'react';
import { PureComponent } from 'react-pure-render';
import fakeText from '../../common/fakeText.md';
import createEditorPlugins from '../../lib/createEditorPlugins';
import { addImage } from '../../lib/editor/modifiers';
import { keyBindingFn } from '../../lib/editor/utils';
import EditorAlignmentTool from './Editor/EditorAlignmentTool';
import EditorBlocksTool from './Editor/EditorBlocksTool';
import EditorContextButton from './Editor/EditorContextButton';

class PostEditor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.onChange = (editorState) => this.setState({ editorState });
  }

  componentDidMount() {
    const { plugins, alignmentStore } = createEditorPlugins();
    this.plugins = plugins;
    this.alignmentStore = alignmentStore;

    const blocksFromHTML = convertFromHTML(fakeText.html);
    // eslint-disable-next-line
    this.setState({
      renderEditor: true,
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap,
        ),
      ),
    }, () => {
      this.editor.focus();
    });
  }

  @autobind
  getBlockStyle(block) {
    switch (block.getType()) {
      case 'header-one': return 'editor-block-header';
      case 'header-two': return 'editor-block-header';
      case 'atomic': {
        const contentState = this.state.editorState.getCurrentContent();
        const entity = contentState.getEntity(block.getEntityAt(0));
        if (entity) {
          return `editor-block-${entity.getType()}`;
        }
        break;
      }
      default: return 'editor-block';
    }

    return 'editor-block';
  }

  @autobind
  toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType,
    ),
    );
  }


  @autobind
  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle,
      ),
    );
  }

  @autobind
  handleKeyCommand(command): string {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }

    switch (command) {
      case 'header-one': return this.toggleBlockType('header-one');
      case 'header-two': return this.toggleBlockType('header-two');
      default: return 'not-handled';
    }
  }

  render() {
    const { editorState, renderEditor } = this.state;

    return (
      <div className="post-editor">
        { renderEditor &&
          <div className="post-editor-inner">
            <Editor
              ref={editor => { this.editor = editor; }}
              handleKeyCommand={this.handleKeyCommand}
              plugins={this.plugins}
              onChange={this.onChange}
              keyBindingFn={keyBindingFn}
              editorState={editorState}
              blockStyleFn={this.getBlockStyle}
            />
            <EditorBlocksTool
              onToggleInlineStyle={this.toggleInlineStyle}
              onToggleBlockType={this.toggleBlockType}
              editorState={editorState}
            />
            <EditorAlignmentTool
              editorState={editorState}
              store={this.alignmentStore}
            />
            <EditorContextButton
              editorState={editorState}
              setEditorState={this.onChange}
            />
          </div>
        }
      </div>
    );
  }
}

export default PostEditor;
