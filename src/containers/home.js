import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // do sth
  }

  render() {
    return (
      <div className="subjects-container">
        <h1>Subjects</h1>
        <div className="subject-list">
          <NavLink to="/quiz/bio"><div className="subject">Biology </div></NavLink>
          <NavLink to="/quiz/physics"><div className="subject"> Physics </div></NavLink>
          <NavLink to="/quiz/math"><div className="subject"> Mathimatics </div></NavLink>
          <NavLink to="/quiz/geo"><div className="subject"> Geography </div></NavLink>
        </div>
      </div>
    );
  }
}

// connects particular parts of redux state to this component's props
const mapStateToProps = state => (
  {

  }
);

export default withRouter(connect(mapStateToProps, null)(Home));
