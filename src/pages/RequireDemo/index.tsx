import React, { useEffect } from 'react';
import styles from './index.less';
const ipcRenderer = window.require('electron').ipcRenderer;

const RequireDemo = () => {
  useEffect(() => {
    const channel = new MessageChannel();
    const port1 = channel.port1;
    const port2 = channel.port2;
    port2.postMessage({ msg: '我是post2发送的消息' });
    ipcRenderer.postMessage('port', null, [port1]);
  }, []);

  return (
    <div className={styles.page}>
      <h1>测试postMessage</h1>
    </div>
  );
};

export default RequireDemo;
