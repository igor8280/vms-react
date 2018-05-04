const merge = require('webpack-merge');
const common = require('./webpack.common.js')(false);

module.exports = merge(common, {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		historyApiFallback: true,
		contentBase: './dist/',
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
			}
		}
	}
});
