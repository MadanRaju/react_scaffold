import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';
import Chevron from './assets/left_chevron.svg';
import './assets/navigation.scss';

class RenderLink extends PureComponent {
  constructor() {
    super();
    this.state = {
      showSubMenu: false
    };
  }
  toggleSubMenu() {
    this.setState({
      showSubMenu: !this.state.showSubMenu
    });
  }
  /*eslint-disable
jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions,
jsx-a11y/no-noninteractive-tabindex, jsx-a11y/anchor-is-valid, jsx-a11y/no-noninteractive-element-interactions */
  render() {
    const { navLink, isUserLoggedIn } = this.props;
    const showChildLink = (len) => {
      return {
        height: 40 * len,
        transition: 'height .25s'
      };
    };
    const hideChildLink = {
      overflow: 'hidden',
      height: 0,
      transition: 'height .25s'
    };
    let link = (
      <li className='item' key={navLink.index} onClick={() => { this.props.hideMenu(); }} >
        {navLink.hasChild ?
          <Fragment>
            <div onClick={() => { this.toggleSubMenu(); }}>
              <b>{navLink.name} <img src={Chevron} className={this.state.showSubMenu ? 'upArrow' : 'downArrow'} alt="" /></b>
            </div>
            <ul className='submenu' style={this.state.showSubMenu ? showChildLink(navLink.children.length) : hideChildLink}>
              {navLink.children.map((val) => {
              return (
                <li key={val.index} onClick={() => { this.toggleSubMenu(); }}>
                  <Link to={val.link} activeClassName='active' > {val.name}
                  </Link>
                </li>);
            })}
            </ul>
          </Fragment>
           :
          <Link to={navLink.link} activeClassName='active' > <b> {navLink.name}</b>
          </Link>
          }

      </li>
    );
    if(navLink.isAuthRequired && !isUserLoggedIn) {
      link = '';
    } else if(navLink.isExternalLink) {
      link = <a className={style.item} key={navLink.index} href={navLink.link}> <b> {navLink.name}</b> </a>;
    }
    return link;
  }
}
RenderLink.propTypes = {
  navLink: PropTypes.shape({}).isRequired,
  isUserLoggedIn: PropTypes.bool,
  hideMenu: PropTypes.func.isRequired,
};

RenderLink.defaultProps = {
  isUserLoggedIn: false
};

export default RenderLink;