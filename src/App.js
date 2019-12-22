import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import Favicon from 'react-favicon';
import { ActionCreators } from './actions';

import NavigationHeader from './components/navigation_header/NavigationHeader';
import ContentRoutes from './components/ContentRoutes';
import Footer from './components/footer/Footer';
import LoadingComponent from './components/shared/loading/LoadingComponent';
import './assets/app.scss';
import Toaster from './components/shared/toaster/toaster';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="app-container">
        <Favicon url="favicon.ico?" />
        {this.props.auth.apiCallCount > 0 && <LoadingComponent />}
        {this.props.auth.accessToken === '' && <Redirect to="/" />}
        <NavigationHeader updateAppContent={this.updateAppContent} />
        {this.props.auth.responseMessage && this.props.auth.responseMessage.length > 0 && Toaster({
            message: this.props.auth.responseMessage,
            type: this.props.auth.responseMessageType
          })}
        <ContentRoutes />
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  auth: PropTypes.shape({
    apiCallCount: PropTypes.number,
    accessToken: PropTypes.string,
    responseMessage: PropTypes.string,
    responseMessageType: PropTypes.string,
  }),
};

App.defaultProps = {
  auth: {},
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    nav: state.nav
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
