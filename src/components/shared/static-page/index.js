import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import StaticImage from './staticImage';
import StaticNav from './staticNav';
import styles from './style.scss';

class StaticPage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      navData: this.props.pageData,
    };
  }
  render() {
    const {
      navData
    } = this.state;
    return (
      <div className={styles.staticPage}>

        <StaticNav
          staticContent={navData}
        />
      </div>
    );
  }
}
StaticPage.propTypes = {
  pageData: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default StaticPage;