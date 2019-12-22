import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';

import NavigationLogoHeader from './components/navigation_logo_header/NavigationLogoHeader';
import NavigationLinksHeader from './components/navigation_links_header/NavigationLinksHeader';

import './navigationheader.scss';

/*
  EXAMPLE:

  const navStyles = {};

  <NavigationHeader
    navStyles={navStyles}
    updateAppContent={() => {}}
  />
*/

/*eslint-disable jsx-a11y/anchor-is-valid, react/no-array-index-key*/
class NavigationHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navStyles: Object.assign({}, NavigationHeader.defaultProps.navStyles, props.navStyles),
      isAdmin: props.isAdmin
    };

    this.selectNavOption = this.selectNavOption.bind(this);
    this.updateNavOption = this.updateNavOption.bind(this);
    this.logout = this.logout.bind(this);
  }

  selectNavOption(selectedOption) {
    this.props.updateAppContent();
    this.props.updateNav(selectedOption);
  }

  updateNavOption() {
    this.props.updateAppContent();
    this.props.updateNav(4);
  }

  logout() {
    this.props.auth.logout();
    this.props.updateNav(0);
    this.props.history.replace({ pathname: '/' });
  }

  render() {
    const isUserOptionsVisible = !!this.props.auth.userInfo.name;

    return (
      <div className="navigation-header">
        <div className='navigation-header-content-container' style={this.state.navStyles}>
          <NavigationLogoHeader showUserOptions={isUserOptionsVisible} updateAppContent={this.props.updateAppContent} />
          {!this.state.isAdmin &&
            <NavigationLinksHeader updateAppContent={this.props.updateAppContent} />
          }
        </div>
      </div>
    );
  }
}

NavigationHeader.propTypes = {
  auth: PropTypes.shape({
    userInfo: PropTypes.shape({
      name: PropTypes.string,
    }),
    logout: PropTypes.func,
  }),
  updateNav: PropTypes.func,
  history: PropTypes.shape({
    replace: PropTypes.func
  }),
};

NavigationHeader.defaultProps = {
  auth: {},
  updateNav: () => {},
  history: {},
};

NavigationHeader.propTypes = {
  navStyles: PropTypes.shape({}),
  updateAppContent: PropTypes.func,
  isAdmin: PropTypes.bool
};

NavigationHeader.defaultProps = {
  navStyles: {},
  isAdmin: false,
  updateAppContent: () => {},
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationHeader));