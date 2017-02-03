import React, { PropTypes } from 'react';
import cx from 'classnames';

const LoadingSpin = ({ className, isLight, isAccent, size = '32', ...props }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox={'0 0 32 32'}
    width={size}
    height={size}
    className={cx('loading-spin', {
      'loading-spin-light': isLight,
      'loading-spin-accent': isAccent,
    }, className)}
  >
    <path opacity=".25" d={'M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4'} />
    <path d={'M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z'}>
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 16 16"
        to="360 16 16"
        dur="0.8s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
  );

LoadingSpin.displayName = 'LoadingSpin';
LoadingSpin.propTypes = {
  className: PropTypes.string,
  isLight: PropTypes.bool,
  isAccent: PropTypes.bool,
  size: PropTypes.size,
};

export default LoadingSpin;
