import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ButtonComponent.scss';

export default class ButtonComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        height: props.height,
        width: props.width,
        display: props.display,
        border: '0px',
        cursor: 'pointer'
      },
      className: props.className,
      text: props.text
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ text: nextProps.text, className: nextProps.className });
  }

  render() {
    return (
      <div className="buttonWrapper">
        <button
          style={this.state.style}
          className={this.state.className}
          onClick={this.props.onClick}
        >{this.props.icon && <img style={this.props.iconStyle} className='button-icon' src={this.props.icon} alt='magnifying glass' />}
          {this.state.text}
        </button>
      </div>
    );
  }
}

ButtonComponent.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  display: PropTypes.string,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  icon: PropTypes.string,
  iconStyle: PropTypes.shape({}),
};

ButtonComponent.defaultProps = {
  height: '40px',
  width: '400px',
  display: 'inline-block',
  className: 'buttonStyles',
  onClick: null, // eslint-disable-line
  icon: null,
  iconStyle: {},
};