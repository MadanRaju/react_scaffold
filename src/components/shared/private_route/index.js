import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

function PrivateRouteHOC(Component) {
  const AuthenticatedRoute = ({ isAuthenticated, ...rest }) => {
    return (
      <Route
        {...rest}
        render={() => {
            return (
                isAuthenticated ? <Component {...rest} /> : <Redirect to='/login' />
          );
    }}
      />
    );
  };

  AuthenticatedRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  function mapStateToProps() {
    /**
     * login should ge here like if userInfo and token is missing then redirect to login screen
     */
    const userDetail = _.isEmpty(localStorage['app-state']) ? {} : JSON.parse(localStorage['ihb-state']);
    const user = _.isEmpty(userDetail) ? {} : userDetail.authentication.profile;

    return {
      isAuthenticated: !_.isEmpty(user)
      // isAuthenticated: true
    };
  }


  return connect(mapStateToProps, () => { return {}; })(AuthenticatedRoute);
}

export default PrivateRouteHOC;