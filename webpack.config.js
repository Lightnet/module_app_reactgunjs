const path = require('path');
const fs = require('fs');

module.exports = {
    mode:'development',
    entry:  ['react','babel-polyfill','./src/client/clientEntryPoint.js'],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    //watch: true,
    module: {
      rules: [
            { test: /\.css$/, loader: 'style!css' },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'raw-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                loader: 'babel-loader',
                query: {
                    presets: ['babel-preset-env','react']
                }
            }
      ]
    },
    resolve: {
        alias: { 
            
        }
    }
};