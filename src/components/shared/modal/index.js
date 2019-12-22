import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal.scss';


const Modal = ({ isOpen, ModalContent }) => {
  return (
    <div style={{ display: `${isOpen ? 'block' : 'none'}` }} className={styles.backdrop}>
      <div className={styles.box}>
        {ModalContent}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  ModalContent: PropTypes.element.isRequired
};

export default Modal;
