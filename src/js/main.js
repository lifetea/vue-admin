/**
 * Created by lifetea on 16/9/20.
 */
// app.js

Vue                     =    require('Vue')

import Main             from '../view/Main.vue'

import {router}           from './router'

//
// import { sync }         from 'vuex-router-sync'
//
// import store            from  '../vuex/store'
//

Vue.debugUrl = "/admin"

//filter
System.import('./filter.js')

// sync(store, router)

//网络请求
System.import('vue-resource').then(function(resource) {
    Vue.use(resource)
    Vue.http.options.emulateJSON = true;
    // session 失效跳转
    // Vue.http.interceptors.push((request, next) => {
    //     next((response) => {
    //         if(response.status == 200 && response.body.status == 'UNLOGIN'){
    //             window.location.hash = "#/login"
    //         }
    //     });
    // });
});

//初始化APP
var app = new Vue({
    el:"#main",
    router,
    // store,
    render: h => h(Main),
})

