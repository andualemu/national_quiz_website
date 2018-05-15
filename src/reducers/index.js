import { combineReducers } from 'redux';

import PostReducer from './post-reducer';
import AuthReducer from './auth-reducer';
import ErrorReducer from './error-reducer';
import UserProfileReducer from './user-profile-reducer';

const rootReducer = combineReducers({
  posts: PostReducer,
  auth: AuthReducer,
  error: ErrorReducer,
  user_profile: UserProfileReducer,
});

export default rootReducer;
