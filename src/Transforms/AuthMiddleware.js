/*
import React from "react";
import Types from "../Redux/LoginRedux";
import UserActions from "../Redux/UserRedux";

// This is middleware using THUNK.
const CheckActiveUser = (store) => // every piece of middleware is given the store.
(next) => // every piece of middleware is given a next argument to call the next piece of middleware with.
(action) => {
if (action.type !== types.CHECK_ACTIVE_USER) return next(action);
if (localStorage.profile && localStorage.id_token) {
let profile = JSON.parse(localStorage.profile);
let headers = new Headers();
headers.append("Content-Type", "application/json");
let options = {
headers,
method: "POST",
credentials: "same-origin",
mode: "cors",
cache: "default",
body: JSON.stringify({ email: profile.email })
};
fetch("/api/users/login", options)
.then(response => {
return response.json();
})
.then(parsedResponse => {
profile.userBeerData = parsedResponse;
store.dispatch(UserActions.activeUserConfirmed(profile));
return next(action);
})
.catch(error => {
console.log("Error: ", error);
return next(action);
});
} else {
return next(action);
}
};

export default {CheckActiveUser};
*/
