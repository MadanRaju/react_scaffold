import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { ActionCreators } from '../../../actions';
//import Auth from './Auth';
import './RecoverPassword.scss';
import Toaster from '../../shared/toaster/toaster';
import AppWebAPI from '../../../api';

class RecoverPassword extends Component {
  constructor(props) {
    super(props);
    // const params = (new URL(document.location)).searchParams;
    // let token = params.get('q');
    this.state = {
      token: this.props.location.search.split('=')[1],
      confirmPassword: '',
      password: '',
      passwordUpdated: false,
      redirect: false,
      errorMessage: ''
    };
    this.updatePassword = this.updatePassword.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  updatePassword() {
    // const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    const passwordFormat = this.state.password;
    if(this.state.password !== this.state.confirmPassword) {
      this.setState({ errorMessage: 'Passwords don\'t match' });
    } else if(passwordFormat.trim().length < 5) {
      this.setState({ errorMessage: 'Invalid password!!! Atleast 5 characters required' });
    } else {
      AppWebAPI.patch(
        '/users',
        null,
        null,
        { password: this.state.password },
        this.state.token
      ).then((response) => {
        if(response.status === 200) {
          this.setState({ passwordUpdated: true });
          this.props.setToasterMessage({ message: 'Password update successful', messageType: 'info' });
        } else {
          this.props.setToasterMessage({ message: 'Password update error', messageType: 'error' });
        }
      }).catch(() => {
        this.props.setToasterMessage({ message: 'Password update error', messageType: 'error' });
      });
    }
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleChangeConfirmPassword(event) {
    this.setState({ confirmPassword: event.target.value });
  }

  handleKeyPress(event) {
    if(event.nativeEvent.keyCode === 13) {
      this.updatePassword();
    }
  }

  redirect() {
    this.setState({ passwordUpdated: false, redirect: true });
  }

  render() {
    if(this.state.passwordUpdated) {
      setTimeout(() => { this.redirect(); }, 3000);
      return (
        <div className="mainContainer-rp">
          <div id="dvConatiner" className="alignedContainer">
            <div className="login-form-rp">
              <div className="inner-heading-container-rp">Set New Password</div>
              <div className="username-container-rp">
                Password reset successful ! Please click here if you are not redirected within a few seconds
              </div>
              <div className="signin-rp" onClick={this.redirect}>
                <div className="signin-text-rp">Submit</div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if(this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="mainContainer-rp">
        {this.props.auth.responseMessage && this.props.auth.responseMessage.length > 0 && Toaster({
            message: this.props.auth && this.props.auth.responseMessage,
            type: this.props.auth && this.props.auth.responseMessageType
          })}
        <div id="dvConatiner" className="alignedContainer">
          <div className="login-form-rp">
            <div className="inner-heading-container-rp">Set New Password</div>
            <div id="error" className="incorrectLogin-rp">{this.state.errorMessage}</div>
            <div className="username-container-rp">
              <input
                id="password"
                type="password"
                className="username-box-rp"
                placeholder="New Password"
                onChange={this.handleChangePassword}
                onKeyPress={this.handleKeyPress}
              />
            </div>
            <div className="password-container">
              <input
                id="confirmPassword"
                className="password-box-rp"
                type="password"
                placeholder="Confirm New Password"
                onChange={this.handleChangeConfirmPassword}
                onKeyPress={this.handleKeyPress}
              />
            </div>
            <div className="signin-rp" onClick={this.updatePassword}>
              <div className="signin-text-rp">Submit</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RecoverPassword.propTypes = {
  location: PropTypes.string.isRequired,
  auth: PropTypes.shape({
    responseMessage: PropTypes.string,
    responseMessageType: PropTypes.string,
  }),
  setToasterMessage: PropTypes.func.isRequired,
};

RecoverPassword.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);
