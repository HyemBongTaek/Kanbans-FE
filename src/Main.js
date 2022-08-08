const { app, BrowserWindow } = require("electron");
const path = require("path");
function createWindow() {
  const window = new BrowserWindow({
    width: 1500,
    height: 1000,
    // resizable: false,
    minWidth: 1500,
    minHeight: 1000,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      //토큰유지
      enableRemoteModule: true,
    },
  });
  window.loadURL("http://cocori.site/");
}
app.whenReady().then(() => {
  createWindow();
});
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// const url = require("url");
//
// let mainWindow;
//
// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//   });
//   const startUrl =
//     "http://localhost:3000/" ||
//     url.format({
//       pathname: path.join(__dirname, "../public/index.html"),
//       protocol: "file:",
//       slashes: true,
//     });
//
//   mainWindow.loadURL(startUrl);
// }
//
// app.on("ready", createWindow);
