####使用 webpack 插件 ProvidePlugin
<p>ProvidePlugin是webpack内置的插件他能让如juqery这样的三方库暴露到全局环境中，即我们能够在全局环境中使用$。在项目中会在很多地方使用到Vue,如果不把Vue当做全局,每个使用了Vue的文件都引入一遍造成webpack打包之后代码的体积非常大每个页面加载很慢。</p>
    
####更新后的 webpack.config.js
    //引入webpack
    var webpack = require('webpack');
    
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
        plugins: [
            //使用插件让我们能够在全局使用Vue
            new webpack.ProvidePlugin({
                Vue: 'Vue'
            }),
        ],
      devtool: '#eval-source-map'
    }