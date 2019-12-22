import * as types from './navTypes';

export function updateNav(navOption) { //eslint-disable-line import/prefer-default-export
  return {
    type: types.UPDATE_NAV,
    navOption
  };
}