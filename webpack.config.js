var path = require('path');
module.exports = {
  entry: './src/App.jsx',
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'app.bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      Main: 'src/Main.jsx',
      Orgs: 'src/Orgs.jsx',
      Nav: 'src/Nav.jsx',
      Underground: 'src/Underground.jsx',
      KingsOfEngland: 'src/KingsOfEngland.jsx',
      Result: 'src/Result.jsx',
    },
    extensions: ['','.js','.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  }
  };
