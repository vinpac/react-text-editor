import { EditorState } from 'draft-js';
import { createSubscribeableStore } from '../utils';
import createDecorator from './createDecorator';
import setSelectionToBlock from './modifiers/setSelectionToBlock';

const focusableBlockIsSelected = (editorState, store) => {
  if (!store.get('focusedBlock')) {
    return false;
  }

  const selection = editorState.getSelection();
  if (selection.getAnchorKey() !== selection.getFocusKey()) {
    store.set('focusedBlock', null);
    return false;
  }

  const content = editorState.getCurrentContent();
  const block = content.getBlockForKey(selection.getAnchorKey());
  if (store.get('focusedBlock') === block.getKey()) {
    return true;
  }

  store.set('focusedBlock', null);
  return false;
};


// function setFocus(contentBlock, { getEditorState, setEditorState }) {
//   const entityKey = contentBlock.getEntityAt(0);
//   return isFocused => {
//     const editorState = getEditorState();
//     const contentState = editorState.getCurrentContent();
//     contentState.mergeEntityData(entityKey, { isFocused });
//     setEditorState(
//       EditorState.forceSelection(editorState, editorState.getSelection())
//     );
//   };
// }

export default ({ initialState, theme }) => {
  let lastSelection;
  let lastContentState;
  const store = createSubscribeableStore(initialState);

  return {
    store,
    onBlur(contentBlock, { getEditorState, setEditorState }) {
      const editorState = getEditorState();
      if (store.get('focusedBlock')) {
        store.set('focusedBlock', null);
        setEditorState(
          EditorState.forceSelection(
            editorState,
            editorState.getSelection(),
          ),
        );
        return 'handled';
      }
      return 'not-handled';
    },

    onChange(editorState) {
      // in case the content changed there is no need to re-render blockRendererFn
      // since if a block was added it will be rendered anyway and if it was text
      // then the change was not a pure selection change
      const contentState = editorState.getCurrentContent();
      if (!contentState.equals(lastContentState)) {
        lastContentState = contentState;
        return editorState;
      }
      lastContentState = contentState;

      // if the selection didn't change there is no need to re-render
      const selection = editorState.getSelection();
      if (lastSelection && selection.equals(lastSelection)) {
        lastSelection = editorState.getSelection();
        return editorState;
      }

      // Re-render only if one block is focused
      const focusedBlock = store.get('focusedBlock');
      if (focusedBlock && !focusableBlockIsSelected(editorState, store)) {
        return EditorState.forceSelection(
          editorState,
          editorState.getSelection(),
        );
      }
      return editorState;
    },

    blockRendererFn(contentBlock, { getEditorState, setEditorState }) {
      const editorState = getEditorState();

      return {
        props: {
          isFocused: contentBlock.getKey() === store.get('focusedBlock'),
          isCollapsedSelection: true,
          setFocusToBlock: () => {
            store.set('focusedBlock', contentBlock.getKey());
            setSelectionToBlock(getEditorState, setEditorState, contentBlock);
          },
        },
      };
    },
    decorator: createDecorator(store, theme),
  };
};
