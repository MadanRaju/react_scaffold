import React, { Component } from 'react';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './filter.scss';

const selectedValue = CreateReactClass({
  propTypes: {
    children: PropTypes.node,
    value: PropTypes.shape({})
  },
  render() {
    let name = this.props.children[0];

    if(name.length > 12) {
      name = name.substring(0, 10) + '...';
    }
    return (
      <div className="Select-value" title={this.props.value.title} onClick={() => { return this.props.onRemove(this.props.value); }} >
        <span className="Select-value-label">
          {name}
        </span>
      </div>
    );
  }
});

export default class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removeSelected: true,
      disabled: false,
      filterOptions: this.props.filterOptions,
      stayOpen: true,
      value: this.props.value,
    };
  }


  componentWillReceiveProps(props) {
    this.setState({ filterOptions: props.filterOptions });
  }

  handleSelectChange(value) {
    this.setState({ value });
    this.props.onChange(value);
  }

  render() {
    return (
      <div className="filter-container">
        <p className='label'>{this.props.label}</p>
        <Select
          closeOnSelect={!this.state.stayOpen}
          disabled={this.state.disabled}
          className={this.props.className}
          placeholder={this.props.placeholder}
          multi={this.props.multi}
          onChange={(e) => { this.handleSelectChange(e); }}
          options={this.state.filterOptions}
          removeSelected={this.state.removeSelected}
          simpleValue
          value={this.state.value}
          valueComponent={this.props.isCustomSelect ? selectedValue : undefined}

        />
      </div>
    );
  }
}


Filters.propTypes = {
  filterOptions: PropTypes.arrayOf(PropTypes.shape([])).isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  isCustomSelect: PropTypes.bool,
  multi: PropTypes.bool,
  value: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string
};

Filters.defaultProps = {
  label: '',
  isCustomSelect: true,
  multi: true,
  value: '',
  className: '',
  placeholder: 'Select...'
};
