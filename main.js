const path = require('path');
const { app, BrowserWindow, Menu, Tray, systemPreferences } = require('electron');

let mainWindow, aboutWindow
let tray = null;

process.env.NODE_ENV = 'production'

// var notif_flag = true;
// function flipNotif() {
//     if(notif_flag) {
//         app.disableNotifications();
//         console.log("Noti switched off");
//     } else {
//         app.enableNotifications();
//         console.log("Notif switched on");
//     }
// }

function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'AstroTrackr',
        width: 850,
        height: 600,
        icon: path.join(__dirname, './images/test4.jpg')
    });

    // mainWindow.webContents.openDevTools();

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

function createAboutWindow() {
    aboutWindow = new BrowserWindow({
        title: 'About AstroTrackr',
        width: 400,
        height: 400,
        center: true,
        autoHideMenuBar: true
    });

    aboutWindow.loadFile(path.join(__dirname, './renderer/about.html'));
}

app.whenReady().then(() => {
    // tray = new Tray('./images/test4.jpg')
    // tray.setToolTip('AstroTrackr')

    // let template = [
    //     {
    //         label: 'Show App',
    //         onclick: console.log('tray-show')
    //     },
    //     {
    //         label: 'Quit',
    //         noclick: app.quit
    //     }
    // ]

    // const ctxMenu = Menu.buildFromTemplate(template)
    // tray.setContextMenu(ctxMenu)

    createMainWindow();

    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createWindow();
        }
      });
    });

    const menu = [
        {
            label: 'App',
            submenu: [
                // {
                //     label: 'Toggle Notifications',
                //     onclick : flipNotif(),
                // },
                // {
                //     type: 'separator'
                // },
                {
                    label: 'Quit',
                    click: () => app.quit(),
                }
            ]
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'About',
                    click: createAboutWindow
                },
                {
                    label: 'Learn More',
                    click: async () => {
                        const { shell } = require('electron')
                        await shell.openExternal('https://rushilshekhar.xyz')
                    }
                }
            ]
        }
    ]

    if (process.platform === 'win32') {
        app.setAppUserModelId("AstroTrackr")
    }

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
});