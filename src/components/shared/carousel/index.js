import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import _ from 'lodash';
import SliderIndicator from './SliderIndicator';
import './carousel.scss';
import { getThumbnails } from '../../../util/utils';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      itemToDisplay: this.props.itemToDisplay,
      currentIdDisplayed: 0,
      carouselItems: this.props.carouselItems ?
        this.props.carouselItems.sort((a, b) => {
          return a.id - b.id;
        }) : [],
    };
    this.state.currentIdsDisplayed = this.state.carouselItems.slice(0, this.state.itemToDisplay).map((item) => { return item.id; });
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);
  }

  componentDidMount() {
    const { autoPlay } = this.props;
    if(autoPlay) {
      this.intervalId = setInterval(() => {
        const { currentIdDisplayed, carouselItems } = this.state;
        this.goToSlide(currentIdDisplayed + 1 > carouselItems[carouselItems.length - 1].id ?
          carouselItems[0].id :
          currentIdDisplayed + 1);
      }, 5000);
    }
  }

  componentWillReceiveProps({ carouselItems }) {
    carouselItems.forEach((item, index) => {
      if(isNaN(item.id)) {
        /* eslint-disable no-param-reassign */
        item.id = index;
      }
    });
    if(carouselItems && carouselItems.length > 0) {
      this.setState({
        carouselItems,
        currentIdsDisplayed: carouselItems.slice(0, this.props.itemToDisplay).map((item) => { return item.id; }),
      });
    }
  }

  componentWillUnmount() {
    const { autoPlay } = this.props;
    if(autoPlay) {
      clearInterval(this.intervalId);
    }
  }

  /**
   * Go to previous slide and toggles the animation
   */
  goToPrevSlide() {
    const newIds = this.state.currentIdsDisplayed.map((id) => {
      if(id - 1 < this.state.carouselItems[0].id) {
        return this.state.carouselItems[this.state.carouselItems.length - 1].id;
      }

      return id - 1;
    });

    this.setState({
      currentIdsDisplayed: newIds,
    });
  }

  /**
   * Go to the next slide
   */
  goToNextSlide() {
    const newIds = this.state.currentIdsDisplayed.map((id) => {
      if(id + 1 > this.state.carouselItems[this.state.carouselItems.length - 1].id) {
        return this.state.carouselItems[0].id;
      }

      return id + 1;
    });

    this.setState({
      currentIdsDisplayed: newIds,
    });
  }

  goToSlide(index) {
    if(this.state.currentIdDisplayed > index) {
      this.goToPrevSlide();
      this.setState({ currentIdDisplayed: index });
    } else if(this.state.currentIdDisplayed < index) {
      this.goToNextSlide();
      this.setState({ currentIdDisplayed: index });
    }
  }

  render() {
    const { autoPlay, onClick } = this.props;

    return (
      <div className='carousel'>

        {
          this.props.leftIndicator &&
          <SliderIndicator goTo={this.goToPrevSlide}>
            <span className="fa fa-4x fa-angle-left" />
          </SliderIndicator>
        }

        { autoPlay ? (
          <CSSTransitionGroup
            component='div'
            className='slides-container animated'
            transitionEnterTimeout={2500}
            transitionLeaveTimeout={2500}
            transitionName='fading'
          >
            { this.state.currentIdsDisplayed
                  .map((id) => { return this.state.carouselItems.find((item) => { return item.id === id; }); })
                  .map((item) => { return this.props.tileComponent(item.index, item, onClick); })
                }
          </CSSTransitionGroup>
        )
         : (
           <CSSTransitionGroup
             component='div'
             className='slides-container animated'
             transitionEnterTimeout={10}
             transitionLeaveTimeout={10}
             transitionName='fading'
           >
             {
             this.state.carouselItems.filter((item) => { return this.state.currentIdsDisplayed.includes(item.id); })
             .map((item) => {
              if(_.has(item, 'image.url')) {
               item.image.url = getThumbnails(item.image.url);
              }
              if(_.has(item, 'image.location')) {
               item.image.location = getThumbnails(item.image.location);
              }
                return this.props.tileComponent(item.index, item, onClick);
})
           }
           </CSSTransitionGroup>
         )}

        {
          this.props.showDots &&
          <div className='slider-dots'>
            <div className='dots-container'>
              {
               this.state.carouselItems.map((item) => {
                 return (
                   <div key={item.id}>
                     <button
                       className='action-button'
                       onClick={() => { this.goToSlide(item.id); }}
                     >
                       {
                         this.state.currentIdDisplayed === item.id ?
                           <span className='fa fa-circle' /> : <span className='fa fa-circle-o' />
                         }
                     </button>
                   </div>
                 );
               })
             }

            </div>

          </div>
        }

        {
          this.props.rightIndicator &&
          <SliderIndicator goTo={this.goToNextSlide}>
            <span className="fa fa-4x fa-angle-right" />
          </SliderIndicator>
        }

      </div>
    );
  }
}

/**
 * Disabling this since it can be an array of any type it depends
 * on how tileComponent can be selected
 */

/* eslint-disable react/forbid-prop-types */
Carousel.propTypes = {
  autoPlay: PropTypes.bool,
  leftIndicator: PropTypes.bool,
  rightIndicator: PropTypes.bool,
  itemToDisplay: PropTypes.number.isRequired,
  carouselItems: PropTypes.array.isRequired,
  tileComponent: PropTypes.func.isRequired,
  showDots: PropTypes.bool,
  onClick: PropTypes.func,
};

Carousel.defaultProps = {
  autoPlay: false,
  leftIndicator: true,
  rightIndicator: true,
  showDots: false,
  onClick: () => {},
};


export default Carousel;
