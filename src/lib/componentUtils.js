import React from 'react';
import reactStringReplace from 'react-string-replace';
import { forEach } from './objectUtils';

export function backgroundImage(obj, key = 'image_url') {
  if (!obj) return null;
  if (typeof obj === 'string') {
    return { backgroundImage: `url(${obj})` };
  }
  return { backgroundImage: `url(${obj[key]})` };
}

export function replaceStringBlocks(
  text, blocks, defaultComponent = 'p', options = {},
) {
  const { parseBlockProps } = options;
  let nextBlockId = 0;
  let formatedText = text;

  forEach(blocks, (modifier) => {
    const Component = modifier.component || defaultComponent;
    formatedText = reactStringReplace(
      formatedText,
      modifier.regex,
      (match, i) => {
        nextBlockId += 1;
        return modifier.render
          ? modifier.render(match, nextBlockId, nextBlockId + i)
          : (
            <Component
              key={nextBlockId}
              {...(parseBlockProps
                ? parseBlockProps(modifier.props)
                : modifier.props
              )}
            >
              { modifier.matchAsChildren !== false ? match : null }
            </Component>
          );
      },
    );
  });

  return formatedText;
}

export function getDisplayName(Component) {
  const component = Component.Component || Component;
  return component.displayName || component.name || 'Component';
}
