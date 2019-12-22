import * as types from './authTypes';

export function setAuthenticatedUser(data) {
  return {
    type: types.AUTH_USER,
    data
  };
}

export function authError(errorData) {
  return {
    type: types.AUTH_ERROR,
    errorData
  };
}

export function authSuccess(successData) {
  return {
    type: types.AUTH_SUCCESS,
    successData
  };
}

export function logout() {
  return {
    type: types.LOGOUT
  };
}
export function incrementAPICount() {
  return {
    type: types.INCREMENT_API_COUNT
  };
}
export function decrementAPICount() {
  return {
    type: types.DECREMENT_API_COUNT
  };
}

export function resetAPICount() {
  return {
    type: types.RESET_API_COUNT
  };
}

export function setToasterMessage(data) { //{ message: m, messageType: t}
  return {
    type: types.TOASTER,
    data
  };
}

export function closeToaster() {
  return {
    type: types.TOASTER_CLOSE,
  };
}