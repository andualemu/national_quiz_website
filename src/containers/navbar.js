import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { signoutUser, fetchProfile } from '../actions/index';

class NavBar extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProfile(localStorage.getItem('email'), this.props.history));
  }
  handleClick = (event) => {
    this.props.dispatch(signoutUser(this.props.history));
  }
  render() {
    const renderAuth = () => {
      if (this.props.auth) {
        return (
          <Nav className="auth-nav" pullRight>
            <LinkContainer className="home" to="/" exact>
              <NavItem>Home</NavItem>
            </LinkContainer>
            <LinkContainer to={`/profile/${localStorage.getItem('email')}`}>
              <NavItem>Profile (signed in as {localStorage.getItem('email')})</NavItem>
            </LinkContainer>
            <NavItem className="signout-button" onClick={this.handleClick}>
              signout
            </NavItem>
          </Nav>
        );
      } else {
        return (
          <Nav className="auth-nav" pullRight>
            <LinkContainer className="home" to="/" exact>
              <NavItem>Home</NavItem>
            </LinkContainer>
            <LinkContainer className="signin-button" to="/signin">
              <NavItem>signin</NavItem>
            </LinkContainer>
            <LinkContainer className="signup-button" to="/signup">
              <NavItem>signup</NavItem>
            </LinkContainer>
          </Nav>
        );
      }
    };
    const pleaseSignIn = () => {
      if (this.props.auth) {
        return <div />;
      } else {
        return (
          <div className="comeIn"> please sign in or sign up to answer questions and display explanations</div>
        );
      }
    };
    const pointsDisplay = () => {
      if (this.props.user_profile.profile) {
        if (this.props.auth) {
          return <div className="points-display"><br />Your Points:<br /><span id="points">{this.props.user_profile.profile.points}</span></div>;
        } else {
          return <div />;
        }
      } else {
        return <div />;
      }
    };
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              EthioExamPrep
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            {renderAuth()}
          </Navbar.Collapse>
        </Navbar>
        {pleaseSignIn()}
        {pointsDisplay()}
      </div>
    );
  }
}

// connects particular parts of redux state to this component's props
const mapStateToProps = state => (
  {
    auth: state.auth.authenticated,
    user_profile: state.user_profile,
  }
);

export default withRouter(connect(mapStateToProps, null)(NavBar));
