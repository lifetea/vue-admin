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
    
### 配置 babel-polyfill


    作用:
        Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。
        举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。
    
    安装:
        npm install i --save-dev babel-polyfill
    
    webpack中配置:
        entry: ["babel-polyfill", "./src/js/main.js"],
    