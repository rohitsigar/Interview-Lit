import { combineReducers } from 'redux';
import code from './code';
import user from './user';
import interviewLink from './interview-link';

export default combineReducers({ code, user, interviewLink });
