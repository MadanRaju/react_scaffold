import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './toggle.scss';

/*eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

/*
  EXAMPLE:

  const toggleIcon; //File or link to file
  const toggleIconAlt = '';
  const toggleText = 'Toggle me'

  <Toggle
    isEnabled
    icon={toggleIcon}
    iconAlt={toggleIconAlt}
    toggleText={toggleText}
    onClick={() => { console.log('You have selected this toggle'); }}
  />
*/

export default class Toggle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      containerStyles: Object.assign({}, Toggle.defaultProps.styles, props.styles),
      isEnabled: props.isEnabled || Toggle.defaultProps.isEnabled
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isEnabled: nextProps.isEnabled });
  }

  render() {
    const classNames = 'toggle-container' + (this.state.isEnabled ? ' enabled' : '');

    return (
      <div className={classNames} style={this.state.containerStyles} onClick={this.props.onClick}>
        {this.props.icon &&
          <div className="toggle-icon">
            <img src={this.props.icon} alt={this.props.iconAlt} />
          </div>
        }
        <div className="toggle-text">{this.props.toggleText}</div>
      </div>
    );
  }
}

Toggle.propTypes = {
  isEnabled: PropTypes.bool,
  icon: PropTypes.node,
  iconAlt: PropTypes.string,
  toggleText: PropTypes.string,
  styles: PropTypes.shape({}),
  onClick: PropTypes.func.isRequired
};

Toggle.defaultProps = {
  isEnabled: false,
  icon: null,
  iconAlt: '',
  toggleText: '',
  styles: {}
};
