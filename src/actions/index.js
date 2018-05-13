import axios from 'axios';

const ROOT_URL = 'http://localhost:9090/api';
const API_KEY = '';
// const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';

// keys for actiontypes
export const ActionTypes = {

  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',

  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};
// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signinUser({ email, password }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      history.push('/');
    })
      .catch((err) => {
        dispatch(authError(`Sign In Failed: ${err.response.data}`));
      });
  };
}

export function signupUser({ email, password }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      history.push('/');
    })
      .catch((err) => {
        dispatch(authError(`Sign Up Failed: ${err.response.data}`));
      });
  };
}

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then((response) => {
      // do something with response.data  (some json)
      console.log('response: ', response.data);
      dispatch({
        type: ActionTypes.FETCH_POSTS,
        payload: response.data,
      });
    }).catch((error) => {
      // hit an error do something else!
      console.log('Error in fetchPosts: ', error);
    });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}?key=${API_KEY}`).then((response) => {
      // do something with response.data  (some json)
      dispatch({
        type: ActionTypes.FETCH_POST,
        payload: response.data,
      });
    }).catch((error) => {
      // hit an error do something else!
      console.log('Error in fetchPost: ', error);
    });
  };
}

export function deletePost(id, history) {
  axios.delete(`${ROOT_URL}/posts/${id}?key=${API_KEY}`, { headers: { authorization: localStorage.getItem('token') } }).then(() => {
    // do something with response.data  (some json)
    console.log('Delete: ', id);
    history.push('/');
  }).catch((error) => {
    // hit an error do something else!
    console.log('Error in deletePost: ', error);
  });
}

export function createPost(post, history) {
  axios.post(`${ROOT_URL}/posts${API_KEY}`, post, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
    // do something with response.data  (some json)
    history.push('/');
  }).catch((error) => {
    // hit an error do something else!
    console.log('Error in createPost: ', error);
  });
}

export function updatePost(id, post, history) {
  axios.put(`${ROOT_URL}/posts/${id}?key=${API_KEY}`, post, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
    // do something with response.data  (some json)
    console.log('pushing: ', id);
    history.push(`/posts/${id}`);
  }).catch((error) => {
    // hit an error do something else!
    console.log('Error in updatePost: ', error);
  });
}
