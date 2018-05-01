import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Textarea from 'react-textarea-autosize';

import { fetchPost, updatePost } from '../actions/index';

class UpdatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: '',
      cover_url: '',
    };
  }
  componentDidMount() {
    console.log('fetching: ', this.props.match.params.postID);
    this.props.dispatch(fetchPost(this.props.match.params.postID));
  }
  handleChange = (event) => {
    if (event.target.id === 'title') {
      this.setState({ title: event.target.value });
    } else if (event.target.id === 'tags') {
      this.setState({ tags: event.target.value });
    } else if (event.target.id === 'content') {
      this.setState({ content: event.target.value });
    } else if (event.target.id === 'cover-url') {
      this.setState({ cover_url: event.target.value });
    }
  }
  handleUpdate = () => {
    updatePost(this.props.match.params.postID, this.state, this.props.history);
  }
  render() {
    const renderPost = () => {
      return (
        <div>
          <div><Textarea id="title" placeholder="title" onChange={this.handleChange} defaultValue={this.props.post.title} /></div>
          <div><Textarea id="tags" placeholder="tags" onChange={this.handleChange} defaultValue={this.props.post.tags} /></div>
          <div><Textarea id="content" placeholder="content" onChange={this.handleChange} defaultValue={this.props.post.content} /></div>
          <div><Textarea id="cover-url" placeholder="cover url" onChange={this.handleChange} defaultValue={this.props.post.cover_url} /></div>
          <div><button id="save" onClick={this.handleUpdate}>save</button></div>
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

export default withRouter(connect(mapStateToProps, null)(UpdatePost));
