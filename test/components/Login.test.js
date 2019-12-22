import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import Enzyme, { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import Sinon from 'sinon';
import Auth from '../../src/components/pages/login_page/Auth';
import Login from '../../src/components/pages/login_page/Login';
import MockStore from '../mocks/Store';

Enzyme.configure({
  adapter: new Adapter()
});

describe('LoginPage', () => {
  const testUserName = 'testUserName';
  const testPassword = 'testPassword';
  const mockStore = new MockStore({
    userName: testUserName,
    password: testPassword
  });
  const createWrapper = () => {
    return mount(
      <Provider store={mockStore}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
  };

  test('should render login-form', () => {
    const wrapper = createWrapper();

    expect(wrapper.find('div.login-form')).toHaveLength(1);
  });

  test('should render username text input', () => {
    const wrapper = createWrapper();

    expect(wrapper.find('div.username-container')).toHaveLength(1);
    expect(wrapper.find('input#username.username-box')).toHaveLength(1);
  });

  test('should render password input', () => {
    const wrapper = createWrapper();

    expect(wrapper.find('div.password-container')).toHaveLength(1);
    expect(wrapper.find('input#password.password-box[type="password"]')).toHaveLength(1);
  });

  test('should render signin button', () => {
    const wrapper = createWrapper();
    const signInButton = wrapper.find('div.signin');

    expect(signInButton).toHaveLength(1);
    expect(signInButton.find('div.signin-text').text()).toEqual('SIGN IN');
  });

  describe('Authentication', () => {
    const loginUserStub = Sinon.stub(Auth, 'loginUser');

    beforeEach(() => {
      loginUserStub.reset();
    });

    test('should trigger LoginUser on Auth when SIGN IN button is clicked', () => {
      const wrapper = createWrapper();
      wrapper.find('input#username').simulate('change', { target: { value: testUserName } });
      wrapper.find('input#password').simulate('change', { target: { value: testPassword } });
      wrapper.find('div.signin').simulate('click');

      expect(loginUserStub.callCount).toBe(1);
      expect(loginUserStub.args[0][0]).toEqual(testUserName);
      expect(loginUserStub.args[0][1]).toEqual(testPassword);
      expect(typeof loginUserStub.args[0][2]).toEqual('function');
      expect(typeof loginUserStub.args[0][3]).toEqual('function');
    });
    test('should trigger loginUser when ENTER key is pressed', () => {
      const wrapper = createWrapper();
      wrapper.find('input#username').simulate('change', { target: { value: testUserName } });
      wrapper.find('input#username').simulate('keyPress', { nativeEvent: { keyCode: 13 } });

      expect(loginUserStub.callCount).toBe(1);
      expect(loginUserStub.args[0][0]).toEqual(testUserName);
      expect(loginUserStub.args[0][1]).toEqual('');

      wrapper.find('input#password').simulate('change', { target: { value: testPassword } });
      wrapper.find('input#password').simulate('keyPress', { nativeEvent: { keyCode: 13 } });

      expect(loginUserStub.callCount).toBe(2);
      expect(loginUserStub.args[1][0]).toEqual(testUserName);
      expect(loginUserStub.args[1][1]).toEqual(testPassword);
    });

    test('should set errorMessage for invalid login', () => {
      loginUserStub.callsArgOn(3);
      const wrapper = createWrapper();
      wrapper.find('div.signin').simulate('click');

      const errorMessage = 'Incorrect username/password';
      expect(wrapper.find('div#error.incorrectLogin').text()).toEqual(errorMessage);
    });

    test('should set set loggedIn and authenticatedUser for valid login', () => {
      const authData = {
        accessToken: 'randomAccessToken',
        userInfo: {
          name: 'Test User',
          roleId: 1
        }
      };
      loginUserStub.callsArgWith(2, authData);

      const wrapper = createWrapper();
      wrapper.find('div.signin').simulate('click');

      expect(wrapper.find('div#error.incorrectLogin')).toHaveLength(0);
      expect(mockStore.dispatch).toHaveBeenLastCalledWith({
        type: 'AUTH_USER',
        data: authData
      });
    });
  });
});