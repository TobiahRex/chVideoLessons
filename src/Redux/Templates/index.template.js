import { combineReducers } from 'redux';
import configureStore from './CreateStore.template.js';
import rootSaga from '../Sagas/';

export default () => {
  /* ------------- Initial State ------------- */
  const rootReducer = combineReducers({
    temperature: require('./TemperatureRedux.template.js').reducer,
    login: require('./LoginRedux.template.js').reducer
  });

  return configureStore(rootReducer, rootSaga);
};

/* Old Template

import { combineReducers } from 'redux';
import reqIP from './requestsInProgress';

export default combineReducers({
  reqIP
});

export const persistentStoreBlacklist = [];
export const persistentStoreWhiteList = [];
*/
