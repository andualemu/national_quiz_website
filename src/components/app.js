import React from 'react';
// import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import '../style.scss';

import Posts from '../containers/posts';
import NewPost from '../containers/new-post';
import Post from '../containers/post';
import UpdatePost from '../containers/update-post';


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
          <Route render={() => (<div>post not found </div>)} />
          <Route component={FallBack} />
        </Switch>

      </div>
    </Router>
  );
};

const NavBar = (props) => {
  return (
    <nav>
      <div id="header">
        <li><NavLink className="home" to="/" exact>My Super Awesome Blog</NavLink></li>
        <li><NavLink className="new-post" to="/posts/new">new post</NavLink></li>
      </div>
    </nav>
  );
};


export default App;
