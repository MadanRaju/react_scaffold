import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import 'react-select/dist/react-select.css';
import './FilterInputComponent.scss';


/*
  EXAMPLE

  <FilterInputComponent
    data={this.state.data}
    placeholder="Search for some data"
    onChange={(event) => { console.log('The filter changed: ', event.target.value); }}
    value={this.state.defaultFilterValue}
  />

*/

export default class FilterInputComponent extends Component {
  constructor(props) {
    super(props);
    const data = [{ value: '', label: props.placeholder }]
      .concat(props.data.map((option) => {
        return { value: option, label: option };
      }));
    this.state = {
      inputClassName: props.inputClassName,
      placeholder: props.placeholder,
      data,
      onChange: props.onChange,
      value: props.value === '' ? null : props.value,
    };
  }

  componentWillReceiveProps(props) {
    const data = [{ value: '', label: this.state.placeholder }]
      .concat(props.data.map((option) => {
        return { value: option, label: option };
      }));
    this.setState({
      placeholder: props.placeholder,
      data,
      onChange: props.onChange,
      value: props.value === '' ? null : props.value,
    });
  }

  render() {
    return (
      <div className="filter-input">
        <Select
          className={this.state.inputClassName}
          options={this.state.data}
          placeholder={this.state.placeholder}
          onChange={this.state.onChange}
          value={this.state.value}
          resetValue=""
          arrowRenderer={() => { return null; }}
        />
      </div>
    );
  }
}

FilterInputComponent.propTypes = {
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};


FilterInputComponent.defaultProps = {
  inputClassName: '',
  placeholder: '',
};