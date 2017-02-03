import React, { PropTypes } from 'react';

class Select extends React.Component {
  static defaultProps = {
    className: 'input',
  };

  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    children: PropTypes.node,
    containerClassName: PropTypes.string,
    defaultValue: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      isEmpty: !props.defaultValue || !props.value,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  focus() {
    this.select.focus();
  }

  get value() {
    return this.select.value;
  }

  set value(value) {
    this.select.value = value;
  }

  handleChange(event) {
    const { onChange } = this.props;
    const isEmpty = !event.target.value.length;

    // Update isEmpty state
    if (isEmpty !== this.state.isEmpty) {
      this.setState({ isEmpty });
    }

    // Fire props onChange
    if (onChange) {
      onChange(event);
    }
  }

  render() {
    const { isEmpty } = this.state;
    const { children, containerClassName, ...props } = this.props;
    return (
      <div
        className={[
          'form-select',
          containerClassName,
          isEmpty && 'form-select-empty',
        ].join(' ')
      }
      >
        <select
          {...props}
          onChange={this.handleChange}
        >
          {children}
        </select>
      </div>
    );
  }
}

export default Select;
