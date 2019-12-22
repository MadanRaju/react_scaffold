import React from 'react';
import PropTypes from 'prop-types';
import ButtonComponent from '../../shared/button/ButtonComponent';
import './toasterModal.scss';

const ToasterModal = ({
  message,
  type,
  closePopup,
  confirmPopup
}) => {
  return (
    <div className='popup toasterModal' onClick={() => { closePopup(); }}>
      <div className={'inner  slide-in-Y ' + type} onClick={(e) => { e.stopPropagation(); }}>
        <div className="header">
          <span className="closeContainer" onClick={() => { closePopup(); }}>X</span>
        </div>
        <p className="body">{message}</p>
        <div className='button bottom-bar'>
          <ButtonComponent
            text='Confirm'
            height='36px'
            width='132px'
            className='activeButton'
            onClick={() => { confirmPopup(); }}
          />
        </div>
      </div>
    </div>);
};

ToasterModal.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  closePopup: PropTypes.func.isRequired,
  confirmPopup: PropTypes.func.isRequired,
};

export default ToasterModal;