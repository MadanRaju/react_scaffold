import React from 'react';
import PropTypes from 'prop-types';
import { store } from '../../../store';
// import ButtonComponent from '../../shared/button/ButtonComponent';
import './toaster.scss';
import check from '../../../assets/svg/check.svg';
import cross from '../../../assets/svg/notification_cross.svg';

const Toaster = ({ message, type }) => {
  return (
    <div className="popup toaster" onClick={() => { }}>
      <div className={'inner  slide-in-Y ' + type} onClick={(e) => { e.stopPropagation(); }}>
        <div className="header">
          <span> {message + (message.lastIndexOf('.') === message.length - 1 ? '' : '.') + ' Please contact helpdesk.'} </span>
          <div className="closeContainer" onClick={() => { store.dispatch({ type: 'TOASTER_CLOSE' }); }}>
            <img src={type === 'error' ? cross : check} alt={type} />
          </div>
        </div>
      </div>
    </div>);
};

Toaster.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Toaster;