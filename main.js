const { app, BrowserWindow, Menu ,shell ,ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
ipcMain.on('whichroom',(event,arg)=>{
    const roomjson = JSON.parse(fs.readFileSync('app/room.json').toString());
    if (arg == 'init') {
        event.sender.send('roomlist',roomjson);
        event.sender.send('thisroom',roomjson['ダイナマイト']);
    } else {
        event.sender.send('thisroom',roomjson[arg]);
    }
})
const template = [
{
    label: '文件',
    submenu: [{
        type: 'separator'
    }, {
        label: '退出',
        accelerator: 'Esc',
        role: 'close'
    }]
},
{
    label: '编辑',
    submenu: []
},
{
    label: '查看',
    submenu: [{
        label: '重载',
        accelerator: 'CmdOrCtrl+R',
        click: (item, focusedWindow) => {
            if (focusedWindow) {
                // 重载之后, 刷新并关闭所有之前打开的次要窗体
                if (focusedWindow.id === 1) {
                    BrowserWindow.getAllWindows().forEach(win => {
                        if (win.id > 1) win.close()
                    })
                }
                focusedWindow.reload()
            }
        }
    }, {
        label: '切换全屏',
        accelerator: (() => {
            if (process.platform === 'darwin') {
                return 'Ctrl+Command+F'
            } else {
                return 'F11'
            }
        })(),
        click: (item, focusedWindow) => {
            if (focusedWindow) {
                focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
            }
        }
    }, {
        label: '切换开发者工具',
        accelerator: (() => {
            if (process.platform === 'darwin') {
                return 'Alt+Command+I'
            } else {
                return 'Ctrl+Shift+I'
            }
        })(),
        click: (item, focusedWindow) => {
            if (focusedWindow) {
                focusedWindow.toggleDevTools()
            }
        }
    }]
},
{
    label: '帮助',
    role: 'help',
    submenu: [{
        label: '学习更多',
        click: function () {
            shell.openExternal('https://cn.bing.com/')
        }
    },{
        label: '切换直播间',
        submenu:[{
			label:'将鼠标移动到"直播间评论"旁边并点击下拉菜单切换'
        }]
    }]
}];
function createWindow() {
    const mainWindow = new BrowserWindow({
    	icon: path.join(__dirname, 'favicon.ico'),
        width: 352,
        height: 600,
        minWidth: 352,
        maxWidth: 352,
        minHeight: 405,
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    mainWindow.loadFile('app/index.html');
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu)
}
app.whenReady().then(() => {
    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})