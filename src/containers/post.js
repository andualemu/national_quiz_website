/* eslint react/no-danger: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import marked from 'marked';

import { fetchPost, deletePost, ActionTypes } from '../actions/index';

import ErrorDisplay from '../components/error-display';

class Post extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: ActionTypes.ERASE_ERROR }); // display no errors remount
    this.props.dispatch(fetchPost(this.props.match.params.postID));
  }

  handleDelete = () => {
    this.props.dispatch(deletePost(this.props.match.params.postID, this.props.history));
  };
  render() {
    const renderEditButtons = () => {
      if (this.props.auth && this.props.post.author) {
        return (
          <div>
            <button onClick={() => this.props.history.push(`/posts/${this.props.match.params.postID}/edit`)}>edit</button>
            <button onClick={this.handleDelete}>delete</button><br />
            <div>Owner: {this.props.post.author.userName}</div>
          </div>
        );
      } else return <div />;
    };

    return (
      <div>
        <h1>{this.props.post.title}</h1>
        <div className="post-content">
          <div>tags: {this.props.post.tags}</div>
          <div dangerouslySetInnerHTML={{ __html: marked(this.props.post.content || '') }} />
          {renderEditButtons()}
          {this.props.err &&
          <ErrorDisplay err={this.props.err} />}
        </div>
      </div>
    );
  }
}

// connects particular parts of redux state to this component's props
const mapStateToProps = state => (
  {
    post: state.posts.post,
    auth: state.auth.authenticated,
    err: state.error,
    user_profile: state.user_profile,
  }
);

export default withRouter(connect(mapStateToProps, null)(Post));
