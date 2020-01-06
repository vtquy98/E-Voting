import { createStore, applyMiddleware, compose } from 'redux';
import reduxArrayMiddleware from 'redux-array-middleware';
import reduxThunk from 'redux-thunk';
import { compact } from 'lodash/fp';
import { middleware as apiReactionMiddleware } from '../middlewares/api-reaction';
import apiMiddlewares from '../middlewares';
import apiPrefix from '../middlewares/api-prefix';
import rootReducer from './rootReducer'; //view
import { isServer } from '../libs';

const env = process.env.NODE_ENV || 'development';

const logger = () => next => action => {
  isServer && env === 'development' && console.log('REDUX: %s', action.type);
  return next(action);
};

// const cp =
//   typeof window !== 'undefined'
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     : compose;

const makeStore = initialState => {
  const base = process.env.API_SERVER_URL || 'http://localhost:3003';
  const enhancers = compact([
    applyMiddleware(
      logger,
      reduxThunk,
      reduxArrayMiddleware,
      apiPrefix(base),
      apiMiddlewares,
      apiReactionMiddleware
    ),
    typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
  ]);
  const store = createStore(rootReducer, initialState, compose(...enhancers));

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const newReducer = require('./rootReducer').default;

      store.replaceReducer(newReducer);
    });
  }

  return store;
};

export default makeStore;
