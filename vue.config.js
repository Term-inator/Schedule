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
        }
      }
    }
  }