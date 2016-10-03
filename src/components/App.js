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
