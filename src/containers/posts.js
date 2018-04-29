import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import { fetchPosts } from '../actions/index';

class Posts extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const renderPosts = () => {
      return this.props.posts.all.map((post) => {
        return <li key={post.id}><NavLink to={`posts/${post.id}`}>{post.title}</NavLink></li>;
      });
    };
    return (
      <div>
        <h1>Posts</h1>
        <ul>
          {renderPosts()}
        </ul>
      </div>
    );
  }
}

// connects particular parts of redux state to this component's props
const mapStateToProps = state => (
  {
    posts: state.posts,
  }
);

export default withRouter(connect(mapStateToProps, null)(Posts));
