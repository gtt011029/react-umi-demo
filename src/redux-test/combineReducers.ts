const combineReducers = (reducer) => {
  return (state, action) => {
    let ret = {};

    for (let key in reducer) {
      ret[key] = reducer[key](state[key], action);
    }

    return {
      ...state,
      ...ret,
    };
  };
};
