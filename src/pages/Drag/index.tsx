import React from 'react';
import styles from './index.less';

const Drag = () => {
  const dragOne = () => {};
  return (
    <div className={styles.page}>
      <h1>尝试原生拖拽</h1>
      <div onDragStart={dragOne}>drag1</div>
      <div>drag2</div>
    </div>
  );
};

export default Drag;
