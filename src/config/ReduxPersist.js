import ImmutablePersistenceTransform from '../Services/ImmutablePersistenceTransform';
import LocalForage from 'localforage';

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '2',
  storeConfig: {
    storage: LocalForage,
    blacklist: ['login'],
    whitelist: [],
    transforms: [ImmutablePersistenceTransform]
  }
};

export default REDUX_PERSIST;
