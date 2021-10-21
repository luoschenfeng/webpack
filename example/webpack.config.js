const path = require('path')
module.exports = {
    target: 'web',
    entry: {
        main: './src/main.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
    },
    devtool: 'source-map',
    // optimization: {
    //     usedExports: true,
    // },
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