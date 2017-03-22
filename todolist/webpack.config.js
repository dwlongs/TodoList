const path = require('path')
const webpack = require('webpack')
const fs = require('fs')

module.exports = {
	entry: path.resolve('app/rassets/app.js'),
	output: {
		path: path.resolve('public/javascripts'),
		filename: 'app-todolist.js',
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react', 'stage-1'],
					plugins: ["transform-flow-comments"]
				}
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]',
			},
            {
            	test: /\.(png|jpg)$/,
				loader: 'url-loader?limit=8192&name=../images/[name].[ext]'
            }
		]
	}
}

