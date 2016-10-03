import ReduxPersist from '../config/ReduxPersist';
import localForage from 'localforage';
import { persistStore } from 'redux-persist';

const updateReducers = (store) => {
  const reducerVersion = ReduxPersist.reducerVersion;
  const config = ReduxPersist.storeConfig;

  persistStore(store, config, () => {
    console.info('Rehydration Completed!', store.getStore());
    const { dispatch } = store;
    dispatch(Actions.start());
  });
};



/*
  TODO:
  Continue building Rehydration Services
  Need to create Action Creator for Startup.
  Add STARTUP to Types.js
*/
