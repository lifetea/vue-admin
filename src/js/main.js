/**
 * Created by lifetea on 16/9/20.
 */
// app.js

let Vue                 =    require('Vue')

import Main             from '../view/Main.vue'

import router           from './router'

// import { sync }         from 'vuex-router-sync'

// import store            from  '../vuex/store'

// sync(store, router)


//初始化APP
var app = new Vue({
    el:"#main",
    router,
    // store,
    render: h => h(Main),
})

