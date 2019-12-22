import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ToolTip.scss';

export default class ToolTip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoverVisable: false,
      hoverElement: props.hover,
      styles: Object.assign({}, ToolTip.defaultProps.styles, props.styles)
    };

    this.triggerDiv = null;

    this.hoverOnMouseEnter = this.hoverOnMouseEnter.bind(this);
    this.hoverOnMouseExit = this.hoverOnMouseExit.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const styles = Object.assign({}, this.state.styles, nextProps.styles);

    this.setState({ hoverElement: nextProps.hover, styles });
  }

  hoverOnMouseEnter() {
    if(this.props.useHover) {
      this.setState({
        hoverVisable: true,
      });
    }
  }

  hoverOnMouseExit() {
    if(this.props.useHover) {
      this.setState({
        hoverVisable: false,
      });
    }
  }

  toggleHover() {
    if(!this.props.useHover) {
      const isHoverVisible = !this.state.hoverVisable;

      this.setState({
        hoverVisable: isHoverVisible
      });
    }
  }

  render() {
    const containerClassName = 'tool-tip-container ' + (this.state.hoverVisable ? 'active' : '');
    const hoverContainerClassName = 'tool-tip-hover-container' + (this.state.hoverVisable ? ' active' : '');
    const hoverClassName = 'tool-tip-hover-' + this.props.direction + (this.state.hoverVisable ? ' active' : '') + ' ' + this.props.hoverClassName;
    const hoverStyles = this.state.styles.width ? { width: this.state.styles.width } : {};

    return (
      <div
        className={containerClassName}
        onMouseEnter={this.hoverOnMouseEnter}
        onMouseLeave={this.hoverOnMouseExit}
        onClick={this.toggleHover}
        ref={(div) => { this.triggerDiv = div; }}
      >
        {this.props.trigger}
        <div className={hoverContainerClassName} style={this.state.styles}>
          <div className="tip" />
          <div className={hoverClassName} style={hoverStyles}>
            {this.state.hoverElement}
          </div>
        </div>
      </div>
    );
  }
}

ToolTip.propTypes = {
  trigger: PropTypes.node.isRequired,
  hover: PropTypes.node.isRequired,
  hoverClassName: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(['top', 'bottom']),
  useHover: PropTypes.bool,
  styles: PropTypes.shape({})
};

ToolTip.defaultProps = {
  direction: 'top',
  useHover: true,
  styles: {}
};
