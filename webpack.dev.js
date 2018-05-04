const merge = require('webpack-merge');
const common = require('./webpack.common.js')(false);

module.exports = merge(common, {
	mode: 'development',
	// devtool: 'inline-source-map',
	devServer: {
		historyApiFallback: true,
		contentBase: './dist/',
		historyApiFallback: true,
		overlay: true,
		proxy: {
			'/proxy': {
				target: 'http://vms-dev.united.cloud:8080/api/v1',
				// target: 'https://jsonplaceholder.typicode.com/posts',
				pathRewrite: {
					'/proxy': ''
				},
				changeOrigin: true,
				secure: false
			},
			'/xproxy': {
				// target: 'http://vms-qa.united.cloud:8080/epg-connector/api/v1',
				target: 'https://jsonplaceholder.typicode.com/comments',
				pathRewrite: {
					'/xproxy' : ''
				},
				changeOrigin: true,
				secure: false
			},
			'/zproxy': {
				// target: 'http://vms-qa.united.cloud:8080/',
				target: 'https://jsonplaceholder.typicode.com/users',
				pathRewrite: {
					'/zproxy' : ''
				},
				changeOrigin: true,
				secure: false
			}
		}
	}
});
