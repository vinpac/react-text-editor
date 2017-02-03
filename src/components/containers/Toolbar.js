import React, { PropTypes } from 'react';
import { PureComponent } from 'react-pure-render';
import { connect } from 'react-redux';

class Toolbar extends PureComponent {
  static propTypes = {
    channel: PropTypes.object,
  };

  render() {
    const { channel } = this.props;

    return (
      <div className="toolbar">
        <div className="navbar">
          <h4 className="navbar-brand">#{channel.name}</h4>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ channelsById, currentChannelId }) => ({
  channel: channelsById[currentChannelId],
});

export default connect(mapStateToProps)(Toolbar);
