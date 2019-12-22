import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputComponent from '../input/InputComponent';
import ButtonComponent from '../button/ButtonComponent';
import './LargeInputComponent.scss';

/* ***** USAGE *****
<LargeInputComponent
  buttonText='Track Order'  // REQUIRED, text to diplay on button
  buttonOnClick={() => this.handleClick()}   // REQUIRED, function. gets passed the user input as a parameter
  placeholderText='Please enter a SKU' // not required, string. placeholder text for input
  icon='http://placehold.it/16x18' // not required, string. Path to icon image
  iconStyle={{width: '20px'}}  //not required, object. styles for the icon
/>
***** USAGE ***** */

export default class LargeInputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInput: '',
    };
  }

  handleChange(e) {
    this.setState({
      currentInput: e.target.value,
    });
  }

  render() {
    return (
      <div className="input-wrapper">
        <InputComponent
          inputClassName='dashboard-input'
          type='text'
          placeholder={this.props.placeholderText}
          onChange={(e) => { this.handleChange(e); }}
          height={this.props.height}
          width={this.props.width}
        />
        <ButtonComponent
          text={this.props.buttonText.toUpperCase()}
          onClick={() => { this.props.buttonOnClick(this.state.currentInput); }}
          className='dashboard-button'
          width='158px'
          height='47px'
          display='flex'
          icon={this.props.icon}
          iconStyle={this.props.iconStyle}
        />
      </div>
    );
  }
}

LargeInputComponent.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  buttonText: PropTypes.string,
  buttonOnClick: PropTypes.func.isRequired,
  placeholderText: PropTypes.string,
  icon: PropTypes.string,
  iconStyle: PropTypes.shape({}),
};

LargeInputComponent.defaultProps = {
  height: '47px',
  width: '554px',
  buttonText: '',
  buttonOnClick: null, // eslint-disable-line
  placeholderText: '',
  icon: 'http://placehold.it/16x18',
  iconStyle: {},
};
