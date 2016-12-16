#### 创建  根目录/index.html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>哈喽宝贝后台管理</title>
    </head>
      <body>
        <div id="main"></div>
        <script src="./dist/build.js"></script>
      </body>
    </html>

#### 创建  src/js/main.js
    // 导入Vue
    import Vue               from 'vue'
    // 导入Main.vue
    import Main              from '../view/Main.vue'

    //初始化APP
    var app = new Vue({
        el:"#main",
        // router,
        // store,
        render: h => h(Main),
    })
    


#### 创建  src/view/Main.vue
    <template>
        <div id="app">
            <!--<nav-bar :show="true"></nav-bar>-->
            <!--<router-view></router-view>-->
            <!--<footer-bar></footer-bar>-->
        </div>
    </template>
    <style>
    </style>
    <script>
        export  default{
            //replase 用来替代html中的id为main的标签
            replace: true,
            name:"Main",
            data() {
                return {
                    msg: 'Hello Vue!'
                }
            },
            components:{
            }
        }
    </script>
