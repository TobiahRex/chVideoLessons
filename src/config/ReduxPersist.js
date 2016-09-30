import ImmutablePersistenceTransform from '../store/ImmutablePersistenceTransform';
import { persistentStoreBlacklist as blacklist, persistentStoreWhiteList as whitelist } from '../reducers/';
import localForage from 'localforage';

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1',
  storeConfig: {
    storage: localForage,
    blacklist,
    whitelist,
    transforms: [
      ImmutablePersistenceTransform
    ]
  }
};
