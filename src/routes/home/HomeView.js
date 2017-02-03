import React from 'react';
import PostEditor from '../../components/containers/PostEditor';

class HomeView extends React.Component {
  render() {
    return (
      <div className="view-home view-spacer">
        <div className="container container-md">
          <PostEditor />
        </div>
      </div>
    );
  }
}

export default HomeView;
