"use strict";

import { combineReducers } from "redux";
import initialStateReducer from "./initialStateReducer";
import requestStatusReducer from "./requestsInProgress";

const rootReducer = combineReducers({
    initialState: initialStateReducer,
    requestsInProgress: requestStatusReducer
});

export default rootReducer;
