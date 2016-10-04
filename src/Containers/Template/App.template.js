/* Ignire Template
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import RootContainer from './RootContainer.template';
import createStore from '../../Redux/Template/index.template';
import applyConfigSettings from '../../Config/Template';

applyConfigSettings();
const store = createStore();

export default class App extends Component {
render() {
return (
<Provider store={store}>
<RootContainer />
</Provider>
);
}
}
*/
