/*eslint-disable*/
import React ,{Component} from 'react';
import GoogleAnalytics from 'react-ga';

import PropTypes from 'prop-types';

GoogleAnalytics.initialize('id'); //Google Analytics ID, to be filled

const withTracker = (WrappedComponent, options = {}) => {
    const trackPage = (page) => {
        GoogleAnalytics.set({
            page,
            ...options,
        });
        GoogleAnalytics.pageview(page);
    };
    
  const HOC = class extends Component {
      componentDidMount() {
          const page = this.props.location.pathname;
          trackPage(page);
        }
        
        componentWillReceiveProps(nextProps) {
            const currentPage = this.props.location.pathname;
            const nextPage = nextProps.location.pathname;

            if(currentPage !== nextPage) {
                trackPage(nextPage);
            }
    }
    
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
  HOC.propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string
    }).isRequired
  };
  return HOC;
};


export default withTracker;