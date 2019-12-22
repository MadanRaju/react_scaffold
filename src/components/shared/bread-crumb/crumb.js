import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import style from './crumb.scss';

const CrumbLink = ({ linkContent, linkUrl }) => {
  return <NavLink exact className={style.crumbStyle} activeClassName={style.active} to={{ pathname: linkUrl }}>{linkContent}</NavLink>;
};

CrumbLink.propTypes = {
  linkContent: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired
};

export default CrumbLink;