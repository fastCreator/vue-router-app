module.exports = {
  publicPath: './',
  configureWebpack: {
    entry: './example/main.js',
    module: {
      rules: [
        {
          test: /\.less$/,
          loader: 'less-loader' // compiles Less to CSS
        }
      ]
    }
  }
}
