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
          <div className="subject"><NavLink to="/quiz/bio">Biology </NavLink></div>
          <div className="subject"><NavLink to="/quiz/physics"> Physics </NavLink></div>
          <div className="subject"><NavLink to="/quiz/math"> Mathimatics </NavLink></div>
          <div className="subject"><NavLink to="/quiz/geo"> Geography </NavLink></div>
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
