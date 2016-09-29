// import * as types from "../actions/actionTypes";
// import * as initialState from "./initialState";
//
// export default function requestStatusReducer(state = initialState.requestsInProgress, action) {
//
//   switch(action.type) {
//     case types.REQUEST_SENT:
//     return (
//       state + 1
//     );
//     case types.REQUEST_RECEIVED_SUCCESSFUL:
//     return (
//       state - 1
//     );
//     case types.REQUEST_RECEIVED_ERROR:
//     return (
//       state - 1
//     );
//     default:
//     return state;
//   }
// }

import Types from '../actions/actionTypes';
import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

export const INITIAL_STATE = Immutable({
  reqIP: 0
});

const reqSent = (state, action) =>
state.merge(state['reqIP'] += 1);


const ACTION_HANDLERS = {
  [Types.REQUEST_SENT]: reqSent,
  [Types.REQUEST_RECEIVED_SUCCESSFUL]: reqSuccess,
  [Types.REQUEST_RECEIVED_ERROR]: reqError,
};
