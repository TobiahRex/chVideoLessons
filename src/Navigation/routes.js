import React from "react";
import { Route, IndexRedirect } from "react-router";
import App from "../Containers/App";
import HomePage from "../Containers/Home/HomePage";
import toastr from "toastr";

const generateRoutes = (store) => {
  const checkIfActiveUser = (nextState, replace) => {
    let activeUser;
    if (store) {
      activeUser = store.getState().userAndAuth;
    }
    if (!activeUser) {
      replace({ pathname: "/" });
      if(!localStorage.profile) {
        toastr.info("Please login for access.");
      }
    }
  };


  return (
    <Route path="/" component={App}>
      <IndexRedirect to="/home"/>
      <Route path="/home" component={HomePage} />
    </Route>
  );

};

export default generateRoutes;
