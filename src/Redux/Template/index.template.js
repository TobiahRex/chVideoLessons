import { combineReducers } from 'redux';
import configureStore from './CreateStore.template';
import rootSaga from '../../Sagas/index.template';

export default () => {
  const rootReducer = combineReducers({
    temperature: require('./TemperatureRedux.template').reducer,
    login: require('./LoginRedux.template.template').reducer
  });
  //  NOTE:  configureStore(rootReducer, rootSaga) returns a variable "store"
  //  which will invoke createStore() when invoked by the rootComponent in,
  // Containers/App.js
  return configureStore(rootReducer, rootSaga);

};
