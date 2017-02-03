import autobind from 'autobind-decorator';
import React, { PropTypes } from 'react';
import { PureComponent } from 'react-pure-render';
import EditorToolbar from './EditorToolbar';
import EditorToolbarButton from './EditorToolbarButton';

class EditorAlignmentTool extends PureComponent {
  static propTypes = {
    store: PropTypes.object.isRequired,
    editorState: PropTypes.object.isRequired,
  };

  // Initial state
  state = {};

  componentDidMount() {
    const { store } = this.props;
    store.subscribe(this.onStoreChange);
    this.onStoreChange();
  }

  componentWillReceiveProps() {
    this.onStoreChange();
  }

  componentWillUnmount() {
    const { store } = this.props;
    this.hasUnmounted = true;
    store.unsubscribe(this.onStoreChange);
  }

  @autobind
  onStoreChange() {
    if (this.hasUnmounted) {
      this.props.store.unsubscribe(this.onStoreChange);
      return;
    }

    const { store } = this.props;
    this.setState({
      boundingRect: store.get('boundingRect'),
      isVisible: !!store.get('visibleBlock'),
      selectedAlignment: store.get('alignment'),
      setAlignment: store.get('setAlignment'),
    });
  }

  render() {
    const {
      isVisible,
      boundingRect,
      setAlignment,
      selectedAlignment,
    } = this.state;

    const { editorState } = this.props;
    const alignments = [
      {
        label: 'align-left',
        icon: 'align-left',
        description: 'Align left',
      },
      {
        label: 'align-center',
        icon: 'align-center',
        description: 'Align center',
      },
      {
        label: 'align-right',
        icon: 'align-right',
        description: 'Align right',
      },
    ];

    return (
      <EditorToolbar
        editorState={editorState}
        visible={isVisible}
        getBoundingRect={() => boundingRect}
      >
        {alignments.map(type =>
          <EditorToolbarButton
            key={type.label}
            {...type}
            onToggle={setAlignment}
            active={selectedAlignment === type.label}
          />,
        )}
      </EditorToolbar>
    );
  }
}

export default EditorAlignmentTool;
