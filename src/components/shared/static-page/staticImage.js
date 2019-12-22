import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

const StaticImage = ({ headerText, headerImg, headerImg2x }) => {
  return (
    <div className={styles.staticHeaderSection}>
      <div className={styles.staticHeaderImage}>
        <picture>
          <source media="(min-width: 1160px)" srcSet={headerImg2x} />
          <img src={headerImg} alt='Static' />
        </picture>
      </div>
      <div className={styles.staticHeaderText}>
        {headerText}
      </div>
    </div>
  );
};
StaticImage.propTypes = {
  headerText: PropTypes.string.isRequired,
  headerImg: PropTypes.string.isRequired,
  headerImg2x: PropTypes.string.isRequired
};

export default StaticImage;