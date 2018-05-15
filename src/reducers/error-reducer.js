import { ActionTypes } from '../actions';

const initialState = {
  errorMessage: '',
};

const ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ERROR:
      return Object.assign({}, state, { errorMessage: action.payload.message });
    case ActionTypes.ERASE_ERROR:
      return Object.assign({}, state, { errorMessage: '' });
    default:
      return state;
  }
};

export default ErrorReducer;
