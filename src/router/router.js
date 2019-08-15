import Vue from 'vue'


import VueRouter from 'vue-router'
Vue.use(VueRouter)


import login from '../components/login.vue'
import index from '../components/index.vue'
import users from '../components/userlist.vue'

const routes = [
    { path: '/login', component: login },
    { path: '', redirect: 'login' },
    {
        path: '/index', component: index, children: [
            {path:'users',component:users}
        ]
    },
]

const router = new VueRouter({
    routes
})
// 导航守卫,在进入页面时判断有没有登录
router.beforeEach((to, from, next) => {
    // 判断要进入的是不是首页, != -1 就是要进入
    if (to.path.indexOf('index') != -1) {
        // 从本地存储中判断有没有  token 
        if (window.localStorage.getItem('token')) {
            next()
        } else {
            // 没有 token,跳回登录页
            // this.$message 只能在 vue 文件中使用,在js文件中 this 的指向是window,所以用 Vue. 的实例对象来使用
            Vue.prototype.$message.error('请先登录！')
            router.push('/login')
        }
    } else {
        next()
    }
})

export default router