###在根目录创建 webpack.config.js
    module.exports = {
      entry: './src/js/main.js',
      output: {
        path: __dirname + '/dist',
        publicPath: 'dist/',
        filename: 'build.js'
      },
      module: {
          loaders: [
              {
                  test: /\.vue$/,
                  loader: 'vue-loader'
              },
              {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
              }
          ]
    
      },
      devtool: '#eval-source-map'
    }
   
    
