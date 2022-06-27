import React, { useState, useReducer } from 'react';
const initialState = { count: 0 };

// const [state, dispatch] = useReducer(reducer, 初始值)

// state旧的数据 dispatch调用的reducer方法  action就是一个对象dispatch的参数
function reducer(state, action) {
  console.log('state: ', state);
  console.log('action: ', action);
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

const UseReducerTest = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // 使用useReducer  initialState为初始值，state为自定义变量、dispatch改变这个变量，
  // reducer：dipatch调用的方法
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      // 更改state中的数据
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
};

export default UseReducerTest;
