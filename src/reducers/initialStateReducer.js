"use strict";

import * as types from "../actions/actionTypes";
import * as initialState from "./initialState";

export default function initialStateReducer (state = initialState.initial, action) {
    switch(action.type) {
        default:
            return state;
    }
}