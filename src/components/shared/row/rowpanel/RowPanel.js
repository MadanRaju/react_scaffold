import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../RowComponent.scss';

/* ***** USAGE *****

<RowPanel
  row={<RowComponent />}> // REQUIRED JSX element (RowComponent)
        {children}        // not required. HTML elements to be expanded on row click
</RowPanel>

***** USAGE ***** */

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
export default class RowPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentOpen: props.isOpen
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ contentOpen: nextProps.isOpen });
  }

  handleRowClick() {
    const isOpen = this.props.isOpen || !this.state.contentOpen;

    if(this.props.onClick) {
      this.props.onClick();
    }

    this.setState({
      contentOpen: isOpen,
    });
  }

  render() {
    const rowPanelClass = this.state.contentOpen ? 'row-panel-container active' : 'row-panel-container';
    return (
      <div className="row-panel">
        <div className={rowPanelClass}>
          <div className='row-panel-header' onClick={() => { this.handleRowClick(); }}>{this.props.row}</div>
        </div>
        {this.state.contentOpen &&
        <div style={this.props.customBodyStyle} className='row-panel-body'>
          {this.props.children}
        </div>
          }
      </div>
    );
  }
}


RowPanel.propTypes = {
  children: PropTypes.node,
  row: PropTypes.node,
  customBodyStyle: PropTypes.shape({}),
  onClick: PropTypes.func,
  isOpen: PropTypes.bool
};

RowPanel.defaultProps = {
  children: [],
  row: null,
  customBodyStyle: {},
  onClick: null,
  isOpen: null
};

