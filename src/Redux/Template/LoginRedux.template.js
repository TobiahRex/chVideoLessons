import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['username'],
  loginFailure: ['error'],
  logout: null
});

export const LoginTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  username: null,
  error: null,
  fetching: false
};

/* ------------- Reducers ------------- */

// attempting to login.
export const request = (state) =>
state.merge({ fetching: true });

// login successfull.
export const success = (state, { username }) =>
state.merge({ fetching: false, username });

// login failed.
export const failure = (state, { error }) =>
state.merge({ fetching: false, error});

// we've logged out.
export const logout = (state) => INITIAL_STATE;

/* ------------- Hookup Reducer to Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout
});

/* ------------- Selectors ------------- */
// Is the current user logged in?
export const isLoggedIn = (loginState) =>
loginState.user !== null;
