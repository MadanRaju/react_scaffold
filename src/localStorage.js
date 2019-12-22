export const loadState = () => {
  try {
    const serializeState = localStorage.getItem('app-state');
    if(serializeState === null) {
      return undefined;
    }

    return JSON.parse(serializeState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('app-state', serializedState);
  } catch (err) {
    //Did not save
  }
};