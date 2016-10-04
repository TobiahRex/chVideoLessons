import 'babel-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import useScroll from 'react-router-scroll';
import { Router, applyRouterMiddleware, browserHistory } from 'react-router';
import generateRoutes from '../Navigation/routes';
import RootContainer from './Root';
import createStore from '../Redux/CreateStore';
import './Styles/styles.css';
import '../../node_modules/react-bootstrap/dist/react-bootstrap.min';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/toastr/build/toastr.min.css';

const store = createStore();

render(
  <Provider store={store}>
    <Router
      history={browserHistory}
      routes={generateRoutes(store)}
      render={applyRouterMiddleware(useScroll())} />
    <RootContainer />
  </Provider>,
  document.getElementById('app')
);

export default store;
