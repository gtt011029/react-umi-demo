// 预加载脚本
// 包含一些执行于渲染进程中，且先于网页内容开始加载的代码
// contextBridge: 可把相关数据塞在window里面， 共render那边使用
// ipcRenderer: 进程间通信 （inter process connect）
const { contextBridge, ipcRenderer } = require('electron');
// DOMContentLoaded 当初始的html被完全加载后触发
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector); // 这个地方获取不到元素怎么办
    if (element) {
      element.innerText = text;
    }
  };
  ['chrome', 'node', 'electron'].forEach((dependency) => {
    setTimeout(() => {
      // 可能是这个地方先被调用， 然后才去渲染组件的
      replaceText(`${dependency}-version`, process.versions[dependency]);
    }, 3000);
  });

  contextBridge.exposeInMainWorld('test', {
    name: 'tina',
    age: 18,
  });

  // 给window塞入setTitle 方法，用于进程间通信
  // 就是把主进程的方法暴露给渲染进程
  contextBridge.exposeInMainWorld('electronApi', {
    setTitle: (title) => ipcRenderer.send('set-title', title),
    openFile: () => ipcRenderer.invoke('dialog:openFile'), // 调用  dialog:openFile
    handleCounter: (callback) => ipcRenderer.on('update-counter', callback), // 监听update-counter通道， 如果被触发就执行callback
    handleLanguage: (callback) => ipcRenderer.on('language', callback),
  });
});
