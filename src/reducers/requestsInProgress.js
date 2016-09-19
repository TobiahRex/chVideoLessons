"use strict";

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


