import React, { Component } from 'react';

class Privacy extends Component {
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
      <div className="privacy">
        <div className="privacy-text">
          <h3>Privacy</h3>
        </div>
      </div>
    );
  }
}

export default Privacy;