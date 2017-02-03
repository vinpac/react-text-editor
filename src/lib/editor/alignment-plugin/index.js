import { EditorState } from 'draft-js';
import createDecorator from './createDecorator';

function createSetAlignment(contentBlock, { getEditorState, setEditorState }) {
  const entityKey = contentBlock.getEntityAt(0);
  return alignment => {
    const editorState = getEditorState();
    const contentState = editorState.getCurrentContent();
    contentState.mergeEntityData(entityKey, { alignment });
    setEditorState(
      EditorState.forceSelection(editorState, editorState.getSelection()),
    );
  };
}

export default ({ store }) => ({
  blockRendererFn(contentBlock, { getEditorState, setEditorState }) {
    const contentState = getEditorState().getCurrentContent();
    const entityKey = contentBlock.getEntityAt(0);
    const data = entityKey ? contentState.getEntity(entityKey).data : {};

    return {
      props: {
        alignment: data.alignment || 'default',
        setAlignment: createSetAlignment(
          contentBlock,
          { getEditorState, setEditorState },
        ),
      },

    };
  },
  decorator: createDecorator(store),
});
