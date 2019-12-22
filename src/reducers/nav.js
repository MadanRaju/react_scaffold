import * as types from '../actions/navTypes';

const initialState = {
  selectedNavOption: 0
};

const nav = (state = initialState, action) => {
  switch(action.type) { //eslint-disable-line
    case types.UPDATE_NAV:
      return {
        ...state,
        selectedNavOption: action.navOption
      };
    default:
      return state;
  }
};

export default nav;