import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import getRootReducer from './reducers';

//eslint-disable-next-line import/no-mutable-exports
export let store;

export default function getStore(persistedState) {
  const routeReducer = getRootReducer({}, {});
  store = createStore(
    routeReducer, persistedState,
    applyMiddleware(thunk)
  );

  return store;
}