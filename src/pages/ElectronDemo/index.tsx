import React, { useEffect, useState } from 'react';
import styles from './index.less';

const ElectronDemo = () => {
  const [title, setTitle] = useState('');
  const [bigDemo, setBigDemo] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const channel = new MessageChannel();
    const port1 = channel.port1;
    const port2 = channel.port2;

    port2.postMessage({ answer: 42 });

    ipc;
  }, []);

  const changeTitle = () => {
    // 这是渲染进程发送信息到主进程
    window.electronApi.setTitle(title);
  };
  const updateTitle = (e) => {
    setTitle(e.target.value);
  };
  const setBig = () => {
    setBigDemo(true);
  };

  // 渲染进程调用主进程模块并等待结果
  const openFile = async () => {
    const filePath = await window.electronApi.openFile();
    setFilePath(filePath);
  };

  // 主进程控制渲染进程 callback
  // 监听 update-counter 通道的信息， 有数据时，立即执行callback
  window.electronApi.handleCounter((event, value) => {
    const oldValue = Number(counter);
    const newValue = oldValue + value;
    setCounter(newValue);
    event.sender.send('counter-value', newValue);
  });

  return (
    <div className={styles.page}>
      <input type="text" value={title} onChange={updateTitle} />
      <button onClick={changeTitle}>确认更换title</button>
      <span
        className={[styles.test, bigDemo ? styles.red : null].join(' ')}
        onClick={setBig}
      ></span>
      <br />
      <button onClick={openFile}>open a file</button>
      <div>file path: {filePath}</div>
      <br />
      <div>{counter}</div>
    </div>
  );
};
export default ElectronDemo;
