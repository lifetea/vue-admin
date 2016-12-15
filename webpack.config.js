var path = require('path')
var webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var es3ifyPlugin = require('es3ify-webpack-plugin');

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: 'dist/',
    filename: 'build.js'
  },
  externals: {
      Vue:'Vue',
      moment:'moment',
      Vuex:'Vuex',
  },
  // resolveLoader: {
  //   root: path.join(__dirname, 'node_modules'),
  // },
  module: {
    noParse: [/moment/],
    loaders: [
      { test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: "style!css?sourceMap"
        })
      },
      // {
      //   test: /\.(eot|woff|ttf)$/,
      //   loader: "file-loader"
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
            presets: [ ["es2015", {"loose": true}] ],
            plugins: [
                "transform-es3-property-literals",
                "transform-es3-member-expression-literals",
                'transform-es2015-modules-commonjs',
            ]
        }
      },
      // {
      //   test: /\.(png|jpg|gif|svg)$/,
      //   loader: 'file',
      //   query: {
      //     name: '[name].[ext]?[hash]'
      //   }
      // },
      // // LESS
      // {
      //   test: /\.less$/,
      //   loader: 'style!css!less'
      // },
      // // SASS
      // {
      //   test: /(\.scss|\.css)$/,
      //   loader: ExtractTextPlugin.extract({
      //     fallbackLoader: 'style-loader',
      //     loader: ['css', 'sass']
      //   })
      // }
    ]
  },
  // babel: {
  //     presets: [ ["es2015", {"loose": true}] ],
  //     plugins: [
  //         "transform-es3-property-literals",
  //         "transform-es3-member-expression-literals",
  //         'transform-es2015-modules-commonjs',
  //     ]
  // },
  resolve:{
      alias:{
          moment : 'moment/min/moment.min.js'
      }
  },
  // plugins: [
  //   new ExtractTextPlugin("styles.css"),
  //   new es3ifyPlugin(),
  //   new webpack.ProvidePlugin({
  //       // 'Promise': require('es6-promise').polyfill(), // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
  //       'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  //   }),
  // ],
  // vue: {
  //   loaders: {
  //     scss: 'style!css!sass',
  //
  //   }
  // },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}
