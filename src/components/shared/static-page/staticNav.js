import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from '../../shared-components/TabLayout';
import StaticImage from './staticImage';
import StaticContent from './staticContent';
import styles from './style.scss';

const TabsData = (content) => {
  return content.map((con) => {
    return {
      label: con.label,
      header: <StaticImage headerText={con.headerText} headerImg={con.headerImage} headerImg2x={con.headerImage2x} />,
      component: <StaticContent imageSrc={con.contentImage} staticContents={con.contentElement} />
    };
  });
};
class StaticNav extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      staticContent: this.props.staticContent
    };
  }
  render() {
    return (
      <div className={styles.staticPage}>
        <Tabs
          tabs={TabsData(this.state.staticContent)}
          selectedTab={this.state.selectedTab}
        />
      </div>
    );
  }
}
StaticNav.propTypes = {
  staticContent: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default StaticNav;