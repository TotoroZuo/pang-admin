import Vue from 'vue'
// import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router/'
import store from './store/sideOuter/'
import 'element-ui/lib/theme-chalk/index.css'
import apis from '@/apis/'

// Vue.use(ElementUI)
Vue.use(apis) // 安装接口

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
