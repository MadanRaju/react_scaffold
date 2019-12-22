import React from 'react';
import PropTypes from 'prop-types';
import './BackgroundComponent.scss';

/* ***** USAGE *****
<BackgroundComponent
  dashboard={true}  // not required, indicates whether photo should be dashboard size
  backgroundImage='http://placehold.it/1327x600'   // REQUIRED, string. Link to an image to be used for the background
/>
  {children}        // not required, HTML elements to be included on top of the background
</BackgroundComponent>
***** USAGE ***** */

const BackgroundComponent = ({
  children,
  backgroundHeight
}) => {
  // const background = "url('" + backgroundImage + "')";
  // const styles = dashboard ? { height: '600px', backgroundImage: background } : { height: '279px', backgroundImage: background };

  return (
    <div style={{ height: backgroundHeight }} className='background'>
      <div className='background-image' />
      <div className='top-image' />
      <div className='background-container'>
        {children}
      </div>
    </div>
  );
};

BackgroundComponent.propTypes = {
  children: PropTypes.node,
  backgroundHeight: PropTypes.string,
};

BackgroundComponent.defaultProps = {
  children: [],
  backgroundHeight: '1500px',
};


export default BackgroundComponent;