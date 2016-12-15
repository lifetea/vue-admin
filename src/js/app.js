/**
 * Created by lifetea on 16/9/20.
 */
// app.js
// import Vue              from 'vue'

var Vue                 =    require('Vue')

import App              from '../view/App.vue'

// import router           from './router'

// import { sync }         from 'vuex-router-sync'

// import store            from  '../vuex/store'


// sync(store, router)

//导入moment
// System.import('./Filter').then(function() {
//
// });

//设置全局
window.V = Vue

//导入过滤器
// let moment = require('moment')
// V.moment = moment
//

V.debugUrl = 'adminWeb/'

// //导入element ui
// System.import('element-ui/lib/index.js').then(function(element) {
//     Vue.use(element)
// });

//网络请求
// System.import('vue-resource').then(function(resource) {
//     Vue.use(resource)
//     Vue.http.options.emulateJSON = true;
//     //session 失效跳转
//     Vue.http.interceptors.push((request, next) => {
//         next((response) => {
//             if(response.status == 200 && response.body.status == 'UNLOGIN'){
//                 window.location.hash = "#/login"
//             }
//         });
//     });
// });

//初始化APP
var app = new Vue({
    el:"#app",
    // router,
    // store,
    render: h => h(App),
})

