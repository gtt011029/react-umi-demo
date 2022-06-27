const dispatch = (action) => {
  const state = {
    count,
  };

  const setter = {
    count: setCount,
  };

  const newState = combineReducers(reducer)(state, action);

  for (let key in newState) {
    setter[key](newState[key]);
  }
};
