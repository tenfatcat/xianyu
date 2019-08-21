import Vue from 'vue'
import {menus} from '../api/axios'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import login from '../components/login.vue'
import index from '../components/index.vue'
import users from '../components/userlist.vue'
import orders from '../components/orders.vue'
import goods from '../components/goods.vue'
import rights from '../components/rights.vue'
import roles from '../components/roles.vue'
import params from '../components/params.vue'
import categories from '../components/categories.vue'
import reports from '../components/reports.vue'

const routes = [
    { path: '/login', component: login },
    { path: '', redirect: 'login' },
    {
        path: '/index', component: index, children: [
            //  meta: { requiresAuth: true } 路由元信息,给页面添加一个自定义的meta信息,交由导航守卫判断是否可以无登录进入
            {path:'/users',component:users, meta: { requiresAuth: true }},
            {path:'/orders',component:orders, meta: { requiresAuth: true }},
            {path:'/rights',component:rights, meta: { requiresAuth: true }},
            {path:'/goods',component:goods, meta: { requiresAuth: true }},
            {path:'/params',component:params, meta: { requiresAuth: true }},
            {path:'/reports',component:reports, meta: { requiresAuth: true }},
            {path:'/roles',component:roles, meta: { requiresAuth: true }},
            {path:'/categories',component:categories, meta: { requiresAuth: true }}
        ]
    },
]

const router = new VueRouter({
    routes
})
// 导航守卫,在进入页面时判断有没有登录
router.beforeEach((to, from, next) => {
    // 判断有没有设置  meta: { requiresAuth: true }  ,有的就需要登录
    if (to.meta.requiresAuth) {
        // 随便发一个请求,让服务器判断 token 是否有效
        menus().then(qwe=>{
            if(qwe.data.meta.status == 400 && qwe.data.meta.msg == "无效token"){
                Vue.prototype.$message.error('请先登录')
                router.push('/login')
            }else{
                next()
            }
        })
        
    } else {
       next()
    }
})

export default router