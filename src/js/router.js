/**
 * Created by lifetea on 2016/10/8.
 */

let Vue             =   require('Vue')

import VueRouter    from  'vue-router'

import auth         from  './auth'

//挂载vue-router
Vue.use(VueRouter);

//布局
import Layout       from '../view/Com/Layout.vue'
//lazy load
const lazyLoading = (name, index = false) => () => System.import(`../view/${name}${index ? '/index' : ''}.vue`)

//要求登录
function requireAuth (to, from, next) {
    if (!auth.loggedIn()) {
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    } else {
        next()
    }
}


export let list = [
    {
        icon:"ios-navigate",
        index:"1",
        name:'首页',
        path:'index',
        component: lazyLoading('Pages/Index/Index'),
    },
    {
        icon:"person",
        name:"个人管理",
        index:'2',
        children:[
            {
                name:"个人资料",
                index:'2-1',
                path:'user-info',
                component: lazyLoading('Pages/User/Info'),
            },
            {
                name:"银行资料",
                index:'2-2',
                path:'user-bank',
                component: lazyLoading('Pages/User/Bank'),
            },
            {
                name:"个人升级",
                index:'2-3',
                path:'user-level',
                component: lazyLoading('Pages/User/Level'),
            },
        ]
    },
    {
        icon:"social-yen",
        name:"财务管理",
        index:'3',
        children:[
            {
                name:"奖金明细",
                index:'3-1',
                path:'user-info',
                component: lazyLoading('Pages/User/Info'),
            },
            {
                name:"奖金提现",
                index:'3-2',
                path:'user-bank',
                component: lazyLoading('Pages/User/Bank'),
            },
            {
                name:"积分充值",
                index:'3-3',
                path:'user-level',
                component: lazyLoading('Pages/User/Level'),
            },
            {
                name:"积分转账",
                index:'3-4',
                path:'user-level',
                component: lazyLoading('Pages/User/Level'),
            },
            {
                name:"积分转换",
                index:'3-5',
                path:'user-level',
                component: lazyLoading('Pages/User/Level'),
            },
        ]
    },
    {
        icon:"ios-cart",
        name:"购物中心",
        index:'4',
        children:[
            {
                name:"选购商品",
                index:'4-1',
                path:'user-info',
                component: lazyLoading('Pages/User/Info'),
            },
            {
                name:"已购列表",
                index:'4-2',
                path:'user-bank',
                component: lazyLoading('Pages/User/Bank'),
            },
        ]
    },
    {
        icon:"android-contacts",
        name:"联系我们",
        index:'6',
        children:[
            {
                name:"留言反馈",
                index:'6-1',
                path:'email-send',
                component: lazyLoading('Pages/Email/Send'),
            },
            {
                name:"发件箱",
                index:'6-2',
                path:'email-out-box',
                component: lazyLoading('Pages/Email/OutBox'),
            },
            {
                name:"收件箱",
                index:'6-3',
                path:'email-in-box',
                component: lazyLoading('Pages/Email/InBox'),
            },
            {
                name:"新闻公告",
                index:'6-4',
                path:'news-list',
                component: lazyLoading('Pages/News/List'),
            },
            {
                name:"新闻添加",
                index:'6-5',
                path:'news-add',
                component: lazyLoading('Pages/News/Add'),
            },
            {
                name:"新闻编辑",
                index:'6-6',
                path:'news-add',
                component: lazyLoading('Pages/News/Edit'),
            },
        ]
    },
    {
        icon:"locked",
        name:"安全中心",
        index:'7',
        children:[
            {
                name:"密码修改",
                index:'7-1',
                path:'user-pwd',
                component: lazyLoading('Pages/User/Pwd'),
            },
            {
                name:"密保修改",
                index:'7-2',
                path:'user-safe',
                component: lazyLoading('Pages/User/Save'),
            }
        ]
    }
]

let arr = [
    {
        path: '',
        component: lazyLoading('Pages/Index/Index'),
        name:"index",
    }
]

list.forEach((ele,index)=>{
    if(!!ele.children){
        Array.prototype.push.apply(arr,ele.children);
    }else {
        arr.push(ele)
    }

})

