import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchProfile } from '../actions/index';

class Profile extends React.Component {
  constructor(props) {
    super();
  }
  componentWillMount() {
    this.props.dispatch(fetchProfile(this.props.match.params.email, this.props.history));
  }
  render() {
    const user = this.props.user_profile.profile;
    const renderUser = () => {
      if (user) {
        return (
          <div>
            email: {user.email}<br />
            id: {user.id}
          </div>
        );
      } else {
        return <div />;
      }
    };
    return (
      <div className="post-content">
        <h2>Your profile</h2>
        {renderUser()}
      </div>
    );
  }
}

// connects particular parts of redux state to this component's props
const mapStateToProps = state => (
  {
    user_profile: state.user_profile,
  }
);

export default withRouter(connect(mapStateToProps, null)(Profile));
