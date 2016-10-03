import { put } from 'redux-saga/effects';
import LoginActions from '../Redux/LoginRedux';

// attempts to LoginRedux
export function * login({ username, password }) {
  if (password === ''){
    // dispatch failure
    yield put(LoginActions.loginFailure('WRONG'));
  } else {
    // dispatch successful login
    yield put(LoginActions.loginSuccess(username));
  }
}
