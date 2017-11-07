const electron = require('electron')
const {app, BrowserWindow, Menu, ipcMain, dialog} = electron;

const path = require('path')
const url = require('url')

let mainWindow

const mainMenuTemplate = [{
  label: 'File',
  submenu: [{
      label: 'Quit',
      click() {app.quit()},
      accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
  }],
}];

if(process.platform === 'darwin') mainMenuTemplate.unshift({}); // for mac add empty object to Menu
if(process.env.NODE_ENV !== 'production')
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [{
        label: 'Toggle Dev Tools',
        click(item, focusedWindow) {focusedWindow.toggleDevTools()},
        accelerator: process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I',
      }, {
        role: 'reload'
    }]
  });

const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
});

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL(startUrl);
  mainWindow.webContents.openDevTools()
  mainWindow.on('closed', function () { mainWindow = null })
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
}

app.on('ready', createWindow)
app.on('window-all-closed', function () { if (process.platform !== 'darwin') app.quit() })
app.on('activate', function () { if (mainWindow === null) { createWindow() } })

ipcMain.on('get:dir', () => {
  const dirs = dialog.showOpenDialog(mainWindow, { properties: ['openDirectory'] });
  if (dirs && dirs.length > 0) mainWindow.webContents.send('set:dir', dirs[0]);
})
