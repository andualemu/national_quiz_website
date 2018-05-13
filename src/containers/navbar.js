import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import { signoutUser } from '../actions/index';

class NavBar extends React.Component {
  handleClick = (event) => {
    this.props.dispatch(signoutUser(this.props.history));
  }
  render() {
    const renderAuth = () => {
      if (this.props.auth) {
        return <li><button className="signout-button" onClick={this.handleClick}>signout</button></li>;
      } else {
        return (
          <div>
            <li><NavLink className="signin-button" to="/signin">signin</NavLink></li>
            <li><NavLink className="signup-button" to="/signup">signup</NavLink></li>
          </div>
        );
      }
    };
    return (
      <nav>
        <div id="header">
          <li><NavLink className="home" to="/" exact>My Super Awesome Blog</NavLink></li>
          <li><NavLink className="new-post" to="/posts/new">new post</NavLink></li>
          {renderAuth()};
        </div>
      </nav>
    );
  }
}

// connects particular parts of redux state to this component's props
const mapStateToProps = state => (
  {
    auth: state.auth.authenticated,
  }
);

export default withRouter(connect(mapStateToProps, null)(NavBar));
