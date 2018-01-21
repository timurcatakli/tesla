module.exports = {
  entry: __dirname + '/src',
  output: {
    path: '/'
  },
  devtool: 'source-maps',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          compact: true,
          presets: ['env', 'react'],
          plugins: ['transform-class-properties']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader'
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      }
    ]
  }
}
