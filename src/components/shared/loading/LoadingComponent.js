import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import './LoadingComponent.scss';

export default class LoadingComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      styles: {}
    };
  }

  render() {
    return (
      <div className="loading" style={this.state.styles}>
        <div className="loading-back" />
        <div className="loading-icon">
          {/*<i className="fa fa-circle-o-notch fa-spin" />*/}
          <FontAwesome name="circle-o-notch" size="5x" spin fixedWidth />
        </div>
      </div>
    );
  }
}

LoadingComponent.propTypes = {};


LoadingComponent.defaultProps = {};