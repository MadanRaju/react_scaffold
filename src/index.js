/*jshint esversion: 6 */
/* eslint-disable import/first */
import './util/ie-polyfills';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import React from 'react';
import ReactDOM from 'react-dom';

import throttle from 'lodash/throttle';

import App from './App';
import Login from './components/pages/login_page/Login';

import getStore from './store';
import { loadState, saveState } from './localStorage';
import RecoverPassword from './components/pages/login_page/RecoverPassword';
import UserManagement from './components/pages/user_management/UserManagement';

const persistedState = loadState();
const store = getStore(persistedState);

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/reset-password" component={RecoverPassword} />
        <Route exact path="/user-management" component={UserManagement} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </Provider>,
  rootElement
);
