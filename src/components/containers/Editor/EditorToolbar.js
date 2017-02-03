import autobind from 'autobind-decorator';
import cx from 'classnames';
import React, { PropTypes } from 'react';

const margin = 10;
class EditorToolbar extends React.Component {
  static propTypes = {
    editorState: PropTypes.object.isRequired,
    children: PropTypes.node,
    getBoundingRect: PropTypes.func,
  };

  // Initial state
  state = {};

  componentWillReceiveProps(nextProps) {
    setTimeout(() => this.handleSelectionChange(nextProps.visible), 0);
  }

  @autobind
  handleSelectionChange(isVisible) {
    if (!isVisible) {
      this.setState({ isVisible });
      return;
    }

    let goingDown = false;
    const { getBoundingRect } = this.props;
    const boundingRect = getBoundingRect && getBoundingRect();
    if (!boundingRect) {
      return;
    }

    const toolbarRect = this.node.getBoundingClientRect();
    const { scrollX, scrollY } = window;

    const style = {
      top: (scrollY + boundingRect.top) - (toolbarRect.height - margin),
      left: (((scrollX + boundingRect.left) - (toolbarRect.width / 2))
        + (boundingRect.width / 2)
      ),
    };

    if (style.left < 10) {
      style.left = 10;
    } else if (style.left > ((window.innerWidth - toolbarRect.width) - margin)) {
      style.left = (window.innerWidth - toolbarRect.width) - margin;
    }

    if (style.top < (scrollY + toolbarRect.height + 10)) {
      goingDown = true;
      style.top = scrollY + boundingRect.top + boundingRect.height + margin;
    }

    this.setState({
      isVisible,
      style,
      goingDown,
      stillVisible: this.state.isVisible,
    });
  }

  render() {
    const { children } = this.props;
    const { isVisible, stillVisible, goingDown, style } = this.state;

    return (
      <div
        ref={(node) => { this.node = node; }}
        className={cx('editor-toolbar nav', {
          visible: isVisible,
          'still-visible': stillVisible,
          'editor-toolbar-down': goingDown,
        })}
        style={style}
      >
        {children}
      </div>
    );
  }
}

export default EditorToolbar;
