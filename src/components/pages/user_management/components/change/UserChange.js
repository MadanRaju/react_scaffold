/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../../actions';
import './UserChange.scss';

class UserChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.editUser = this.editUser.bind(this);
  }

  deleteUser() {
    this.props.toggleDeletePopup(this.props.user);
  }

  editUser() {
    this.props.toggleEditPopup(this.props.user, this.props.type);
  }

  render() {
    return (
        <div className="mainContainer">
            <div className="editContainer" onClick={this.editUser} />
            <div className="deleteContainer" onClick={this.deleteUser} />
        </div>
    );
  }
}

UserChange.propTypes = {
  user: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired,
  toggleDeletePopup: PropTypes.func.isRequired,
  toggleEditPopup: PropTypes.func.isRequired
};
UserChange.defaultProps = {
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserChange);
