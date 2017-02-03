import cx from 'classnames';
import React, { PropTypes } from 'react';

const EditorToolbarButton = ({ label, icon, text, active, onToggle }) => (
  <button
    type="button"
    className={cx('btn btn-text-light', { active })}
    onMouseDown={(e) => {
      e.preventDefault();
      onToggle(label);
    }}
  >
    { icon ? <i className={`fa fa-${icon}`} /> : text }
  </button>
);

EditorToolbarButton.displayName = 'EditorToolbarButton';
EditorToolbarButton.propTypes = {
  description: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string,
  label: PropTypes.string,
  onToggle: PropTypes.func,
  active: PropTypes.bool,
};

export default EditorToolbarButton;
