import React, { PureComponent } from 'react';
import RenderLink from './renderLink';
import CloseIcon from './assets/close.svg';
import hemMenuIcon from './assets/hamburger_icon.svg';
import './assets/navigation.scss';

const navLinksLogout = [
  {
    link: '/app',
    isAuthRequired: false,
    name: 'App',
    index: 'App',
    isExternalLink: false,
    hasChild: false
  },
  {
    link: '/privacy', isAuthRequired: false, name: 'Privacy Policies', index: 'OfferTerms', isExternalLink: false
  },
  {
    link: '/terms-of-use', isAuthRequired: false, name: 'Terms of Use', index: 'TermsofUse', isExternalLink: false
  }
];

class MobileNavLinks extends PureComponent {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      isMenuOpen: false,
      headerStyle: {
        position: 'fixed',
        top: '0',
        width: '100vw',
        left: '0px'
      },
    };
    this.hideMenu = this.hideMenu.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    window.removeEventListener('scroll', this.handleScroll);
  }
  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  handleClickOutside(event) {
    if(this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.hideMenu();
    }
  }

  handleScroll() {
    const bar = document.getElementById('navigation');
    if(screen.width < 768) {
      if(window.pageYOffset >= 85) {
        Object.assign(bar.style, this.state.headerStyle);
      } else {
        bar.style = {};
      }
    }
  }

  hideMenu() {
    this.setState({ isMenuOpen: false });
  }
  showMenu() {
    this.setState({ isMenuOpen: true });
  }
  render() {
    return (
      <div id='navigation' className='navigation' >
        <div className='navBar'>
          <div
            className='bars'
          >
            <div
              onClick={() => { this.showMenu(); }}
              onKeyPress={() => { this.showMenu(); }}
              role="button"
              tabIndex="0"
            >
              <img src={hemMenuIcon} alt="Menu" />
            </div>
          </div>
          <div className={'slideContainer ' + (this.state.isMenuOpen ? 'showMenu' : '')}>
            {this.state.isMenuOpen ? <div className='closeMenu' onClick={() => { this.hideMenu(); }}><img src={CloseIcon} alt="Close" /></div> : '' }
            <div ref={this.setWrapperRef} className='slideContent'>
              <div className='mobileListContainer'>
                <ul className={'mobileList' + ' '}>
                  {navLinksLogout.map((navLink) => {
                    return (<RenderLink
                      key={navLink.index}
                      navLink={navLink}
                      hideMenu={this.hideMenu}
                    />);
                  })
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MobileNavLinks.propTypes = {
};

MobileNavLinks.defaultProps = {

};
export default MobileNavLinks;