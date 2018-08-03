import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchQuestions, uploadAnswers, fetchProfile, uploadPoints } from '../actions/index';
import Question from './question';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curr: 0,
      score: 0,
      // nextDisabled: true,
      // answers: [],
    };
  }
  componentDidMount() {
    // console.log('componentDidMount in Questions');
    this.props.fetchQuestions(this.props.match.params.subject);
    this.props.fetchProfile(localStorage.getItem('email'), this.props.history);
  }

  handleQuestionScroll = (event) => {
    // console.log('handleQuestionScroll in Questions');
    // this.setState({ nextDisabled: true });
    if (event.target.value === 'Next') {
      this.setState({ curr: this.state.curr + 1 });
    } else if (event.target.value === 'Prev') {
      this.setState({ curr: this.state.curr - 1 });
    }
  }

  handleScore = (chosenAnswer, score) => {
    // console.log('handleScore in Questions');
    const answers = this.props.user_profile.profile[this.props.match.params.subject];
    // TODO: store in sessionStorage for faster access

    // upload answers for this subject to the database
    this.props.uploadAnswers(
      this.props.user_profile.profile._id,
      this.props.match.params.subject,
      [...answers, chosenAnswer],
    );

    // update user's points -------------------------
    this.props.uploadPoints(
      this.props.user_profile.profile._id,
      this.props.user_profile.profile.points + score,
    );
    // this.setState({ nextDisabled: false });
    this.setState({ score: this.state.score + score });
  }

  renderQuestionHelperWelcome = () => {
    return (
      <div className="welcome-container">
        <h1>{this.props.match.params.subject}</h1>
        <div className="welcome">Welcome to your weekly quiz!</div>
        <button onClick={() => { this.setState({ curr: 1 }); }}>Start</button>
      </div>
    );
  }
  renderQuestionHelperFairwell = () => {
    return (
      <div>
        You are done!
        Points earned: {this.state.score}/5
      </div>
    );
  }

  renderQuestion = () => {
    // console.log('currQuestion/renderQuestion in Questions');
    console.log('Curr question:', this.state.curr);
    if (this.state.curr === 0) {
      return this.renderQuestionHelperWelcome();
    } else if (this.state.curr === 11) {
      return this.renderQuestionHelperFairwell();
    }
    return this.props.questions.map((question) => {
      if (question.questionNo === this.state.curr) {
        return (
          <div key={question.question}>
            <Question question={question} handleScore={this.handleScore} handleQuestionScroll={this.handleQuestionScroll} curr={this.state.curr} />
          </div>
        );
      } else {
        return <div key={question.question} />;
      }
    });
  };

  render() {
    // console.log('render in Questions');
    return (
      <div className="question-overall-container">
        {this.renderQuestion()}
      </div>
    );
  }
}

// connects particular parts of redux state to this component's props
const mapStateToProps = state => (
  {
    questions: state.questions.questions,
    user_profile: state.user_profile,
  }
);

export default withRouter(connect(mapStateToProps, {
  fetchQuestions, uploadAnswers, fetchProfile, uploadPoints,
})(Questions));
