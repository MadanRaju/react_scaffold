import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppWebAPI from '../../../../../api';
import DropdownComponent from '../../../../shared/dropdown/DropdownComponent';
import { ActionCreators } from '../../../../../actions';
import './CreateUser.scss';
import getAbsoluteUrl from '../../../../../util/apiUrlHelper';

class CreateUser extends Component {
  constructor(props) {
    super(props);

    const { ...userProp } = props.user;
    this.state = {
      user: userProp,
      roles: [],
      errorMessage: ''
    };
    this.createUser = this.createUser.bind(this);
    this.closeCreatePopup = this.closeCreatePopup.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    AppWebAPI.get(getAbsoluteUrl('ROLES', 'GET'), null).then((response) => {
      this.setState({ roles: response.data });
    }).catch(() => {
      this.props.setToasterMessage({ message: 'Error Fetching Roles', messageType: 'error' });
      this.closeCreatePopup();
    });
  }


  handleFormChange(variable, data) {
    const { user } = this.state;
    user[variable] = data;
    this.setState({ user });
  }

  closeCreatePopup() {
    let { user } = this.state;
    user = {
      role: 'Member',
      username: '',
      name: '',
      emailId: '',
      mobileNumber: '',
    };
    this.setState({ user });
    this.props.closePopup('');
  }

  handleKeyPress(event) {
    if(event.nativeEvent.keyCode === 13) {
      this.createUser();
    }
  }

  createUser() {
    if(this.state.user.username === '' || this.state.user.emailId === '' || this.state.user.name === '' || this.state.user.mobileNumber === '') {
      this.setState({ errorMessage: 'Mandatory values missing' });
    } else if(this.props.edit) {
      this.props.editUser(this.state.user, true);
    } else {
      this.props.createUser(this.state.user, true);
    }
  }

  formValues(displayValue, variableName, isMandatory) {
    return (
      <div>
        <div className="display-inline">
          <div className="name">
            {displayValue}
          </div>
          {isMandatory && <div className="asterisk">*</div>}
        </div>
        <div>
          <input
            className="name-input"
            value={this.state.user[variableName]}
            onChange={(event) => { this.handleFormChange(variableName, event.target.value); }}
            onKeyPress={this.handleKeyPress}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="main-container">
        <div className="main-container-inner">
          <div className="top-bar">
            <div className="create-container">
              <div className="create-text">
                {!this.props.edit ? 'Add New User' : 'Edit'}
              </div>
            </div>
            <div className="close-container" onClick={this.closeCreatePopup}>
              X
            </div>
          </div>
          <div className="middle-bar">
            <div className="display-inline">
              <div className="select-role">
                Select Role
              </div>
              <div className="asterisk-select">*</div>
            </div>
            <div className="select-role-dropdown">
              <DropdownComponent
                options={this.state.roles}
                type='header'
                onChange={(value) => { this.handleFormChange('role', value); }}
                placeholder='Member'
                defaultValue={this.state.user.role}
                changeSelected
                background='white'
                styling={{
                  width: '370px',
                  height: '36px',
                  borderRadius: '4px',
                  border: 'solid 1px #ced0da',
                  backgroundImage: 'gray',
                  fontFamily: 'Nunito Sans',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              />
            </div>
            {this.formValues('Username', 'username', true)}
            {this.formValues('Name', 'name', true)}
            {this.formValues('Email ( verification email will be sent to this id )', 'emailId', true)}
            {this.formValues('Phone', 'mobileNumber', true)}
            <div id="error" className="incorrect-values">{this.state.errorMessage}</div>
          </div>
          <div className="bottom-bar">
            <div className="confirm-container" onClick={this.createUser}>
              <div className="confirm-text">
                {!this.props.edit ? 'Add User' : 'Edit'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateUser.propTypes = {
  user: PropTypes.shape({}),
  closePopup: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  setToasterMessage: PropTypes.func.isRequired,
  editUser: PropTypes.func,
  edit: PropTypes.bool,
};

CreateUser.defaultProps = {
  user: {
    role: 'Member',
    username: '',
    name: '',
    emailId: '',
    mobileNumber: '',
  },
  editUser: () => {},
  edit: false,
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
