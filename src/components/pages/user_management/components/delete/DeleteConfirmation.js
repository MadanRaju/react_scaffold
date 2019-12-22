import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ActionCreators } from '../../../../../actions';
import './DeleteConfirmation.scss';

class DeleteConfirmation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user
    };
    this.deleteSelectedUser = this.deleteSelectedUser.bind(this);
    this.closeDeletePopup = this.closeDeletePopup.bind(this);
  }

  closeDeletePopup() {
    this.props.closePopup('');
  }

  deleteSelectedUser() {
    this.props.deleteUser(this.props.user);
  }

  render() {
    const displayText1 = this.state.user.isActive === 'Active' ? 'deactivate' : 'activate';
    const displayText2 = this.state.user.isActive === 'Active' ? 'Deactivate' : 'Activate';
    return (
      <div className="main-container-delete">
        <div className="main-container-inner-delete">
          <div className="top-bar-delete">
            <div className="delete-container">
              <div className="delete-text">
                {displayText2}
              </div>
            </div>
            <div className="close-container-delete" onClick={this.closeDeletePopup}>
              X
            </div>
          </div>
          <div className="middle-bar-delete">
            <div className="delete-message">
              Are you sure you wish to {displayText1} the user ?
            </div>
          </div>
          <div className="bottom-bar-delete">
            <div className="confirm-container-delete" onClick={this.deleteSelectedUser}>
              <div className="confirm-text-delete">
              Confirm
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DeleteConfirmation.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  closePopup: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteConfirmation);
