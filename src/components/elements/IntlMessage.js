import React, { PropTypes } from 'react';
import { sprintf } from 'sprintf-js';
import { getIntlMessage as __ } from '../../intl';

const IntlMessage = (props) => {
  const {
    message,
    defaultMessage,
    isHTML = true,
    args,
    component: Component,
    ...rest
  } = props;

  let formatedText = __(message, defaultMessage);

  if (args) {
    formatedText = sprintf(formatedText, ...args);
  }

  if (isHTML) {
    return (
      <Component
        {...rest} dangerouslySetInnerHTML={{
          __html: formatedText,
        }}
      />
    );
  }

  return (
    <Component {...rest}>{formatedText}</Component>
  );
};

IntlMessage.displayName = 'IntlMessage';

IntlMessage.defaultProps = {
  component: 'span',
};
IntlMessage.propTypes = {
  component: PropTypes.node,
  isHTML: PropTypes.bool,
  message: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string,
  args: PropTypes.array,
};

export default IntlMessage;