const routes = [
    {
        path: '',
        component: Layout,
        beforeEnter:requireAuth,
        children: arr
            // [
            // {
            //     path: '',
            //     component: lazyLoading('Pages/Index/Index'),
            //     name:"index",
            // },
            // {
            //     path: 'index',
            //     component: lazyLoading('Pages/Index/Index'),
            //     name:'主页',
            // },
            // // User 用户
            // {
            //     path: 'user-info',
            //     component: lazyLoading('Pages/User/Info'),
            //     name:'user-info'
            // },
            // {
            //     path: 'stat-repayment',
            //     component: lazyLoading('Pages/Stat/Outcome'),
            //     name:'stat-outcome-plan',
            //     meta:{
            //         alias   :'统计',
            //     }
            // },
            // {
            //     path: 'stat-credit',
            //     component: lazyLoading('Pages/Stat/Credit'),
            //     name:'stat-credit',
            //     meta:{
            //         alias   :'统计',
            //     }
            // },
            // {
            //     path: 'stat-info',
            //     component: lazyLoading('Pages/Stat/Info'),
            //     name:'stat-info',
            //     meta:{
            //         alias   :'统计',
            //     }
            // },
            // {
            //     path: 'stat-invest',
            //     component: lazyLoading('Pages/Stat/Invest'),
            //     name:'stat-invest',
            //     meta:{
            //         alias   :'统计',
            //     }
            // },
            // {
            //     path: 'stat-returned',
            //     component: lazyLoading('Pages/Stat/Returned'),
            //     name:'stat-invest',
            //     meta:{
            //         alias   :'统计',
            //     }
            // },
            // {
            //     path: 'stat-operate',
            //     component: lazyLoading('Pages/Stat/Operate'),
            //     name:'stat-invest',
            //     meta:{
            //         alias   :'统计',
            //     }
            // },
            // {
            //     path: 'doctor-list',
            //     component: lazyLoading('Doctor/Doctor'),
            //     name:'doctor-list',
            //     auth: 'user'
            // },
            // {
            //     path: 'doctor-top',
            //     component: lazyLoading('Doctor/Top'),
            //     name:'doctor-top',
            //     auth: 'user'
            // },
            // {
            //     path: 'doctor-edit',
            //     component: lazyLoading('Doctor/Edit'),
            //     name:'doctor-edit',
            //     auth: 'user'
            // },
            // {
            //     path: 'doctor-set',
            //     component: lazyLoading('Doctor/Set'),
            //     name:'doctor-set',
            //     auth: 'user'
            // },
            // {
            //     path: 'doctor-add',
            //     component: lazyLoading('Doctor/Add'),
            //     name:'add',
            //     auth: 'user'
            // },
            // {
            //     path: 'sick',
            //     component: lazyLoading('Sick/Sick'),
            //     name:'sick',
            //     auth: 'user'
            // },
            // {
            //     path: 'order',
            //     component: lazyLoading('Order/Order'),
            //     name:'order',
            //     auth: 'user'
            // },
            // {
            //     path: 'balance',
            //     component: lazyLoading('Balance/Balance'),
            //     name:'balance',
            //     auth: 'user'
            // },
            // {
            //     path: 'jiesuan',
            //     component: lazyLoading('Balance/jiesuan'),
            //     name:'jiesuan',
            //     auth: 'user'
            // },
            // {
            //     path: 'set',
            //     component: lazyLoading('Set/Set'),
            //     name:'set',
            //     auth: 'user'
            // },
            // {
            //     path: 'set-refund',
            //     component: lazyLoading('Set/Refund'),
            //     name:'set-refund',
            //     auth: 'user'
            // },
            // {
            //     path: 'set-balance',
            //     component: lazyLoading('Set/Balance'),
            //     name:'set-balance',
            //     auth: 'user'
            // },
            // {
            //     path: 'set-spread',
            //     component: lazyLoading('Set/Spread'),
            //     name:'set-spread',
            //     auth: 'user'
            // },
            // {
            //     path: 'set-royalty',
            //     component: lazyLoading('Set/Royalty'),
            //     name:'set-royalty',
            //     auth: 'user'
            // },
            // {
            //     path: 'depart',
            //     component: lazyLoading('Set/Depart'),
            //     name:'depart',
            //     auth: 'user'
            // },
            // {
            //     path: 'set-hospital',
            //     component: lazyLoading('Set/Hospital'),
            //     name:'set-hospital',
            //     auth: 'user'
            // },
        // ]
    },
    {
        path: '/login',
        name:'login',
        component: lazyLoading('Com/Login')
    },
    {
        path: '/print',
        name:'print',
        component: lazyLoading('Pages/Print/Index')
    },
    // {
    //     path: '/logout',
    //     name:'logout',
    //     beforeEnter (to, from, next) {
    //         auth.logout()
    //         next('/login')
    //     }
    // },
    { path: '*', component: lazyLoading('Com/Login') }
];




// //定义路由
// var router = new VueRouter({
//     mode: 'hash',
//     routes // （缩写）相当于 routes: routes
// })


export var router = new VueRouter({
    mode: 'hash',
    routes // （缩写）相当于 routes: routes
})