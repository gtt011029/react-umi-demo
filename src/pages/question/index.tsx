import React, { FC } from 'react';
import { ConnectProps, Loading, connect } from 'umi';

const Question = (props) => {
  console.log(props);

  return (
    <div>
      <h1>question data:</h1>
    </div>
  );
};

export default connect((data: any) => data)(Question);
