class MockStore {
  constructor(state) {
    this.state = state || {};
    this.dispatch = jest.fn();
    this.getState = jest.fn().mockReturnValue(this.state);
    this.subscribe = jest.fn().mockImplementation((callBack) => {
      callBack(this.state);
    });
  }
}

export default MockStore;