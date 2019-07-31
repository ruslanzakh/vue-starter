const path = require('path');

module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				"@": path.resolve(__dirname, 'src/'),
				"@components": path.resolve(__dirname, 'src/components'),
				"@views": path.resolve(__dirname, 'src/views'),
				"@models": path.resolve(__dirname, 'src/models'),
				"@router": path.resolve(__dirname, 'src/router'),
				"@store": path.resolve(__dirname, 'src/store'),
				"@utils": path.resolve(__dirname, 'src/utils'),
				"@assets": path.resolve(__dirname, 'src/assets'),
			}
		}
	},
}