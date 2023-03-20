import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import reducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
      })
    : compose;

const configureStore = (preloadedState) =>
  createStore(reducer, preloadedState, composeEnhancers(applyMiddleware(sagaMiddleware)));

const store = configureStore({}); //сперва должен идти вызов создания стора

sagaMiddleware.run(rootSaga);// вызов мидлвары должен происходить только после того как вызван applyMiddleware

export default store;
