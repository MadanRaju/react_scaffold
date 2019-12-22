import React from 'react';
import { Link } from 'react-router-dom';

import './footer.scss';

/*eslint-disable jsx-a11y/anchor-is-valid*/
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-links-container">
        <div className="link">
          <Link to='/privacy'>Privacy Policy</Link>
        </div>
        <div className="link-separator" />
        <div className="link">
          <Link to='/terms-of-use'>Terms of Use</Link>
        </div>
      </div>
      <div className="footer-logo-text-container">
        <div className="footer-logo-container">
          {/* <img className="footer-logo" src={logo} alt="" /> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;