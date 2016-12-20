/**
 * Created by lifetea on 2016/12/16.
 * email: 494886251@qq.com
 * github: https://github.com/lifetea
 */

//lazy load
const lazyLoading = (name, index = false) => () => System.import(`../view/${name}${index ? '/index' : ''}.vue`)

//布局


const routes = [
    { path: '', component: lazyLoading('Layout'),
        children: [

        ]
    },
    {
        path: '/login',
        name:'login',
        component: lazyLoading('Login')
    },
];

export default routes;