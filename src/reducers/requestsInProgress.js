import Types from '../actions/Types';
import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

export const INITIAL_STATE = Immutable({
  reqIP: 0
});
/*
  I do not use the 'action' arg,
  with these methods because I do not need the actions payload.

  If I were passing data to the Store I would be using action.payload,
  as the value to replace the current store's property (respectively.)
*/
const reqSent = (state) =>
state.merge(state.reqIP += 1);

const reqSuccess = (state) =>
state.merge(state.reqIP -= 1);

const reqError = (state) =>
state.merge(state.reqIP -= 1);

const ACTION_HANDLERS = {
  [Types.REQUEST_SENT]: reqSent,
  [Types.REQUEST_RECEIVED_SUCCESSFUL]: reqSuccess,
  [Types.REQUEST_RECEIVED_ERROR]: reqError,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);

/* OLD TEMPLATE
import * as types from "../actions/actionTypes";
import * as initialState from "./initialState";

export default function requestStatusReducer(state = initialState.requestsInProgress, action) {

switch(action.type) {
case types.REQUEST_SENT:
return (
state + 1
);
case types.REQUEST_RECEIVED_SUCCESSFUL:
return (
state - 1
);
case types.REQUEST_RECEIVED_ERROR:
return (
state - 1
);
default:
return state;
}
}
*/
