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
      <div>
        <h1>Subjects</h1>
        <ul>
          <li> <NavLink to="/quiz/bio"> Biology </NavLink> </li>
          <li> <NavLink to="/quiz/physics"> Physics </NavLink> </li>
          <li> <NavLink to="/quiz/math"> Mathimatics </NavLink> </li>
          <li> <NavLink to="/quiz/geo"> Geography </NavLink> </li>
        </ul>
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
