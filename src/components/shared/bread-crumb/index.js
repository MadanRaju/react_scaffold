import React from 'react';
import PropTypes from 'prop-types';
import Crumb from './crumb';
import CapitalizeWord from '../../../util/word-formatter';

const getCrumbs = (urlPath) => {
  return urlPath.split('/').map((link, index) => {
    return (link === '') ?
      { link: 'Home', url: `/${link}` }
      : { link: CapitalizeWord(link), url: urlPath.split('/').slice(0, index + 1).join('/') };
  });
};

/*eslint-disable  react/no-array-index-key */
const BreadCrumb = ({ urlPath }) => {
  const crumbs = getCrumbs(urlPath);
  return crumbs.map((crumb, index) => { return <Crumb key={index} linkContent={crumb.link} linkUrl={crumb.url} />; });
};


BreadCrumb.propTypes = {
  urlPath: PropTypes.string.isRequired
};
export default BreadCrumb;