import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { signinUser } from '../actions/index';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  handleChange = (event) => {
    if (event.target.id === 'email') {
      this.setState({ email: event.target.value });
    } else if (event.target.id === 'password') {
      this.setState({ password: event.target.value });
    }
  }

  handleClick = (event) => {
    this.props.dispatch(signinUser(this.state, this.props.history));
  }
  render() {
    return (
      <div>
        <input id="email" placeholder="email" value={this.state.email} onChange={this.handleChange} />
        <input id="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
        <button id="signin" onClick={this.handleClick}>signin</button>
      </div>
    );
  }
}

export default withRouter(connect(null, null)(SignIn));
