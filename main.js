const electron = require('electron');
const path = require('path');
const {
  screen,
  app, // 控制应用程序的事件
  nativeImage,
  ipcMain,
  ipcRenderer,
  dialog,
  Menu,
  BrowserWindow, // 创建和管理程序窗口
} = electron;

const menu = Menu.buildFromTemplate([
  {
    label: app.name,
    submenu: [
      {
        click: () => {
          // 将IPC消息从主进程发送到目标渲染器
          mainWindow.webContents.send('update-counter', 1);
        },
        label: 'Increment',
      },
      {
        click: () => mainWindow.webContents.send('update-counter', -1),
        label: 'Decrement',
      },
    ],
  },
]);

// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var mainWindow = null;

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    // darwin： macOS
    app.quit();
  }
});

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog();
  if (canceled) {
    return;
  } else {
    return filePaths[0];
  }
}

// 当 ElectronDemo 完成了初始化并且准备创建浏览器窗口的时候
app.whenReady().then(() => {
  ipcMain.handle('dialog:openFile', handleFileOpen);
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

function createWindow() {
  const size = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({ // 创建浏览器窗口。
    // width: size.width,
    // height: size.height,
    width: 800,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: '/home/xyz/tina/my-self/react-umi-demo/src/assets/Inbox.png', // 图标
  });

  // 进程间通信， 用于收到render发送的set-title数据， 并作出处理
  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents); // 找到这个window
    win.setTitle(title);
  });

  ipcMain.on('counter-value', (event, value) => {
    console.log(value);
  });

  Menu.setApplicationMenu(menu);
  // 加载应用的 index.html
  // mainWindow.loadFile('/home/xyz/tina/my-self/react-umi-demo/dist/index.html')
  mainWindow.loadURL('http://localhost:8000');

  // 打开开发工具
  mainWindow.openDevTools();

  // 当 window 被关闭，这个事件会被发出
  mainWindow.on('closed', function () {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，通常会把多个 window 对象存放在一个数组里面，
    mainWindow = null;
  });
}
