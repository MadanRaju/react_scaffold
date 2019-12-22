import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../actions';

import NavigationHeaderOption from '../navigation_header_option/NavigationHeaderOption';
import MobileNavLinks from '../MobileNavLinks';

import './navigationLinksHeader.scss';

import headerData from '../../data/header_data';


/*
  EXAMPLE:

  const navLinksStyles = {};

  <NavigationHeader
    navLinksStyles={navLinksStyles}
    updateAppContent={() => {}}
  />
*/

/*eslint-disable jsx-a11y/anchor-is-valid, react/no-array-index-key*/
class NavigationLinksHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navLinksStyles: Object.assign({}, NavigationLinksHeader.defaultProps.navLinksStyles, props.navLinksStyles),
      navOptions: headerData.navOptions,
    };

    this.selectNavOption = this.selectNavOption.bind(this);
  }

  selectNavOption(selectedOption) {
    this.props.updateAppContent();
    this.props.updateNav(selectedOption);
  }

  render() {
    return (
      <div>
        <div className="navigation-links-header" style={this.state.navLinksStyles}>
          <div className="nav-options-container">
            {this.state.navOptions.map((navOption, idx) => {
              const isOptionSelected = this.props.location.pathname.toLowerCase().startsWith(navOption.route.toLowerCase());

              return (
                <NavigationHeaderOption
                  key={'navoption-' + navOption.optionText}
                  isSelected={isOptionSelected}
                  navOptionElement={navOption.optionText}
                  navRoute={navOption.route}
                  onClick={() => { this.selectNavOption(idx); }}
                />
              );
            })
          }
          </div>
        </div>
        <MobileNavLinks />
      </div>
    );
  }
}

NavigationLinksHeader.propTypes = {
  navLinksStyles: PropTypes.shape({}),
  updateAppContent: PropTypes.func.isRequired,
  updateNav: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

NavigationLinksHeader.defaultProps = {
  navLinksStyles: {},
  updateNav: () => {},
  location: {}
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    nav: state.nav
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationLinksHeader));