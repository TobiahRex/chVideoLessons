import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import RootContainer from './RootContainer.template';
import createStore from '../../Redux/Templates/index.template';
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

/* OLD template
import React, { PropTypes } from "react";
import ScrollToTop from "react-scroll-up";
import { connect } from "react-redux";

class App extends React.Component {
constructor(props) {
super(props);
}

render() {
let loadingSpinner;
if (this.props.loading) {
loadingSpinner = <div className="loader" />;
} else {
null;
}
return (
<div>
<ScrollToTop showUnder={160} >
<img src="/statics/scrollUp.png"/>
</ScrollToTop>
{loadingSpinner}
{this.props.children}
</div>
);
}
}

App.propTypes = {
children: PropTypes.object.isRequired,
loading: PropTypes.number
};

const mapStateToProps = (state, ownProps) => ({
loading: state.requestsInProgress
});
export default connect(mapStateToProps)(App);
*/
