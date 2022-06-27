import React, { FC } from 'react';
import { ConnectProps, Loading, connect } from 'umi';
import { IndexModelState } from '../../models/index';

const CountItem = (props: any) => {
  const { count, increase } = props;

  return (
    <>
      {count}
      <button onClick={increase}>Count++</button>
    </>
  );
};

const Count = ({ index, dispatch }) => {
  console.log(index);
  const { name } = index;
  return <h1>name: {name}</h1>;
};

// connect方法返回的是一个react组件， 通常称为容器组件。因为它是原始UI组件的容器， 及外面包了一层state
// 参数： mapStateToProps函数， 会返回一个对象， 用于建立state到props的映射关系
// 第二个参数， mapDispatchToProps
export default connect(
  ({ index, loading }: { index: IndexModelState; loading: Loading }) => ({
    index,
    loading: loading.models.index,
  }),
)(Count);
