import React from 'react';
import PropTypes from 'prop-types';
import './SmallLoadingComponent.scss';

const SmallLoadingComponent = ({ styles, thin }) => {
  const className = thin ? 'loader-thin' : 'loader';
  return (
    <div className={className} style={styles} />
  );
};

SmallLoadingComponent.propTypes = {
  styles: PropTypes.shape({}),
  thin: PropTypes.bool,
};

SmallLoadingComponent.defaultProps = {
  styles: {},
  thin: false,
};

export default SmallLoadingComponent;