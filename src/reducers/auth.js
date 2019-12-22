import * as types from '../actions/authTypes';

const initialState = {
  userInfo: {},
  accessToken: '',
  isAuthing: false,
  isError: false,
  isNPSVisible: false,
  apiCallCount: 0,
};

const auth = (state = initialState, action) => {
  switch(action.type) { //eslint-disable-line
    case types.AUTH_USER:
      return {
        ...initialState,
        userInfo: action.data.userInfo,
        accessToken: action.data.accessToken
      };
    case types.AUTH_ERROR:
      return {
        ...state,
        isAuthing: false,
        isError: true
      };
    case types.AUTH_SUCCESS:
      return {
        ...state,
        isAuthing: false,
        isError: false
      };
    case types.LOGOUT:
      return initialState;
    case types.TOASTER:
      return {
        ...state,
        responseMessage: action.data.message,
        responseMessageType: action.data.messageType,
      };
    case types.TOASTER_CLOSE:
      return {
        ...state,
        responseMessage: '',
        responseMessageType: '',
      };
    case types.NPS:
      return {
        ...state,
        isNPSVisible: action.isNPSVisible,
      };
    case types.INCREMENT_API_COUNT:
      return {
        ...state,
        apiCallCount: state.apiCallCount + 1
      };
    case types.DECREMENT_API_COUNT:
      return {
        ...state,
        apiCallCount: state.apiCallCount - 1
      };
    case types.RESET_API_COUNT:
      return {
        ...state,
        apiCallCount: 0
      };
    default:
      return state;
  }
};

export default auth;