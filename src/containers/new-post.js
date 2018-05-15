/* eslint no-alert: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Textarea from 'react-textarea-autosize';

import { createPost } from '../actions/index';

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: '',
      cover_url: '',
    };
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
  handleSave = () => {
    if (this.state.title === '') {
      alert('Title is required.');
    } else if (this.state.tags === '') {
      alert('Tags are required.');
    } if (this.state.content === '') {
      alert('Content is required.');
    } else {
      this.props.dispatch(createPost(this.state, this.props.history));
    }
  };

  render() {
    const renderPost = () => {
      return (
        <div>
          <div><Textarea id="title" placeholder="title" onChange={this.handleChange} value={this.state.title} /></div>
          <div><Textarea id="tags" placeholder="tags" onChange={this.handleChange} value={this.state.tags} /></div>
          <div><Textarea id="content" placeholder="content" onChange={this.handleChange} value={this.state.content} /></div>
          <div><Textarea id="cover-url" placeholder="cover url" onChange={this.handleChange} value={this.state.cover_url} /></div>
          <div><button id="save" onClick={this.handleSave}>save</button></div>
        </div>
      );
    };
    return (
      renderPost()
    );
  }
}

export default withRouter(connect(null, null)(NewPost));
