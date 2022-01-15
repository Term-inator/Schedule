module.exports = {
    pluginOptions: {
      electronBuilder: {
        nodeIntegration: true,
        builderOptions:{
        	extraResources: [
        		{
							from:'./resources',
							to:'./'
						}
		    ],
            nsis: {
                "allowToChangeInstallationDirectory": true,
                "createDesktopShortcut": true,
                "oneClick": false,
                "menuCategory": false,
                "perMachine": false
            }
        }
      }
    }
  }