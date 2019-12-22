/*eslint-disable no-param-reassign*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: props.columnHeaders
    };
    this.getColumnHeaders = this.getColumnHeaders.bind(this);
  }

  getDerivedStateFromProps(nextProps) {
    this.state({ headers: nextProps.columnHeaders });
  }

  getColumnHeaders() {
    const header = this.state.headers;
    header.forEach((element) => {
      element.id = element.id ? element.id : element.Header;
      element.accessor = element.accessor ? element.accessor : element.Header;
    });
    return header;
  }

  render() {
    return (
      <div>
        <ReactTable
          data={this.props.data}
          columns={this.getColumnHeaders()}
          getTheadTrProps={() => {
            return {
              style: {
                fontSize: '12px',
                fontWeight: 600,
                fontFamily: 'Nunito Sans',
                color: '#ffffff',
                height: '36px',
                backgroundColor: 'gray',
                textAlign: 'center'
              }
            };
          }}
          getTheadThProps={() => {
            return {
              style: {
                border: 'none',
                margin: 'auto'
              }
            };
          }}
          getTrProps={() => {
            return {
              style: {
                fontSize: '14px',
                fontFamily: 'Nunito Sans',
                fontWeight: '600',
                textAlign: 'center',
                display: 'flex',
                alignContent: 'center',
                justifycontent: 'center',
                color: '#000000',
                height: '72px',
                backgroundColor: '#f8f9fa',
                borderBottom: '2px solid rgba(0, 0, 0, 0.03)'
              }
            };
          }}
          showPagination={false}
          minRows={0}
          defaultPageSize={100}
        />
      </div>
    );
  }
}


TableComponent.propTypes = {
  data: PropTypes.shape({}).isRequired,
  columnHeaders: PropTypes.arrayOf(PropTypes.shape({})), //eslint-disable-line
};

TableComponent.defaultProps = {
  columnHeaders: [],
};