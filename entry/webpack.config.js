
const path = require('path')
module.exports =  {
  target: "web",
  // entry: [
  //   // path.resolve(__dirname + '/src/index.js'),
  //   // path.resolve(__dirname + '/src/print.js')
  // ],
  entry: {
    main: path.resolve(__dirname + '/src/index.js'),
    // index: path.resolve(__dirname + '/src/index.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname + '/dist'),
  },
  plugins: [
    // new Log()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
            options: {
              presets: []
          }
        }],
      }
    ]
  },
  optimization: {
    usedExports: true,
    // minimize: true,
  }
}
