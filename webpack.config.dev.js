import webpack from 'webpack';
import path from 'path';

export default {
  debug: true,
  devtool: 'eval',
  //set to false means it will display a list of all files it is bundling
  //typically, turn it on for production
  noInfo: false,
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    './src/Containers/App'
  ],
  //can be set to node
  // setting it should be bundled so the web can understand
  target: 'web',
  //But webpack won't generate any actual physical file;
  //it will be served from memory
  output: {
    //but path and name need to be inputted
    //no files won't be written
    path: __dirname + '/build', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  //tell webpack's dev server where the code is
  devServer: {
    noInfo: true,
    contentBase: './src',
    inline: true,
    historyApiFallback: true,
    stats: {
      colors: true
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, 'src'),
        loaders: ['babel-loader']
      },
      {
        test: /(\.css)$/,
        loaders: ['style', 'css']
      },
      //below is necessary for bootstrap
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url?prefix=font/&limit=5000'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};
