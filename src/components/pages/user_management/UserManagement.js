/* eslint-disable consistent-return*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import _ from 'lodash';
import { ActionCreators } from '../../../actions';
import BackgroundComponent from '../../shared/background/BackgroundComponent';
import LoadingComponent from '../../shared/loading/LoadingComponent';
import Filters from '../../shared/filter/filter';
import DeleteConfirmation from './components/delete/DeleteConfirmation';
import CreateUser from './components/create/CreateUser';
import NavigationHeader from '../../navigation_header/NavigationHeader';
import Footer from '../../footer/Footer';
import './UserManagement.scss';
import AppWebAPI from '../../../api';
import Constants from '../../../util/constants';
import TableComponent from '../../shared/table_component/TableComponent';
import Toaster from '../../shared/toaster/toaster';
import getAbsoluteUrl from '../../../util/apiUrlHelper';

class UserManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      changedUser: {
        role: 'Member',
        username: '',
        name: '',
        emailId: '',
        mobileNumber: '',
      },
      changedType: '',
      createPopup: false,
      confirmDeletePopup: false,
      active: false,
      rowHeaders: [
        {
          Header: 'Name',
          accessor: 'name'
        },
        {
          Header: 'Username',
          accessor: 'username'
        },
        {
          Header: 'Email ID',
          accessor: 'emailId'
        },
        {
          Header: 'Phone',
          accessor: 'mobileNumber'
        },
        {
          Header: 'Role',
          accessor: 'role'
        },
        {
          Header: 'Created On',
          accessor: 'createdAt'
        },
        {
          Header: 'Last Modified On',
          accessor: 'updatedAt'
        },
        {
          Header: 'Actions',
          accessor: 'actions'
        },
      ],
    };
    this.getTableContents = this.getTableContents.bind(this);
    this.activateOrDeactivateUser = this.activateOrDeactivateUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.editUser = this.editUser.bind(this);
    this.toggleCreatePopup = this.toggleCreatePopup.bind(this);
    this.createUser = this.createUser.bind(this);
    this.onActiveChange = this.onActiveChange.bind(this);
  }

  componentDidMount() {
    this.getTableContents();
  }

  onActiveChange() {
    this.setState({ active: !this.state.active });
  }

  getTableContents() {
    this.props.incrementAPICount();
    AppWebAPI.get(getAbsoluteUrl('USERS'), null).then((response) => {
      if(response.status === 200) {
        let tabData = response.data;
        tabData = _.map(tabData, (user) => {
          _.forEach(['createdAt', 'updatedAt'], (val) => {
            _.assign(user, { [val]: this.formatDate(user[val].split('T')[0]) });
          });
          _.assign(user, { isActive: user.deletedAt ? 'Inactive' : 'Active' });
          _.assign(user, { actions: this.getFilter(user) });
          return user;
        });
        this.props.decrementAPICount();
        this.setState({ tableData: tabData });
      } else {
        this.props.decrementAPICount();
        this.props.setToasterMessage({ message: 'Error fetching Users', messageType: 'error' });
      }
    }).catch(() => {
      this.props.decrementAPICount();
      this.props.setToasterMessage({ message: 'Error fetching Users', messageType: 'error' });
    });
  }

  getFilter(data) {
    return (
      <Filters
        filterOptions={[{ value: '1$$' + data.id, label: data.isActive === 'Active' ? 'Deactivate   ' : 'Activate    ' },
        { value: '2$$' + data.id, label: 'Edit   ' },
        ]}
        multi={false}
        isCustomSelect={false}
        onChange={(e) => { this.handleAction(e); }}
        placeholder="Action"
      />
    );
  }

  reArrange(data) {
    return _.sortBy(data, 'isActive').reverse();
  }

  formatDate(date) {
    const funDate = date.split('-');
    return funDate[1] + '/' + funDate[2] + '/' + funDate[0];
  }

  toggleCreatePopup(userDetail, type) {
    this.setState({
      createPopup: !this.state.createPopup, changedType: type, changedUser: userDetail
    });
  }

  handleAction(event) {
    const selectedEvent = event.split('$$');
    let userDetails = {};
    for (let i = 0; i < this.state.tableData.length; i = i + 1) {
      if(this.state.tableData[i].id === selectedEvent[1]) {
        userDetails = this.state.tableData[i];
        break;
      }
    }
    switch (Number(selectedEvent[0])) {
      case 1: this.togglePopup(userDetails);
        break;
      case 2: this.toggleCreatePopup(userDetails, 'edit');
        break;
      default: break;
    }
    return false;
  }

  createUser(userDetails, closePopup) {
    const details = userDetails;
    this.props.incrementAPICount();
    AppWebAPI.post(getAbsoluteUrl('USERS'), null, null, details).then((response) => {
      if(response.status === 201) {
        this.getTableContents();
        this.props.decrementAPICount();
        if(closePopup) {
          this.setState({ createPopup: !this.state.createPopup });
        }
      } else {
        this.props.decrementAPICount();
        this.props.setToasterMessage({ message: 'Error creating User', messageType: 'error' });
      }
    }).catch(() => {
      this.props.decrementAPICount();
      this.props.setToasterMessage({ message: 'Error creating User', messageType: 'error' });
    });
  }

  togglePopup(user) {
    this.setState({ confirmDeletePopup: !this.state.confirmDeletePopup, changedUser: user });
  }

  activateOrDeactivateUser(user) {
    if(user.isActive === 'Active') {
      this.props.incrementAPICount();
      AppWebAPI.delete(getAbsoluteUrl('USERS', user.id), null, null).then((response) => {
        if(response.status === 200) {
          this.getTableContents();
          const changedUser = {
            role: 'Member',
            username: '',
            name: '',
            emailId: '',
            mobileNumber: '',
          };
          this.props.decrementAPICount();
          this.setState({ confirmDeletePopup: !this.state.confirmDeletePopup, changedUser });
        } else {
          this.props.decrementAPICount();
          this.props.setToasterMessage({ message: 'Error deleting User', messageType: 'error' });
        }
      }).catch(() => {
        this.props.decrementAPICount();
        this.props.setToasterMessage({ message: 'Error deleting User', messageType: 'error' });
      });
    } else {
      this.editUser({
        id: user.id,
        deletedAt: null
      }, false, true);
    }
  }

  editUser(userDetails, closePopup, closeDeletePopup) {
    const user = _.omit(userDetails, 'id');
    this.props.incrementAPICount();
    AppWebAPI.put(getAbsoluteUrl('USERS', userDetails.id), null, null, user).then((response) => {
      if(response.status === 200) {
        this.getTableContents();
        if(closePopup) {
          const changedUser = {
            role: 'Member',
            username: '',
            name: '',
            emailId: '',
            mobileNumber: '',
          };
          this.props.decrementAPICount();
          this.setState({ changedUser, createPopup: !this.state.createPopup });
        }
        if(closeDeletePopup) {
          this.setState({ confirmDeletePopup: !this.state.confirmDeletePopup });
        }
      } else {
        this.props.decrementAPICount();
        this.props.setToasterMessage({ message: 'Error deleting User', messageType: 'error' });
      }
    }).catch(() => {
      this.props.decrementAPICount();
      this.props.setToasterMessage({ message: 'Error deleting User', messageType: 'error' });
    });
  }

  render() {
    if(this.props.auth.userInfo.role !== Constants.role[0].displayValue) {
      this.props.updateNav(0);
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div className='app-container'>
          {this.props.auth.responseMessage && this.props.auth.responseMessage.length > 0 && Toaster({
            message: this.props.auth && this.props.auth.responseMessage,
            type: this.props.auth && this.props.auth.responseMessageType
          })}
          <BackgroundComponent backgroundHeight='auto'>
            <NavigationHeader isAdmin updateAppContent={this.updateAppContent} />
            <div className="um-heading">
              <div className="heading">User Management</div>
              <div className="add-new-user">
                <div className="addNewUser-text" onClick={() => { this.toggleCreatePopup(this.state.changedUser, 'create'); }}>Add New User</div>
              </div>
            </div>
            <div className="table-container-user-management">
              <TableComponent
                data={this.state.tableData}
                columnHeaders={this.state.rowHeaders}
                type='default'

              />
              <div>
                {this.props.auth.apiCallCount > 0 && <LoadingComponent />}
              </div>
            </div>
          </BackgroundComponent>
          { this.state.createPopup &&
          <CreateUser
            closePopup={this.toggleCreatePopup}
            createUser={this.createUser}
            editUser={this.editUser}
            user={this.state.changedUser}
            edit={this.state.changedType === 'edit'}
          />
        }
          { this.state.confirmDeletePopup &&
          <DeleteConfirmation closePopup={this.togglePopup} deleteUser={this.activateOrDeactivateUser} user={this.state.changedUser} />
        }
          <Footer />
        </div>
        <div className='webOnly'>Open the page on a tab or browser for best experience</div>
      </div>
    );
  }
}

UserManagement.propTypes = {
  auth: PropTypes.shape({
    token: PropTypes.string,
    userInfo: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      role: PropTypes.string,
    }),
    responseMessage: PropTypes.string,
    responseMessageType: PropTypes.string,
    logout: PropTypes.func,
    apiCallCount: PropTypes.number,
  }),
  setToasterMessage: PropTypes.func.isRequired,
  updateNav: PropTypes.func,
  incrementAPICount: PropTypes.func,
  decrementAPICount: PropTypes.func,
};

UserManagement.defaultProps = {
  auth: {},
  updateNav: () => {},
  incrementAPICount: () => {},
  decrementAPICount: () => {},
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
