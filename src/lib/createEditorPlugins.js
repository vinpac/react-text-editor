import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import { composeDecorators } from 'draft-js-plugins-editor';
import createAlignmentPlugin from './editor/alignment-plugin';
import createFocusPlugin from './editor/focus-plugin';
import createImagePlugin from './editor/image-plugin';
import { createSubscribeableStore } from './editor/utils';

export default () => {
  const alignmentStore = createSubscribeableStore();
  const alignmentPlugin = createAlignmentPlugin({ store: alignmentStore });

  const focusPlugin = createFocusPlugin({
    theme: {
      focused: 'editor-block-focused',
      unfocused: 'editor-block-unfocused',
    },
  });

  const decorator = composeDecorators(
    alignmentPlugin.decorator,
    focusPlugin.decorator,
  );

  return {
    alignmentStore,
    plugins: [
      focusPlugin,
      alignmentPlugin,
      createLinkifyPlugin(),
      createImagePlugin({ decorator }),
      createBlockBreakoutPlugin(),
    ],
  };
};
