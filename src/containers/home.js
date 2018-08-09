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
        <div className="hello-there">
        Well Hello There!
        </div>
        <div className="all-container">
          <div className="subjects-container welcome-home">
          Welcome to EthioExamPrep!<br />
          EthioExamPrep is your one-stop shop for past papers and national examinations.<br />
          Are you tired of spending a forturne on exam prep books?
          Have you ever felt like there are no resources to help you prepare for your exam?<br />
          Rest ashured, you are not alone. This is a common problem.<br />
          EthioExamPrep to the rescue! We offer exam questions for almost every subbject.<br />
          These questions come with answers and detailed explanations. And the best part, it is free!
          </div>
          <div className="subjects-container">
            <h1>Subjects</h1>
            <div className="subject-list">
              <NavLink to="/quiz/bio"><div className="subject">Biology </div></NavLink>
              <NavLink to="/quiz/physics"><div className="subject"> Physics </div></NavLink>
              <NavLink to="/quiz/math"><div className="subject"> Mathematics </div></NavLink>
              <NavLink to="/quiz/geo"><div className="subject"> Geography </div></NavLink>
            </div>
          </div>
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
