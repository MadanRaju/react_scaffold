import React from 'react';
import PropTypes from 'prop-types';
import './RowComponent.scss';

/* ***** USAGE *****

<RowComponent
  columnTemplate={'1fr 1fr 3fr'}> // REQUIRED string for column template
        {children}                // not required, list. Should be equal to the specified amount of columns
</RowComponent>

***** USAGE ***** */

/* eslint-disable jsx-a11y/no-static-element-interactions */
const RowComponent = ({ children, styles, rowClassName, columnTemplate }) => { // eslint-disable-line object-curly-newline
  const styleConfig = Object.assign({}, RowComponent.defaultProps.styles, styles);
  styleConfig.gridTemplateColumns = columnTemplate;
  const rowClasses = 'tbl-body-row' + (rowClassName ? ' ' + rowClassName : '');

  return (
    <div style={styleConfig} className={rowClasses}>
      {children}
    </div>
  );
};

RowComponent.propTypes = {
  children: PropTypes.node,
  rowClassName: PropTypes.string,
  styles: PropTypes.shape({}),
  columnTemplate: PropTypes.string,
};

RowComponent.defaultProps = {
  children: [],
  rowClassName: '',
  styles: {},
  columnTemplate: '',
};

RowComponent.displayName = 'RowComponent';

export default RowComponent;