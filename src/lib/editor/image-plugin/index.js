import EditorImage from '../../../components/containers/Editor/EditorImage';

export default ({ decorator }) => {
  let Image = EditorImage;
  if (decorator) {
    Image = decorator(Image);
  }
  return {
    blockRendererFn: (block, { getEditorState }) => {
      if (block.getType() === 'atomic') {
        const contentState = getEditorState().getCurrentContent();
        const entity = contentState.getEntity(block.getEntityAt(0));
        const type = entity.getType();

        if (type === 'image') {
          return {
            component: Image,
            editable: false,
          };
        }
      }

      return null;
    },
  };
};
