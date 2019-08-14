import Vue from 'vue'
import App from './App.vue'

import './assets/css/base.less'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import login from './components/login.vue'
import index from './components/index.vue'

const routes = [
  {path:'/login',component:login},
  {path:'/index',component:index},
]

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
