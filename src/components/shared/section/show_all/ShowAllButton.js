import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RowComponent from '../../row/RowComponent';
import RowCellComponent from '../../row/RowCellComponent';

import './ShowAllButton.scss';

/*eslint-disable jsx-a11y/anchor-is-valid*/
const ShowAllButton = ({ styles, onClick, link }) => {
  const customStyles = Object.assign({ color: '#558ccc', cursor: 'pointer', fontWeight: '600' }, styles);

  const button = (
    <div className='show-all-button' onClick={() => { onClick(); }}>
      <RowComponent
        styles={customStyles}
        columnTemplate='100%'
      >
        <RowCellComponent styles={customStyles} >
          SHOW ALL
        </RowCellComponent>
      </RowComponent>
    </div>
  );

  if(link) {
    return (
      <Link to={link}>
        {button}
      </Link>
    );
  }

  return button;
};

ShowAllButton.propTypes = {
  styles: PropTypes.shape({}),
  onClick: PropTypes.func,
  link: PropTypes.string,
};

ShowAllButton.defaultProps = {
  styles: {},
  onClick: null, // eslint-disable-line
  link: '',
};

export default ShowAllButton;

