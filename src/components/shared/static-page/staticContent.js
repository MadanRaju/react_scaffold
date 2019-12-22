import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';


const StaticContent = ({ imageSrc, staticContents }) => {
  return (
    <div className={styles.staticContentSection}>
      <div className={styles.staticContentImage}>
        <img src={imageSrc} alt='Static' />
      </div>
      <div className={styles.staticContentText}>
        {staticContents}
      </div>
    </div>
  );
};
StaticContent.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  staticContents: PropTypes.element.isRequired
};

export default StaticContent;