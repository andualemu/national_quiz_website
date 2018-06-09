import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { signupUser } from '../actions/index';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userName: '',
    };
  }
  handleChange = (event) => {
    if (event.target.id === 'email') {
      this.setState({ email: event.target.value });
    } else if (event.target.id === 'password') {
      this.setState({ password: event.target.value });
    } else if (event.target.id === 'user-name') {
      this.setState({ userName: event.target.value });
    }
  }

  handleClick = (event) => {
    this.props.dispatch(signupUser(this.state, this.props.history));
  }
  render() {
    return (
      <div>
        <input id="user-name" placeholder="user name" value={this.state.userName} onChange={this.handleChange} />
        <input id="email" placeholder="email" value={this.state.email} onChange={this.handleChange} />
        <input id="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
        <button id="signup" onClick={this.handleClick}>signup</button>
      </div>
    );
  }
}

export default withRouter(connect(null, null)(SignUp));
