import { reducers as apiReducers } from 'redux-api-call';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import UserState from './UserState';
import VotingState from './VotingState';

export default combineReducers({
  form: formReducer,
  ...apiReducers,
  ...UserState,
  ...VotingState
});
