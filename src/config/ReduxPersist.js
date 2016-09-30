import ImmutablePersistenceTransform from './ImmutablePersistenceTransform';
import { persistentStoreBlacklist as blacklist, persistentStoreWhiteList as whitelist } from '../reducers/';
import localForage from 'localforage';

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1',
  storeConfig: {
    blacklist,
    whitelist,
    storage: localForage,
    transforms: [ImmutablePersistenceTransform]
  }
};

export default REDUX_PERSIST;
