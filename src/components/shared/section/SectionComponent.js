import React from 'react';
import PropTypes from 'prop-types';
import './SectionComponent.scss';
import DropdownComponent from '../dropdown/DropdownComponent';
/* ***** USAGE *****
  <SectionComponent
    title='Delayed Orders'  // REQUIRED, string
    dropdown={<Dropdown />} // REQUIRED, JSX element
  >
    {children}              // not required, HTML to be rendered in section body
  </SectionComponent>

***** USAGE ***** */

const SectionComponent = ({
  children, customStyle, customBodyStyle, dropdown, title
}) => {
  return (
    <div style={customStyle} className='section'>
      <div className='section-header'>
        <div className='section-text'>{title.toUpperCase()}</div>
        <div className='section-dropdown'>{dropdown}</div>
      </div>
      <div style={customBodyStyle} className='section-body'>
        {children}
      </div>
    </div>
  );
};

SectionComponent.propTypes = {
  children: PropTypes.node,
  customStyle: PropTypes.shape({}),
  title: PropTypes.string,
  dropdown: PropTypes.node,
  customBodyStyle: PropTypes.shape({}),
};

SectionComponent.defaultProps = {
  children: [],
  customStyle: {},
  customBodyStyle: {},
  title: 'Title',
  dropdown: (<DropdownComponent
    options={['7 Days', '3 Months', '6 Months', '1 Year']}
    type="header"
    onChange={() => { console.log(true); }}
    placeholder='7 Days'
    defaultValue={null}
    changeSelected
    styling={{
      width: '106px',
      height: '35px',
      borderRadius: '2px',
      backgroundColor: '#406da1',
      border: 'solid 1px #2f5b8e',
      fontFamily: 'Helvetica',
      fontSize: '12px',
      fontWeight: 'bold',
      lineHeight: '1.5',
      textAlign: 'center',
      color: '#ffffff',
                }}
  />
  ),

};

export default SectionComponent;
