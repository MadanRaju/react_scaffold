import React from 'react';
import PropTypes from 'prop-types';

import './pageStepComponent.scss';

// export default class PageStepComponent extends Component {

const PageStep = (props) => {
  let className = '';

  if(props.thisStep === props.activeStep) {
    className = 'active';
  } else if(props.thisStep > props.activeStep) {
    className = 'pending';
  } else {
    className = 'saved';
    if(props.activeStep !== 4) {
      className += ' in-progress';
    }
  }

  return (
    <div className={'pageStep-container ' + className} onClick={() => { props.setStep(props.thisStep); }}>
      <div>
        <p className='step'>Step {props.text}</p>
        <p className='desc'>{props.footerText}</p>
      </div>
      <img src={props.src} alt="step" />
    </div>
  );
};

PageStep.propTypes = {
  setStep: PropTypes.func,
  src: PropTypes.string,
  text: PropTypes.string,
  activeStep: PropTypes.number,
  thisStep: PropTypes.number,
  footerText: PropTypes.string,
};

PageStep.defaultProps = {
  setStep: () => {},
  src: null,
  text: null,
  footerText: null,
  activeStep: 1,
  thisStep: 1
};

export default PageStep;