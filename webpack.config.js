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
      About: 'src/About.jsx',
      Graphs: 'src/Graphs.jsx',
      Nav: 'src/Nav.jsx'
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
