/* eslint-disable import/prefer-default-export */
import { AtomicBlockUtils } from 'draft-js';

export function addImage(editorState, url) {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    'image',
    'IMMUTABLE',
    { src: url, width: 600, height: 832 },
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  return AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    ' ',
  );
}
