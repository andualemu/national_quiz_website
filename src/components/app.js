import React from 'react';
// import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import '../style.scss';

import Posts from '../containers/posts';
import NewPost from '../containers/new-post';
import Post from '../containers/post';
import UpdatePost from '../containers/update-post';

import SignIn from '../containers/signin';
import SignUp from '../containers/signup';

import NavBar from '../containers/navbar';

import ErrorDisplay from './error-display';


const FallBack = (props) => {
  return <div>URL Not Found</div>;
};
const App = (props) => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/new" component={NewPost} />
          <Route exact path="/posts/:postID" component={Post} />
          <Route path="/posts/:postID/edit" component={UpdatePost} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/error" component={ErrorDisplay} />
          <Route render={() => (<div>post not found </div>)} />
          <Route component={FallBack} />
        </Switch>

      </div>
    </Router>
  );
};

export default App;
