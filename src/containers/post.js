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
    this.props.dispatch(deletePost(this.props.match.params.postID, this.props.history));
  };
  render() {
    const renderPost = () => {
      if (this.props.auth) {
        return (
          <div>
            <h1>{this.props.post.title}</h1>
            <div className="post-content">
              <div>tags: {this.props.post.tags}</div>
              <div dangerouslySetInnerHTML={{ __html: marked(this.props.post.content || '') }} />
              <button onClick={() => this.props.history.push(`/posts/${this.props.match.params.postID}/edit`)}>edit</button>
              <button onClick={this.handleDelete}>delete</button>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <h1>{this.props.post.title}</h1>
            <div className="post-content">
              <div>tags: {this.props.post.tags}</div>
              <div dangerouslySetInnerHTML={{ __html: marked(this.props.post.content || '') }} />
            </div>
          </div>
        );
      }
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
    auth: state.auth.authenticated,
  }
);

export default withRouter(connect(mapStateToProps, null)(Post));
