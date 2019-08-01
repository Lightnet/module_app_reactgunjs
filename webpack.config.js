
//var nodeExternals = require('webpack-node-externals');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    //target: 'node',
    target: 'web',
    mode:'development',
    entry: './src/client/index.js',
    output: {
        path: __dirname + '/public',    
        publicPath: '/',    
        filename: 'bundle.js'  
    },  
    devServer: {    
        contentBase: './public',
    },  
    module: {    
        rules: [    
            {      
                test: /\.(js|jsx)$/,      
                exclude: /node_modules/,      
                use: ['babel-loader']    
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            } 
        ]  
    },
    externals:[
        //nodeExternals({
            //whitelist:['gun/gun','gun/sea']
        //})
    ],
    optimization: {
        //minimizer: [new UglifyJsPlugin()],
    }
};