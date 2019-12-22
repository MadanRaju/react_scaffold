import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import dropdownHelpers from './dropdownHelpers';
import './DropdownComponent.scss';

/* ***** USAGE *****
<DropdownComponent
  options={['1', '2', '3']}   // not required, needs array of strings or numbers
  type="product-details"      // REQUIRED one of : ['header', 'dashboard', 'product-details']
  onChange={myFunction}       // REQUIRED
  placeholder="select"        // not required, defaults to "Please select an option".

  placeholder={               // (Can also use an element to enable dropdown.)
    <div className="name-container">
      <div className="user-name">Hello, {this.state.user.name}!</div>
      <img className="user-image" src={this.state.user.image} alt="" />
    </div>
  }

  defaultValue={null}         // not required, but will override placeholder if provided
  arrow={false}               // not required, will turn off arrow if provided
  changeSelected={true}       // not required, will prevent text from changing on option select
  styling={{                  // not required, will override default styles
    'height':'40px',           // not required, will default to 40px if invalid
    'width':'200px',           // not required, will default if 200px if invalid
    'border': '6px dashed',
    'border-color': 'red',
    'margin-left': '200px',
  }}
/>
***** USAGE ***** */


export default class DropdownComponent extends Component {
  constructor(props) {
    super(props);
    const defaultValue = props.defaultValue ? props.defaultValue : null;
    const checkedSize = dropdownHelpers.checkSize(props.styling.height, props.styling.width);
    const compliedStyles = {
      ...props.styling,
      height: checkedSize.height,
      width: checkedSize.width,
    };
    this.state = {
      options: props.options,
      type: props.type,
      placeholder: props.placeholder,
      selectedValue: defaultValue,
      styling: compliedStyles,
      dropdownOpen: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.changeSelectedOption = this.changeSelectedOption.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectedValue: nextProps.defaultValue, options: nextProps.options });
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  setWrapperRef(dropdownNode) {
    this.wrapperRef = dropdownNode;
  }

  handleOutsideClick(event) {
    if(this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        dropdownOpen: false,
      });
    }
  }

  changeSelectedOption(option) {
    if(option !== this.state.selectedValue && this.props.onChange && this.props.changeSelected) {
      this.setState({
        selectedValue: option,
        dropdownOpen: false,
      });
    }
    this.props.onChange(option);
  }

  toggleMenu() {
    const nextDropdownState = !this.state.dropdownOpen;
    this.setState({
      dropdownOpen: nextDropdownState,
    });
  }

  /*eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events*/
  render() {
    const list = dropdownHelpers.populateList(this.state.options, this.changeSelectedOption);
    const offset = dropdownHelpers.setOffset(this.state.styling.height, this.state.type);
    const selectorClass = `dropdown dropdown-container ${this.state.type}-dropdown ${this.props.addedClasses}`;
    const optionListClass = `dropdown list-container ${this.state.type}-list ${this.props.addedClasses}-list`;
    const selectorLabel =
      this.state.selectedValue ? this.state.selectedValue : this.state.placeholder;

    return (
      <div
        className={selectorClass}
        ref={this.setWrapperRef}
        style={this.state.styling}
        onClick={this.toggleMenu}
        onKeyPress={this.toggleMenu}
      >
        <div
          className="selector-label"
        >
          {selectorLabel}
        </div>
        {
          this.props.arrow && this.props.arrow !== '' ?
            <FontAwesome
              className="dropdown-arrow"
              name={this.props.arrow}
            />
          :
            <div />
        }
        {this.state.dropdownOpen &&
          <div className={optionListClass} style={offset}>
            {list}
          </div>
        }
      </div>
    );
  }
}

DropdownComponent.propTypes = {
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape({})])),
  type: PropTypes.oneOf(['default', 'header', 'dashboard', 'product-details']).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  defaultValue: PropTypes.string,
  arrow: PropTypes.string,
  changeSelected: PropTypes.bool,
  styling: PropTypes.objectOf(PropTypes.string),
  addedClasses: PropTypes.string
};

DropdownComponent.defaultProps = {
  options: [],
  placeholder: 'Please select an option',
  defaultValue: null,
  arrow: 'chevron-down',
  changeSelected: true,
  styling: {
    height: '40px',
    width: '100%'
  },
  addedClasses: ''
};
