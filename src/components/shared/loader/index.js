import React from 'react';
import PropTypes from 'prop-types';
import style from './assets/ball-pulse.scss';

const BallPulse = () => {
  return (
    <div className={style.ballGridPulse}>
      <div />
      <div />
      <div />
    </div>
  );
};


const LoadingIcon = (isPage) => {
  return isPage ? (<div className={style.popup} ><BallPulse /></div>) : (<div><BallPulse /></div>);
};

const UnableToLoadPage = () => {
  return (
    <div>
      Sorry , there was a problem loading the page
    </div>
  );
};


const Loader = ({ isLoading, error, isPage }) => {
  if(isLoading) {
    return LoadingIcon(isPage);
  } else if(error) {
    return UnableToLoadPage();
  }
  return null;
};


Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  isPage: PropTypes.bool
};

Loader.defaultProps = {
  error: null,
  isPage: true
};

export default Loader;