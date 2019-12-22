import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './pagingcomponent.scss';

/* ***** USAGE *****

<PagingComponent
  data={[]}>       // REQUIRED
  pagingIncrements // not required. defaults to 25.
  onPage           // REQUIRED
  resetPaging      // REQUIRED
  styles           // not required
/>
  {children}       // not required. Custom paging html
</PagingComponent>

***** USAGE ***** */

export default class PagingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      start: 0,
      next: props.pagingIncrements,
      previous: 0,
      total: props.data.length,
      styles: Object.assign({}, PagingComponent.defaultProps.styles, props.styles)
    };
  }

  componentWillReceiveProps(nextProps) {
    let newResults = {
      data: nextProps.data,
      styles: Object.assign({}, this.state.styles, nextProps.styles)
    };

    if(nextProps.resetPaging) {
      newResults = Object.assign({}, newResults, {
        start: 0,
        next: nextProps.pagingIncrements,
        previous: 0,
        total: nextProps.data.length
      });
    }

    this.setState(newResults);
  }

  pageResults(direction) {
    this.props.onLoading(true);

    const start = direction === 'previous' ? this.state.previous : this.state.next; //20 0
    const end = direction === 'previous' ? this.state.start : start + this.props.pagingIncrements; //40 20
    const previous = start - this.props.pagingIncrements; //0 -20
    const newResults = {
      start,
      next: end,
      previous: previous > 0 ? previous : 0
    };

    const pagedData = end >= this.state.data.length ? this.state.data.slice(start) : this.state.data.slice(start, end);

    this.setState(newResults);

    this.props.onPage(pagedData);
  }

  render() {
    if(this.props.children.length) {
      return (
        <div className="paging-container" style={this.state.styles}>
          {this.props.children}
        </div>
      );
    }

    const dataEnd = this.state.next > this.state.total ? this.state.total : this.state.next;

    return (
      <div className="paging-container" style={this.state.styles}>
        <div className="page-previous" onClick={() => { this.pageResults('previous'); }}>
          {this.state.start > 0 &&
            <div><FontAwesome name="chevron-left" /> Previous</div>
          }
        </div>
        <div className="page-location"> {this.state.start + 1} - {dataEnd} of {this.state.total}</div>
        <div className="page-next" onClick={() => { this.pageResults('next'); }}>
          {this.state.next < this.state.total &&
            <div>Next <FontAwesome name="chevron-right" /></div>
          }
        </div>
      </div>
    );
  }
}


PagingComponent.propTypes = {
  children: PropTypes.node,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  pagingIncrements: PropTypes.number,
  onPage: PropTypes.func.isRequired,
  styles: PropTypes.shape({}),
  resetPaging: PropTypes.bool.isRequired,
  onLoading: PropTypes.func.isRequired
};

PagingComponent.defaultProps = {
  children: [],
  pagingIncrements: 20,
  styles: {}
};

