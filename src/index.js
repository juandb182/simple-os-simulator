const { app, BrowserWindow,Menu} = require('electron');
const url = require('url');
const path = require('path');
const usb = require('usb');
const cpu = require ('windows-cpu') ; 
const si = require('systeminformation');

 

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

if (process.env.NODE_ENV !== 'production') {
    
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname,'node_modules','.bin','electron')
      });
}


let win

app.on('ready',()=>{
    win = new BrowserWindow({
        width: 900 , height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    
    });

    
    
    win.loadURL(url.format({
        pathname: path.join(__dirname,'/views/index.html'),
        protocol: 'file',
        slashes : true,
    }))
   const mainMenu = Menu.buildFromTemplate(templateMenu);
   Menu.setApplicationMenu(mainMenu);
    //win.setProgressBar(0.8)
    
    
    win.on('closed',() => {
        app.quit();
    });


    
    
  
});

function createNewProductWindow(){
  const newProduct =  new BrowserWindow({
        width:400,
        height:300,
        title:'add New Product'
    });
    newProduct.setMenu(null);
    win.loadURL(url.format({
        pathname: path.join(__dirname,'/views/newProduct.html'),
        protocol: 'file',
        slashes : true,
    }))
    newProduct.on('closed',() =>{
      const newProduct = null;
    });
}

const templateMenu = [
    {
        label:'File',
        submenu:[
            {
                label:'Submenu',
                accelerator: 'Ctrl+N',
                click(){
                    createNewProductWindow();
                }
            },
            {
                label:'Remove All Products',
            },
            {
                label:'Exit',
                accelerator: process.platform == 'darwin' ? 'Ctrl+Q' : 'command+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

if(process.platform === 'darwin'){
    templateMenu.unshift({
        label: app.getName()
    });

}

if(process.env.NODE_ENV !== 'production'){
    templateMenu.push({
        label:'DevTool',
        submenu:[
            {
                label:'Show/Hide DevTool',
                click(item,focusedWindow){
                    focusedWindow.toggleDevTools();
                }
                
            },
            {
                role:'reload'
            }
        ]
    })
}