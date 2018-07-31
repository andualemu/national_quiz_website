import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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
      <div className="signin">
        <div className="signin-header">SignIn</div>
        <div><input id="email" className="signin-input" placeholder="email" value={this.state.email} onChange={this.handleChange} /></div>
        <div><input id="password" className="signin-input" placeholder="password" value={this.state.password} onChange={this.handleChange} /></div>
        <div><Button id="signin" className="signin-input" bsStyle="success" onClick={this.handleClick}>signin</Button></div>
      </div>
    );
  }
}

export default withRouter(connect(null, null)(SignIn));
