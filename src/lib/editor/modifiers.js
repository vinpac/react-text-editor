/* eslint-disable import/prefer-default-export */
import { AtomicBlockUtils } from 'draft-js';

export function addImage(editorState, url, props={}) {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    'image',
    'IMMUTABLE',
    { src: url, ...props },
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  return AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    ' ',
  );
}
