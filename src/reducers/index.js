import { combineReducers } from 'redux';
import auth from './auth';
import nav from './nav';

export default function getRootReducer() {
  return combineReducers({
    auth,
    nav
  });
}
