import React, { PropTypes } from 'react';
import LoadingSpin from './LoadingSpin';

const ButtonLoading = (props) => {
  const { className, loading, isLight = true, size, children, ...rest } = props;
  return (
    <button
      className={[className, loading && 'btn-loading-spin'].join(' ')}
      {...rest}
    >
      {loading && <LoadingSpin isLight={isLight} size={size} />}
      <span>{children}</span>
    </button>
  );
};

ButtonLoading.displayName = 'ButtonLoading';
ButtonLoading.propTypes = {
  loading: PropTypes.bool,
  isLight: PropTypes.bool,
  size: PropTypes.int,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default ButtonLoading;
