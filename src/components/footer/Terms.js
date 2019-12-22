import React, { Component } from 'react';

class Terms extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    window.scroll(0, 0);
  }

  render() {
    return (
      <div className="terms">
        <div className="terms-text">
          <h3>Terms and Conditions of Use</h3>
        </div>
      </div>
    );
  }
}

export default Terms;