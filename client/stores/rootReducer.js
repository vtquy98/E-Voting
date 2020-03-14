import { reducers as apiReducers } from 'redux-api-call';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import UserState from './UserState';
import ElectionState from './ElectionState';
import SettingState from './settingState';

export default combineReducers({
  form: formReducer,
  ...apiReducers,
  ...UserState,
  ...ElectionState,
  ...SettingState
});
