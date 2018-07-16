import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Button } from 'react-bootstrap';

import Explain from './explain';
import { fetchProfile } from '../actions/index';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextDisabled: false,
      prevDisabled: false,
      answersDisabled: true,
      classNameA: 'choice ',
      classNameB: 'choice ',
      classNameC: 'choice ',
      classNameD: 'choice ',
      submitHidden: true,
      explainClass: '',
    };
  }
  componentDidMount() {
    console.log('componentDidMount in Question');
    this.props.fetchProfile(localStorage.getItem('email'), this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    console.log('newProps in Question');
    if (this.props.user_profile.profile) {
      this.handleDisabled();
      this.handleChoiceStyling();
    }
  }

  handleAnswerHelperRed = (ans) => {
    if (ans !== this.props.question.answer) {
      if (ans === 'a') {
        this.setState({ classNameA: `${this.state.classNameA}incorrect ` });
      } else if (ans === 'b') {
        this.setState({ classNameB: `${this.state.classNameB}incorrect ` });
      } else if (ans === 'c') {
        this.setState({ classNameC: `${this.state.classNameC}incorrect ` });
      } else if (ans === 'd') {
        this.setState({ classNameD: `${this.state.classNameD}incorrect ` });
      }
    }
  }

  handleAnswer = (event) => {
    console.log('handleAnswer in Question');
    if (this.props.question.questionNo !== 10) this.setState({ nextDisabled: false });
    this.setState({ answersDisabled: true });
    this.setState({ explainClass: '' });
    if (event.target.value === this.props.question.answer) {
      this.props.handleScore(event.target.value, 1);
    } else {
      this.props.handleScore(event.target.value, 0);
    }
    this.handleAnswerHelperRed(event.target.value);
    this.handleChoiceHelperGreen();
  }

  handleDisabled = () => {
    console.log('handleDisabled in Question');
    const answers = this.props.user_profile.profile[this.props.question.subject];

    // control question interactivity (answer mode)
    if (this.props.question.questionNo > answers.length) {
      this.setState({ nextDisabled: true });
      this.setState({ answersDisabled: false });
      this.setState({ explainClass: `${this.state.explainClass}explain ` }); // hide answer
    }

    // limit question bounds
    if (this.props.question.questionNo === 1) {
      this.setState({ prevDisabled: true });
    } else if (this.props.question.questionNo === 10) {
      this.setState({ nextDisabled: true });
      this.setState({ submitHidden: false });
    }
  }

  handleChoiceHelperGreen = () => {
    if (this.props.question.answer === 'a') {
      this.setState({ classNameA: `${this.state.classNameA}correct ` });
    } else if (this.props.question.answer === 'b') {
      this.setState({ classNameB: `${this.state.classNameB}correct ` });
    } else if (this.props.question.answer === 'c') {
      this.setState({ classNameC: `${this.state.classNameC}correct ` });
    } else if (this.props.question.answer === 'd') {
      this.setState({ classNameD: `${this.state.classNameD}correct ` });
    }
  }

  handleChoiceHelperRed = () => {
    const answers = this.props.user_profile.profile[this.props.question.subject];
    if (answers[this.props.question.questionNo - 1] !== this.props.question.answer) {
      if (answers[this.props.question.questionNo - 1] === 'a') {
        this.setState({ classNameA: `${this.state.classNameA}incorrect ` });
      } else if (answers[this.props.question.questionNo - 1] === 'b') {
        this.setState({ classNameB: `${this.state.classNameB}incorrect ` });
      } else if (answers[this.props.question.questionNo - 1] === 'c') {
        this.setState({ classNameC: `${this.state.classNameC}incorrect ` });
      } else if (answers[this.props.question.questionNo - 1] === 'd') {
        this.setState({ classNameD: `${this.state.classNameD}incorrect ` });
      }
    }
  }

  handleChoiceStyling = () => {
    const answers = this.props.user_profile.profile[this.props.question.subject];
    if (this.state.answersDisabled) {
      if (answers.length >= this.props.question.questionNo) {
        this.handleChoiceHelperGreen();
        this.handleChoiceHelperRed();
      }
    }
  }
  render() {
    console.log('render in Question');
    return (
      <div>
        <h1> Question </h1>
        <ul>
          <li><div>question: {this.props.question.question}</div></li>
          <li><Button className={this.state.classNameA} value="a" onClick={this.handleAnswer} disabled={this.state.answersDisabled}>a, {this.props.question.a}</Button></li>
          <li><Button className={this.state.classNameB} value="b" onClick={this.handleAnswer} disabled={this.state.answersDisabled}>b, {this.props.question.b}</Button></li>
          <li><Button className={this.state.classNameC} value="c" onClick={this.handleAnswer} disabled={this.state.answersDisabled}>c, {this.props.question.c}</Button></li>
          <li><Button className={this.state.classNameD} value="d" onClick={this.handleAnswer} disabled={this.state.answersDisabled}>d, {this.props.question.d}</Button></li>
        </ul>
        <div>
          <Button className="Prev" onClick={this.props.handleQuestionScroll} value="Prev" disabled={this.state.prevDisabled}>Prev</Button>
          <Button className="Next" onClick={this.props.handleQuestionScroll} value="Next" disabled={this.state.nextDisabled}>Next</Button>
          <Button className="Next" onClick={this.props.handleQuestionScroll} value="Next" disabled={this.state.submitHidden}>Submit</Button>
        </div>
        <div>
          <Explain stylingClass={this.state.explainClass} explain={this.props.question.explanation} />
        </div>
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

export default withRouter(connect(mapStateToProps, { fetchProfile })(Question));
