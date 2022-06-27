import React, { FC } from 'react';
import { ConnectProps, Loading, connect } from 'umi';
import Count from '@/pages/count';

const ReduxTest = (props) => {
  console.log('props: ', props);

  const getUser = () => {};

  return (
    <div>
      <h1>ReduxTest:</h1>
      <button onClick={getUser}>获取用户名称</button>
      <Count />
    </div>
  );
};

export default connect((data: any) => data)(ReduxTest);
