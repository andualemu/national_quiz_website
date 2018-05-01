/* eslint react/no-danger: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import marked from 'marked';

import { fetchPost, deletePost } from '../actions/index';

class Post extends React.Component {
  componentDidMount() {
    console.log('fetching: ', this.props.match.params.postID);
    this.props.dispatch(fetchPost(this.props.match.params.postID));
  }

  handleDelete = () => {
    deletePost(this.props.match.params.postID, this.props.history);
  };
  render() {
    const renderPost = () => {
      return (
        <div>
          <h1>{this.props.post.title}</h1>
          <div>tags: {this.props.post.tags}</div>
          <div dangerouslySetInnerHTML={{ __html: marked(this.props.post.content || '') }} />
          <button onClick={() => this.props.history.push(`/posts/${this.props.match.params.postID}/edit`)}>edit</button>
          <button onClick={this.handleDelete}>delete</button>
        </div>
      );
    };
    return (
      renderPost()
    );
  }
}

// connects particular parts of redux state to this component's props
const mapStateToProps = state => (
  {
    post: state.posts.post,
  }
);

export default withRouter(connect(mapStateToProps, null)(Post));
