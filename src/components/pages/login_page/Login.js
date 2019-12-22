import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import PropTypes from 'prop-types';
import { ActionCreators } from '../../../actions';
import Auth from './Auth';
import AppWebAPI from '../../../api';
import Constants from '../../../util/constants';

import NavigationLogoHeader from '../../navigation_header/components/navigation_logo_header/NavigationLogoHeader';
import Toaster from '../../shared/toaster/toaster';

import './Login.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      password: '',
      adminLoggedIn: false,
      loggedIn: false,
      forgotClicked: false,
      signInText: 'SIGN IN',
      auth: props.auth //eslint-disable-line
    };
    this.loginUser = this.loginUser.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  loginUser() {
    this.setState({ signInText: 'SIGNING IN' });
    Auth.loginUser(this.state.userName, this.state.password, (authenticationData) => {
      this.props.setAuthenticatedUser(authenticationData); // eslint-disable-line
      if(authenticationData.userInfo.role === Constants.role[0].displayValue) {
        this.setState({ adminLoggedIn: true });
      } else {
        this.setState({ signInText: 'SIGN IN', loggedIn: true });
      }
    }, () => {
      this.setState({ signInText: 'SIGN IN' });
      this.props.setToasterMessage({ message: 'Incorrect username/password', messageType: 'error' });
    });
  }

  forgotPassword() {
    const username = this.state.userName.trim();
    this.setState({ forgotClicked: true });
    if(username.length > 0) {
      AppWebAPI.post(`/users/${username}/resetPassword`, null, null, {}).then((response) => {
        if(response.data.status === 'DONE') {
          this.props.setToasterMessage({ message: 'An email containing password reset link has been sent to you.', messageType: 'info' });
        } else {
          this.props.setToasterMessage({ message: 'Username/Password does not exist', messageType: 'error' });
        }
      }).catch(() => {
        this.props.setToasterMessage({ message: 'Username/Password does not exist', messageType: 'error' });
      });
    } else {
      this.props.setToasterMessage({ message: 'Authentication Failed!!', messageType: 'error' });
    }
  }

  handleChangeUsername(event) {
    this.setState({ userName: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleKeyPress(event) {
    if(event.nativeEvent.keyCode === 13) {
      this.loginUser();
    }
  }

  render() {
    if(this.state.adminLoggedIn) {
      return <Redirect to="/user-management" />;
    }
    if(this.state.loggedIn) {
      return <Redirect to="/app" />;
    }


    return (
      <div className="mainContainer-login">
        {this.props.auth.responseMessage && this.props.auth.responseMessage.length > 0 && Toaster({
            message: this.props.auth && this.props.auth.responseMessage,
            type: this.props.auth && this.props.auth.responseMessageType
          })}
        <NavigationLogoHeader showUserOptions={false} updateAppContent={() => {}} />
        <div id="dvConatiner" className="alignedContainer">
          <div className="login-form-login">
            <div className="inner-heading-container-login">Login</div>
            <div className="username-container-login">
              <input
                id="username"
                className="username-box-login"
                placeholder="Username/Email"
                onChange={this.handleChangeUsername}
                onKeyPress={this.handleKeyPress}
              />
            </div>

            <div className="password-container">
              <input
                id="password"
                className="password-box-login"
                type="password"
                placeholder="Password"
                onChange={this.handleChangePassword}
                onKeyPress={this.handleKeyPress}
              />
            </div>
            <div className={this.state.forgotClicked ? 'forgot-password-login forgot-password-clicked' : 'forgot-password-login'} onClick={this.forgotPassword}>Forgot password?</div>
            <div className="signin-login" onClick={this.loginUser}>
              <div className="signin-text-login">{this.state.signInText}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.shape({
    responseMessage: PropTypes.string,
    responseMessageType: PropTypes.string,
  }),
  setAuthenticatedUser: PropTypes.func.isRequired,
  setToasterMessage: PropTypes.func.isRequired,
};

Login.defaultProps = {
  auth: {}
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
