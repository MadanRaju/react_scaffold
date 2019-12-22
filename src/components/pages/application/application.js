import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../actions';
// import { Redirect } from 'react-router';
// import PropTypes from 'prop-types';

import './application.scss';


class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    window.scroll(0, 0);
  }

  render() {
    return (
      <div className='container'>
        Yayyy!!
      </div>
    );
  }
}

Application.propTypes = {
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    accessToken: state.auth.accessToken,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);

