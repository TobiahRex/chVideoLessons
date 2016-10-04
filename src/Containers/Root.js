import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ScrollToTop from 'react-scroll-up';
import StartupActions from '../Redux/StartupRedux';
import ReduxPersist from '../Config/ReduxPersist';

class RootContainer extends Component {
  componentDidMount () {
    if (!ReduxPersist.active) {
      this.props.startup();
    }
  }

  render() {
    let loadingSpinner = <div className="loader" />;
    return (
      <div>
        <ScrollToTop showUnder={160}>
          <img src="/statics/scrollUp.png" />
        </ScrollToTop>
        { loadingSpinner }
        { this.props.children }
      </div>
    );
  }
}

RootContainer.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.number,
  startup: PropTypes.func
};
const mapStateToProps = (state, ownProps) => ({
  loading: state.requestsInProgress
});
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
});

export default connect (mapStateToProps, mapDispatchToProps)(RootContainer);
