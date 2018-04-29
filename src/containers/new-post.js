import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createPost } from '../actions/index';

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: '',
    };
  }

  handleChange = (event) => {
    if (event.target.id === 'title') {
      this.setState({ title: event.target.value });
    } else if (event.target.id === 'tags') {
      this.setState({ tags: event.target.value });
    } else if (event.target.id === 'content') {
      this.setState({ content: event.target.value });
    }
  }
  handleSave = () => {
    createPost(this.state, this.props.history);
  };

  render() {
    const renderPost = () => {
      return (
        <div>
          <div><input id="title" placeholder="title" onChange={this.handleChange} value={this.state.title} /></div>
          <div><input id="tags" placeholder="tags" onChange={this.handleChange} value={this.state.tags} /></div>
          <div><input id="content" placeholder="content" onChange={this.handleChange} value={this.state.content} /></div>
          <div><button onClick={this.handleSave}>save</button></div>
        </div>
      );
    };
    return (
      renderPost()
    );
  }
}

export default withRouter(connect(null, null)(NewPost));
