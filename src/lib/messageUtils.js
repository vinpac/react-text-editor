/* eslint-disable import/prefer-default-export */

export function sortByCreatedAt(message1, message2) {
  return new Date(message1.createdAt) - new Date(message2.createdAt);
}
