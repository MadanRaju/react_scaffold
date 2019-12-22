import React from 'react';
import PropTypes from 'prop-types';

const SliderIndicator = ({ goTo, children }) => {
  return (
    <div style={{ height: '70px' }}>
      <button
        className="action-button"
        onClick={goTo}
      >
        {children}
      </button>
    </div>
  );
};

SliderIndicator.propTypes = {
  goTo: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default SliderIndicator;