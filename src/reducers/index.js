import { combineReducers } from 'redux';

import QuestionReducer from './question-reducer';
import AuthReducer from './auth-reducer';
import ErrorReducer from './error-reducer';
import UserProfileReducer from './user-profile-reducer';

const rootReducer = combineReducers({
  questions: QuestionReducer,
  auth: AuthReducer,
  error: ErrorReducer,
  user_profile: UserProfileReducer,
});

export default rootReducer;
