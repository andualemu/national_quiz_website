import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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
      <div className="signin">
        <div className="signin-header">SignUp</div>
        <div><input id="user-name" className="signin-input" placeholder="user name" value={this.state.userName} onChange={this.handleChange} /></div>
        <div><input id="email" className="signin-input" placeholder="email" value={this.state.email} onChange={this.handleChange} /></div>
        <div><input id="password" className="signin-input" placeholder="password" value={this.state.password} onChange={this.handleChange} /></div>
        <div><Button id="signup" className="signin-input" bsStyle="success" onClick={this.handleClick}>signup</Button></div>
      </div>
    );
  }
}

export default withRouter(connect(null, null)(SignUp));
