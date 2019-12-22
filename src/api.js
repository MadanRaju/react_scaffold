import http from 'axios';
import qs from 'qs';
import config from '../framework/config';
import { store } from '../src/store';
import * as types from '../src/actions/authTypes';

// Add a request interceptor
http.interceptors.request.use((configuration) => {
  // Do something before request is sent
  store.dispatch({ type: types.INCREMENT_API_COUNT });
  return configuration;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
http.interceptors.response.use(
  (response) => {
    store.dispatch({ type: types.DECREMENT_API_COUNT });
    return response;
  },
  (error) => {
    store.dispatch({ type: types.DECREMENT_API_COUNT });
    if(error.response.status === 401) {
      store.dispatch({ type: 'LOGOUT' });
    }
    // 500 403
    if((error.response.status === 500) || (error.response.status === 403) || (error.response.status === 400)) {
      store.dispatch({ type: 'TOASTER', message: error.response.data.message, messageType: 'error' });
    }
    return Promise.reject(error);
  }
);

const stringifyQuery = (params) => {
  return qs.stringify(params, { encodeValuesOnly: true });
};

class AppWebAPI {
  static headers(accessToken) {
    return {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    };
  }

  static fileHeaders(accessToken) {
    return {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + accessToken
    };
  }

  static baseUrl() {
    return config[process.env.NODE_ENV];
  }

  static get(route, headers, queryParams, responseType) {
    return AppWebAPI.api('get', route + '?' + stringifyQuery(queryParams), headers, null, null, responseType);
  }

  static put(route, headers, params, data) {
    return AppWebAPI.api('put', route, headers, params, data);
  }

  static post(route, headers, params, data, responseType) {
    return AppWebAPI.api('post', route, headers, params, data, responseType);
  }

  static patch(route, headers, params, data) {
    return AppWebAPI.api('patch', route, headers, params, data);
  }

  static delete(route, headers, params) {
    return AppWebAPI.api('delete', route, headers, params, null);
  }

  static export(route, headers, params, data) {
    return AppWebAPI.api('export', route, headers, params, data);
  }

  static api(requestType, route, headers, params, data, responseType) {
    const host = AppWebAPI.baseUrl();
    const url = `${host}${route}`;
    const state = JSON.parse(localStorage.getItem('app-state'));
    const accessToken = state ? state.auth.accessToken : '';

    let baseHeaders;
    if(route === '/attachments') {
      baseHeaders = AppWebAPI.fileHeaders(accessToken);
    } else {
      baseHeaders = AppWebAPI.headers(accessToken);
    }

    if(requestType === 'export') {
      return http.post(url, data, requestConfig);
    }

    return http.request({
      url,
      data,
      params,
      method: requestType,
      responseType,
      headers: headers ? Object.assign({}, baseHeaders, headers) : baseHeaders,
    });
  }
}

export default AppWebAPI;
