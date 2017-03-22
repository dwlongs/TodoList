const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: path.resolve(__dirname, 'app.js'),
	output: {
		path: path.join('/Users/wldu/program/ruby/TodoList/todolist/public', 'javascripts'),
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
};


const src = path.join(__dirname, '..', '..', 'app')
const fs = require('fs')
if (fs.existsSync(src)) {
  module.exports.resolve = { 
  	alias: { 'react-router-redux': src },
  	extensions: ['', '.js', '.jsx', '.css']
  }
  module.exports.module.loaders.push({
    test: /\.js$/,
    loaders: ['babel'],
    include: src
  });
}
