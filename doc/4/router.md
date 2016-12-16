####创建  src/view/Layout.vue
    <template>
        <div>
            <section class="app-main">
                <div class="container">
                    {{msg}}
                    <router-view></router-view>
                </div>
            </section>
        </div>
    </template>
    <style scoped>
    
    </style>
    <script>
        export default{
            name:"LayOut",
            data:function(){
                return{
                    msg:'this is layout'
                }
            },
        }
    </script>

####创建  src/js/routes.js
    //布局
    import Layout       from '../view/Layout.vue'
    
    
    const routes = [
        { path: '', component: Layout,
            children: [
    
            ]
        },
    ];
    
    export default routes;

####创建  src/js/router.js
    import VueRouter    from  'vue-router'
    
    //挂载vue-router
    Vue.use(VueRouter);
    
    import routes       from  './routes'
    
    //定义路由
    var router = new VueRouter({
        mode: 'hash',
        routes // （缩写）相当于 routes: routes
    })
    
    export default router
    
####更新 src/view/Main.vue
    <template>
        <div id="main">
            //添加路由标签
            <router-view></router-view>
        </div>
    </template>
    <style>
    </style>
    <script>
        export  default{
            replace: true,
            name:"Main",
            data() {
                return {
                    msg: 'Hello Vue!'
                }
            },
        }
    </script>
    
####编译后 运行结果
![alt text](../res/4-create-router.jpg "运行效果")