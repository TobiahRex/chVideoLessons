import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['username'],
  loginFailure: ['error'],
  logout: null
});

export const LoginTypes = Types;
export default Creators;

export const INITIAL_STATE = {
  username: null,
  error: null,
  fetching: false
};

export const request = (state) =>
state.merge({ fetching: true });

export const success = (state, { username }) =>
state.merge({ fetching: false, username });

export const failure = (state, { error }) =>
state.merge({ fetching: false, error });

export const logout = (state) => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout
});

// ------------ Selectors ------------ //
export const isLoggedIn = (loginState) =>
loginState.user !== null;
