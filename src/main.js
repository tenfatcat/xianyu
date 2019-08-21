import Vue from 'vue'
import App from './App.vue'

import './assets/css/base.less'
import breadnav from './components/breadnav.vue'
Vue.component("breadnav", breadnav)
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)


import router from './router/router.js'

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
