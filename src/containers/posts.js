/* eslint consistent-return: 0 */
/* eslint array-callback-return: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import { fetchPosts } from '../actions/index';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchterm: '',
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }
  handleChange = (event) => {
    this.setState({ searchterm: event.target.value });
  }

  render() {
    const renderPosts = () => {
      return (
        this.props.posts
          .filter((post) => {
            if (post.tags.includes(this.state.searchterm)) {
              return post;
            }
          })
          .map((post) => {
            return (
              <div className="post" key={post.id}>
                <div className="info-box">
                  <div className="title"><NavLink to={`posts/${post.id}`}>{post.title}</NavLink></div>
                  <div className="tags-glance"> Tags: {post.tags}</div>
                </div>
                <div className="title-cover"><img src={post.cover_url} alt={post.cover_url} /></div>
              </div>
            );
          }));
    };
    return (
      <div>
        <h1>Posts</h1>
        <input id="search-bar" placeholder="filter by tag" onChange={this.handleChange} value={this.state.searchterm} />
        <div className="posts">
          {renderPosts()}
        </div>
      </div>
    );
  }
}

// connects particular parts of redux state to this component's props
const mapStateToProps = state => (
  {
    posts: state.posts.all,
  }
);

export default withRouter(connect(mapStateToProps, null)(Posts));
