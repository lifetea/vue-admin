var webpack             = require('webpack');
var ExtractTextPlugin   = require("extract-text-webpack-plugin")

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
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "style-loader!css-loader?sourceMap"
                })
            },

            // LESS
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            // SASS
            {
                test: /(\.scss|\.css)$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: ['css', 'sass']
                })
            }
        ],
        rules:[
            { test: /\.png$/, loader: 'file-loader?name=[name].[hash:6].[ext]' },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            loader: 'css-loader',
                            fallbackLoader: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                        }),
                        scss: 'style-loader!css-loader!sass-loader',

                    }
                }
            },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            Vue: 'Vue'
        }),
        new ExtractTextPlugin("style.css")
    ],
    devtool: '#eval-source-map'
}