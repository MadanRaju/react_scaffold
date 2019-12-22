import React from 'react';
import PropTypes from 'prop-types';
import './RowComponent.scss';

const RowCellComponent = ({ children, styles }) => {
  const styleConfig = Object.assign({}, RowCellComponent.defaultProps.styles, styles);
  return (
    <div style={styleConfig} className="tbl-body-row-cell">
      {children}
    </div>
  );
};

RowCellComponent.propTypes = {
  children: PropTypes.node,
  styles: PropTypes.shape({})
};

RowCellComponent.defaultProps = {
  children: [],
  styles: {}
};

RowCellComponent.displayName = 'RowCellComponent';

export default RowCellComponent;