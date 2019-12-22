import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './InputComponent.scss';
import buildIconAndClassName from './helpers';

export default class InputComponent extends Component {
  constructor(props) {
    super(props);

    // const { className, icon } = buildIconAndClassName(this.props.inputClassName, props.icon);
    this.state = {
      style: {
        height: this.props.height,
        width: this.props.width,
      },
      // className,
      // icon,
    };
  }

  clearField() {
    this.input.value = '';
  }

  render() {
    const { className, icon } = buildIconAndClassName(this.props.inputClassName, this.props.icon);
    return (
      <div
        style={this.state.style}
        className={className}
      >
        { icon &&
          <div className="input-icon">
            {icon}
          </div>
        }
        <input
          disabled={this.props.isDisabled ? 'disabled' : ''}
          className="input-field"
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
          onKeyPress={this.props.onKeyPress}
          type={this.props.type}
          min={this.props.min}
          ref={(input) => { this.props.sendInput(input); }}
          value={this.props.value}
        />
      </div>
    );
  }
}


InputComponent.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  inputClassName: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password', 'number', 'file', 'date']).isRequired,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  placeholder: PropTypes.string,
  min: PropTypes.string,
  sendInput: PropTypes.func,
  isDisabled: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])
};

InputComponent.defaultProps = {
  height: '40px',
  width: '100%',
  icon: null,
  placeholder: null,
  inputClassName: '',
  min: null,
  onKeyPress: () => {},
  sendInput: () => {},
  onChange: () => {},
  isDisabled: false,
  value: ''
};
