import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../actions';

import './navigationLogoHeader.scss';

/*
  EXAMPLE:

  const navLogoStyles = {};

  <NavigationLogoHeader
    navLogoStyles={navLogoStyles}
    updateAppContent={() => {}}
  />
*/

/*eslint-disable jsx-a11y/anchor-is-valid, react/no-array-index-key*/
class NavigationLogoHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navLogoStyles: Object.assign({}, NavigationLogoHeader.defaultProps.navLogoStyles, props.navLogoStyles),
    };

    this.selectNavOption = this.selectNavOption.bind(this);
    this.logout = this.logout.bind(this);
  }

  selectNavOption(selectedOption) {
    this.props.updateAppContent();
    this.props.updateNav(selectedOption);
  }

  logout() {
    this.props.logout({});
    this.props.updateNav(0);
    this.props.history.replace({ pathname: '/' });
  }

  render() {
    return (
      <div className="navigation-logo-header" style={this.state.navLogoStyles}>
        <div className="left-logo-container">
          <div className="left-logo" onClick={() => { this.selectNavOption(0); }}>
            Logo
          </div>
          <div className="left-logo-divider" />
          <div className="left-logo-title">App</div>
        </div>
      </div>
    );
  }
}

NavigationLogoHeader.propTypes = {
  navLogoStyles: PropTypes.shape({}),
  updateAppContent: PropTypes.func.isRequired,
  updateNav: PropTypes.func,
  history: PropTypes.shape({
    replace: PropTypes.func
  }),
  logout: PropTypes.func,
};

NavigationLogoHeader.defaultProps = {
  navLogoStyles: {},
  updateNav: () => {},
  history: {},
  logout: () => {},
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationLogoHeader));