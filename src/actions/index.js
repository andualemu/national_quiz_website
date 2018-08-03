import axios from 'axios';

// const ROOT_URL = 'http://localhost:9090/api';
const API_KEY = '';
const ROOT_URL = 'https://national-quiz-api.herokuapp.com/api';

// keys for actiontypes
export const ActionTypes = {
  FETCH_QUESTIONS: 'FETCH_QUESTIONS',

  FETCH_PROFILE: 'FETCH_PROFILE',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',

  ERROR: 'ERROR',
};

export function fetchProfile(email, history) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/profile/${email}?key=${API_KEY}`).then((response) => {
      dispatch({
        type: ActionTypes.FETCH_PROFILE,
        payload: response,
      });
    })
      .catch((error) => {
        // doesn't do anything yet, TODO: display this error
        dispatch({
          type: ActionTypes.ERROR,
          payload: error.response.data,
        });
      });
  };
}
// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
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

export function signinUser({ email, password, userName }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('email', email);
      localStorage.setItem('token', response.data.token);
      history.push('/');
    })
      .catch((err) => {
        dispatch(authError(`Sign In Failed: ${err.response.data}`));
      });
  };
}

export function signupUser({ email, password, userName }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password, userName }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('email', email);
      localStorage.setItem('token', response.data.token);
      history.push('/');
    })
      .catch((err) => {
        dispatch(authError(`Sign Up Failed: ${err.response.data}`));
      });
  };
}

export function fetchQuestions(subject) {
  return (dispatch) => {
    console.log('sending get request for:', subject);
    axios.get(`${ROOT_URL}/quizes${API_KEY}/${subject}`).then((response) => {
      // do something with response.data  (some json)
      console.log('response: ', response.data);
      dispatch({
        type: ActionTypes.FETCH_QUESTIONS,
        payload: response.data,
      });
    }).catch((error) => {
      // hit an error, handle it
      dispatch({
        type: ActionTypes.ERROR,
        payload: error.data,
      });
      console.log('Error in fetchPosts: ', error);
    });
  };
}

export function uploadAnswers(id, subject, answers) {
  console.log('uploading answers');
  // /${id}?key=${API_KEY}/${subject}
  return (dispatch) => {
    axios.put(`${ROOT_URL}/user/${id}/${subject}?key=${API_KEY}`, answers, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      // do something with response.data  (some json)
      console.log('uploading: ', id, answers);
    }).catch((error) => {
      // hit an error do something else!
      dispatch({
        type: ActionTypes.ERROR,
        payload: error.response.data,
      });
    });
  };
}

export function uploadPoints(id, points) {
  console.log('uploading points: ', points);
  // /${id}?key=${API_KEY}/${subject}
  return (dispatch) => {
    axios.put(`${ROOT_URL}/points/${id}?key=${API_KEY}`, { points }, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      // do something with response.data  (some json)
      console.log('uploading: ', id, points);
    }).catch((error) => {
      // hit an error do something else!
      dispatch({
        type: ActionTypes.ERROR,
        payload: error.response.data,
      });
    });
  };
}
