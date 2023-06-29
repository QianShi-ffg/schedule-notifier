import { app, BrowserWindow, ipcMain, Menu, Tray, nativeImage } from "electron";
import path from "node:path";
import schedule from "node-schedule";
const notifier = require('node-notifier');
notifier.notify('Message');

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
const width = 290
const height = 500
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, "electron-vite.svg"),
    width: width,
    height: height,
    frame: false,
    show: false, // 默认窗口不显示
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    },
  });
  // 隐藏自带菜单
  win.setMenu(null)
  // 启动打开控制台
  // win.webContents.openDevTools()

  // win.webContents.on("did-finish-load", () => {
  //   win?.webContents.send("main-process-message", new Date().toLocaleString());
  // });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }

  win.on('blur', () => {
    win?.hide()
  })
}

app.on("window-all-closed", () => {
  win = null;
});


app.whenReady().then(() => {
  // scheduleJob()
  ipcMain.handle("set-time", scheduleJob);
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  initTray()
});

function initTray() {
  const image = nativeImage.createFromPath(path.join(process.env['PUBLIC'] as string, '01.png'))
  // 创建托盘图标
  const tray = new Tray(image);
  
  // 创建右键菜单
  const contextMenu = Menu.buildFromTemplate([
    { label: '退出', click: () => app.quit() }
  ]);

  // 设置托盘图标的上下文菜单
  tray.setContextMenu(contextMenu);

  // 托盘图标被点击时触发的事件
  tray.on('click', () => {
    const trayBounds = tray.getBounds()
    win?.setPosition(trayBounds.x + trayBounds.width / 2 - width / 2, trayBounds.height + height/2 + 100)
    if (win?.isVisible()) {
      win.hide()
    } else {
      win?.show()
    }
  });
}

function scheduleJob(event: any, value: any): any {
  console.log(event, value, 'eventeventeventevent')
  // 秒 分 时 日 月 周
  const job = schedule.scheduleJob(`0 ${value.minute || '0,30'} 10-20 * * ${value.day || '*' }`, function () {
  // schedule.scheduleJob(`${value} * 10-20 * * 1-5`, function () {
    // showNotification();
    notifier.notify({
      title: '我的通知',
      message: '久坐提醒!',
      // icon: path.join(__dirname, 'https://blog.xingyijun.cn/assets/user-b694c808.jpg')  ,//图标，通过path模块加载
      sound:true,  //是否显示提示音，true显示
    });
  });
  if (!value.isStart) {
    console.log(66666666)
    job.cancel()
  }
  return JSON.stringify(new Date())
}