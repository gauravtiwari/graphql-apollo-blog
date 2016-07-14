import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

let dehydratedState = {};

// create a store given an apollo client and a set of reducers/middleware
export default ({
  client,
  reducers = {},
  middleware = [],
  state
}) => createStore(
  combineReducers({
    apollo: client.reducer(),
    ...reducers,
  }),
  state,
  compose(
    applyMiddleware(client.middleware(), ...middleware),
  ),
);
