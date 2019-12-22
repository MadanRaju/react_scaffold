import AppWebAPI from '../../../api';
import getAbsoluteUrl from '../../../util/apiUrlHelper';

class Auth {
  static loginUser(userName, password, successCallback, failureCallback) {
    AppWebAPI.post(getAbsoluteUrl('AUTHENTICATION'), {}, {}, { username: userName, password }).then((response) => {
      if(response.status === 201) {
        successCallback({ accessToken: response.data.accessToken, userInfo: response.data.user });
      } else {
        failureCallback();
      }
    }).catch(() => {
      failureCallback();
    });
  }
}

export default Auth;