// import { createStore, compose, applyMiddleware } from 'redux';
// import { autoRehydrate } from 'redux-persist';
// import createSagaMiddleware from 'redux-saga';
// import createLogger from 'redux-logger';
// import R from 'ramda';
// import Config from '../Config/DebugSettings';
// import StartupType from './StartupRedux.template';
// import ReduxPersist from '../Config/ReduxPersist';
// import RehydrationServices from '../Services/RehydrationServices';
//
// export default (rootReducer, rootSaga) => {
//   const middlewares = [];
//   const enhancers = [];
//
//   const sagaMiddleware = createSagaMiddleware();
//   middlewares.push(sagaMiddleware);
//
//   const SAGA_LOGGING_BLACKLIST = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED', 'persist/REHYDRATE'];
//   if(_DEV_) {
//     const USE_LOGGING = Config.reduxLogging;
//     const logger = createLogger({
//       predicate: (getState, { type }) => USE_LOGGING && R.not(R.contains(type, SAGA_LOGGING_BLACKLIST))
//     });
//     middlewares.push(logger);
//
//     enhancers.push( typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ?
//       window.devToolsExtension() : f => f
//     );
//   }
//   enhancers.push(applyMiddleware(...middlewares));
//
//   if(ReduxPersist.active) {
//     enhancers.push(autoRehydrate());
//   }
//
//   const store = createStore(rootReducer, compose(...enhancers));
//
//   if(ReduxPersist.active) {
//     RehydrationServices.updateReducers(store);
//   }
//
//   sagaMiddleware.run(rootSaga);
//
//   return store;
// };
