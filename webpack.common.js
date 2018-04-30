const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const cssLoader = (module, prod) => {
	return [
		MiniCssExtractPlugin.loader,
		{
			loader: 'css-loader',
			options: {
				modules: module,
				localIdentName: '[name].[hash:base64:7]',
				minimize: prod
			}
		}
	];
};

// generate less loader with modules enabled or disabled
const lessLoader = (module, prod) => cssLoader(module, prod).concat([
	{
		loader: 'less-loader',
		options: {
			sourceMap: false,
			javascriptEnabled: true
		}
	}
]);

module.exports = (prod) => {
	return {
		// entry: {
		// 	vendors: [
		// 		'antd',
		// 		'axios',
		// 		'react',
		// 		'react-dom',
		// 		'react-redux',
		// 		'react-router',
		// 		'react-router-dom',
		// 		'redux',
		// 		'redux-thunk'
		// 	],
		// 	app: './src/main.js'
		// },
		entry: [
			'./src/main.js'
		],
		output: {
			filename: 'js/[name].js',
			path: path.resolve(__dirname, 'dist'),
			publicPath: "/"
		},
		resolve: {
			alias: {
				'assets': path.join(__dirname, 'src/assets')
			}
		},
		plugins: [
			new CleanWebpackPlugin(['dist']),
			new HtmlWebpackPlugin({
				template: './src/index.html'
			}),
			new MiniCssExtractPlugin({
				filename: "css/[name].css",
				chunkFilename: "css/chunk[id].css"
			})
		],
		module: {
			rules: [
				{
					enforce: "pre",
					test: /\.js$/,
					exclude: /node_modules/,
					loader: "eslint-loader"
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: 'babel-loader'
				},
				{
					test:/\.css$/,
					loader: 'style-loader'
				},
				{
					test: /\.css$/,
					loader: cssLoader(true, prod)
				},
				{
					test: /\.less$/,
					exclude: /node_modules\/antd/,			// except for ant design
					use: lessLoader(true, prod)				// modules are enabled globally
				},
				{
					test: /\.less$/,
					include: /node_modules\/antd/,			// only ant design
					use: lessLoader(false, prod)			// less loader without modules
				},
				{
					test: /\.(png|jpg|jpeg|gif|svg)$/,
					loader: 'url-loader',
					query: {
						// Inline images smaller than 10kb as data URIs
						limit: 10000,
						fallback: 'file-loader',
						name: 'images/[name].[hash:7].[ext]'
					}
				},
				{
					test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
					loader: 'url-loader',
					query: {
						limit: 10000,
						name: 'fonts/[name].[hash:7].[ext]'
					}
				}
			]
		}
	};
}
