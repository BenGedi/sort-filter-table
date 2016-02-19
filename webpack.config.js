var path              = require('path');
var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

	entry: [
      	//'webpack-dev-server/client?http://localhost:8080',
      	path.resolve('./src/main.js')
	],

	output: {
		path: path.resolve('build'),
		publicPath: '',
		filename: "main.js"
	},
	devServer: {
	   headers: { "Access-Control-Allow-Origin": "*" }
	},
	module: {
		preLoaders: [
			//{ test: /\.js$/, exclude: /node_modules/, loader: 'jshint-loader' }
		],
		loaders: [
			{
				test: /\.js?$/,
				loaders: ['react-hot', 'babel'],
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('css!sass')
			},
			{
				test: /\.(jpe?g|gif|png|woff|ttf|eot)[\?]?.*$/,
				loader: 'url-loader?limit=10000&name=assets/[name].[ext]'
			},
			{
				test: /\.(svg)$/,
				loader: 'file-loader?name=assets/[name].[ext]'
			}
		]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin('./style.css', {
			allChunks: true
		})
	]

};
