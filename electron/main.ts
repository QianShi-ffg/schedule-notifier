import { app, BrowserWindow, ipcMain, Notification, Menu, Tray, dialog, nativeImage } from "electron";
import path from "node:path";
import schedule from "node-schedule";
const notifier = require('node-notifier');
console.log(ipcMain, Notification, dialog)
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
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
  scheduleJob()
}

app.on("window-all-closed", () => {
  win = null;
});


let tray = null;

app.whenReady().then(() => {
  // scheduleJob()
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  initTray()
});

function initTray() {
  const image = nativeImage.createFromPath(path.join(process.env['PUBLIC'] as string, '01.png'))
  // 创建托盘图标
  tray = new Tray(image);

  // 创建右键菜单
  const contextMenu = Menu.buildFromTemplate([
    // { label: '菜单项 1', click: () => console.log('菜单项 1 被点击') },
    // { label: '菜单项 2', click: () => console.log('菜单项 2 被点击') },
    { label: '退出', click: () => app.quit() }
  ]);

  // 设置托盘图标的上下文菜单
  tray.setContextMenu(contextMenu);

  // 托盘图标被点击时触发的事件
  tray.on('click', () => {
    const wins = BrowserWindow.getAllWindows();
    if (wins.length) {
      const find = wins.find((win) => win.isMinimized());
      if (find) find.show();
      else wins[0]?.focus();
    } else {
      createWindow();
    }
    // 在这里添加你希望执行的操作
  });
}

function scheduleJob() {
  // 秒 分 时 日 月 周
  schedule.scheduleJob("0 0,30 10-20 * * 1-5", function () {
    win?.webContents.send("dialog:openFile", new Date());
    // showNotification();
    notifier.notify({
      title: '我的通知',
      message: '久坐提醒!',
      // icon: path.join(__dirname, 'https://blog.xingyijun.cn/assets/user-b694c808.jpg')  ,//图标，通过path模块加载
      sound:true,  //是否显示提示音，true显示
    });
  });
}