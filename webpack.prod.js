const merge = require('webpack-merge');
const common = require('./webpack.common.js')(true);

module.exports = merge(common, {
	mode: 'production',
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all"
				}
			}
		}
	}
});
