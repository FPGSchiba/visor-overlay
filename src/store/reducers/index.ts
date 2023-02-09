import { combineReducers } from 'redux';
import auth from './auth';
import report from './reports';

export default combineReducers({authState: auth, reportState: report});
