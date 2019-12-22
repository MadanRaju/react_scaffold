import React, { PureComponent } from 'react';
import { NavLink as Link } from 'react-router-dom';
// import Chevron from './assets/left_blue_chevron.svg';
import style from './assets/navigation.scss';

class ProfileLinks extends PureComponent {
  constructor() {
    super();
    this.state = {
    };
  }
  render() {
    const link = (
      <ul className={style.mobileList}>
        <li className={style.item}>
          <button className={style.dropDownListItem} onMouseDown={() => { window.location.replace(process.env.REDIRECT_PROFILE_ORDERS + '/profile'); }} >
            <Link to='/profile' activeClassName={style.active} onClick={this.props.showHideMenu}> <b> My Profile </b>
            </Link>
          </button>
        </li>
        <li>
          <button className={style.dropDownListItem} onMouseDown={() => { window.location.replace(process.env.REDIRECT_PROFILE_ORDERS + '/profile/orders'); }} >
            <Link to='/profile/orders' activeClassName={style.active} onClick={this.props.showHideMenu}> <b> My Orders </b>
            </Link>
          </button>
        </li>
        <li className={style.borderBottom}>
          <button className={style.dropDownListItem} onMouseDown={() => { window.location.replace(process.env.REDIRECT_PROFILE_ORDERS + '/profile/feedbacks'); }} >
            <Link to='/profile/feedbacks' activeClassName={style.active} onClick={this.props.showHideMenu}> <b> Feedback </b>
            </Link>
          </button>

        </li>
      </ul>
    );
    return link;
  }
}

export default ProfileLinks;