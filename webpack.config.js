var webpack             = require('webpack');
var ExtractTextPlugin   = require("extract-text-webpack-plugin")
var path                = require("path")

module.exports = {
    entry: ["babel-polyfill", "./src/js/main.js"],
    output: {
        path: __dirname + '/dist',
        publicPath: 'dist/',
        filename: 'build.js'
    },
    externals: {
        Vue:'Vue',
        moment:'moment',
        Vuex:'Vuex',
        accounting:'accounting',
    },
    resolve: {
        alias: {
            element: path.join(__dirname, '/node_modules/element-ui/lib/theme-default'),
            src: path.join(__dirname, '/src'),
        }
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "style-loader!css-loader?sourceMap"
                })
            },

            // LESS
            {
                test: /\.less$/,
                use: 'style-loader!css-loader!less-loader'
            },
            // SASS
            {
                test: /(\.scss|\.css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css', 'sass']
                })
            }
        ],
        rules:[
            { test: /\.(png|jpg|svg)$/, loader: 'file-loader?name=[name].[hash:6].[ext]' },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "style-loader!css-loader?sourceMap"
                })
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                        }),
                        scss: 'style-loader!css-loader!sass-loader',

                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            Vue: 'Vue',
            moment:'moment',
            accounting:'accounting'
        }),
        new ExtractTextPlugin("style.css")
    ],
    devtool: '#eval-source-map'
}