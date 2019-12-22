import moxios from 'moxios';
import Sinon from 'sinon';
import Auth from '../src/components/pages/login_page/Auth';

describe('Auth', () => {
  const userName = 'testUserName';
  const password = 'testPassword';
  const sandbox = Sinon.sandbox.create();
  const successCallback = sandbox.spy();
  const failureCallback = sandbox.spy();

  beforeEach(() => {
    moxios.install();
    sandbox.resetHistory();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('should call /authenticate endpoint with username and password', () => {
    moxios.wait(() => {
      Auth.loginUser(userName, password, successCallback, failureCallback);
      const request = moxios.requests.mostRecent();

      expect(request.config.method).toBe('post');
      expect(request.config.path).toBe('/authenticate');
      expect(request.config.data).toBe({username: userName, password: password}); //eslint-disable-line
      done();
    });
  });

  test('should call success callback with authentication data when status is 201', () => {
    const authData = {
      accessToken: 'randomAccessToken',
      userInfo: {
        name: 'Test User',
        roleId: 1
      }
    };
    moxios.stubRequest('/authentication', {
      status: 201,
      data: authData
    });

    Auth.loginUser(userName, password, successCallback, failureCallback);

    moxios.wait(() => {
      expect(successCallback.callCount).toBe(1);
      expect(failureCallback.callCount).toBe(0);
      expect(successCallback.args[0]).toEqual([authData]);
      done();
    });
  });
});