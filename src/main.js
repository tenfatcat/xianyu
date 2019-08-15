import Vue from 'vue'
import App from './App.vue'

import './assets/css/base.less'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)


import router from './router/router.js'

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
