import ReduxPersist from '../Config/ReduxPersist';
import LocalForage from 'localforage';
import { persistStore } from 'redux-persist';
import StartupActions from '../Redux/StartupRedux';

const updateReducers = (store) => {
  const reducerVersion = ReduxPersist.reducerVersion;
  const config = ReduxPersist.storeConfig;
  const startup = () => store.dispatch(StartupActions.startup());

  LocalForage.getItem('reducerVersion')
  .then((localVersion) => {
    if (localVersion !== reducerVersion) {
      persistStore(store, config, startup).purge();
      LocalForage.setItem('reducerVersion', reducerVersion);
    } else {
      persistStore(store, config, startup);
    }
  })
  .catch(() => {
    persistStore(store, config, startup);
    LocalForage.setItem('reducerVersion', reducerVersion);
  });
};

export default updateReducers;
