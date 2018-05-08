import axios from 'axios';

const ROOT_URL = 'http://andualem-cs52-blog.herokuapp.com/api';
const API_KEY = '';
// const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';

// keys for actiontypes
export const ActionTypes = {

  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
};

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
  axios.delete(`${ROOT_URL}/posts/${id}?key=${API_KEY}`).then(() => {
    // do something with response.data  (some json)
    console.log('Delete: ', id);
    history.push('/');
  }).catch((error) => {
    // hit an error do something else!
    console.log('Error in deletePost: ', error);
  });
}

export function createPost(post, history) {
  axios.post(`${ROOT_URL}/posts${API_KEY}`, post).then((response) => {
    // do something with response.data  (some json)
    history.push('/');
  }).catch((error) => {
    // hit an error do something else!
    console.log('Error in createPost: ', error);
  });
}

export function updatePost(id, post, history) {
  axios.put(`${ROOT_URL}/posts/${id}?key=${API_KEY}`, post).then((response) => {
    // do something with response.data  (some json)
    console.log('pushing: ', id);
    history.push(`/posts/${id}`);
  }).catch((error) => {
    // hit an error do something else!
    console.log('Error in updatePost: ', error);
  });
}
