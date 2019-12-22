import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './navigationheaderoption.scss';


/*
  EXAMPLE:

  const navStyles = {};

  <NavigationHeaderOption
    navStyles={navStyles}
  />
*/
/*eslint-disable jsx-a11y/anchor-is-valid*/

export default class NavigationHeaderOption extends Component {
  constructor(props) {
    super(props);

    this.state = {
      optionStyles: Object.assign({}, NavigationHeaderOption.defaultProps.styles, props.styles),
      isSelected: props.isSelected
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isSelected: nextProps.isSelected });
  }

  render() {
    let classes = 'navigation-header-option' + (this.state.isSelected ? ' selected' : '');
    if(typeof this.props.navOptionElement !== 'string') {
      classes = classes + ' drop';
    }

    return (
      <Link to={this.props.navRoute}>
        <div className={classes} style={this.state.optionStyles} onClick={this.props.onClick}>
          {this.props.icon &&
            <div className="option-icon-container">
              <img className="logo" src={this.props.icon} alt={this.props.iconAlt} />
            </div>
          }
          <div className="option-name-container">
            <div className="option-name">{this.props.navOptionElement}</div>
          </div>
        </div>
      </Link>
    );
  }
}

NavigationHeaderOption.propTypes = {
  isSelected: PropTypes.bool,
  icon: PropTypes.node,
  iconAlt: PropTypes.string,
  navOptionElement: PropTypes.node.isRequired,
  navRoute: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  styles: PropTypes.shape({})
};

NavigationHeaderOption.defaultProps = {
  isSelected: false,
  icon: null,
  iconAlt: '',
  navRoute: '/',
  styles: {}
};