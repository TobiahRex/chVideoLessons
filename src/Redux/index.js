import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from '../Sagas/index';

export default () => {
  const rootReducer = combineReducers({
    login: require('./LoginRedux').reducer
  });

  return configureStore(rootReducer, rootSaga);
};
