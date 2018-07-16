import React from 'react';
// import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import '../style.scss';

import Home from '../containers/home';
import Questions from '../containers/questions';

import SignIn from '../containers/signin';
import SignUp from '../containers/signup';

import NavBar from '../containers/navbar';
import Profile from '../containers/profile';

// import requireAuth from '../containers/requireAuth';

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};
const App = (props) => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/quiz/:subject" component={Questions} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/profile/:email" component={Profile} />
          <Route render={() => (<div>post not found </div>)} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
