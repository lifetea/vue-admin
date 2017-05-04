#### 安装babel
    npm i --save-dev babel-cli babel-core

#### 转换es2015
    npm i --save-dev babel-preset-es2015 babel-preset-es2015-loose

#### 兼容es3
    npm i --save-dev babel-plugin-transform-es2015-modules-commonjs  babel-plugin-transform-es3-member-expression-literals babel-plugin-transform-es3-property-literals


#### 在webpack中使用babel
      module: {
          loaders: [
              {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
              }
          ]
      },
      
#### 配置babel 在根目录中创建.babelrc
    {
      "presets" : [ ["es2015", {"loose": true}] ],
      "plugins" : [
        "transform-es3-property-literals",
        "transform-es3-member-expression-literals",
        "transform-es2015-modules-commonjs"
      ]
    }