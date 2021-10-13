const path = require('path')
module.exports = {
    target: 'web',
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.css$/,
                type: 'asset/resource',
            }
        ]
    }
}