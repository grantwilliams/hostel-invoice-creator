module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {exclude: /node_modules/, loader: 'babel-loader', query: {presets: ['react', 'es2015', 'stage-1']}},
      {test: /\.css$/, loaders: ['style-loader', 'css-loader']},
      {test: /\.gif$/, loader: "url-loader?mimetype=image/png"},
      {test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]"},
      {test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff"}
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};