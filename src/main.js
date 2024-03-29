import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueChatScroll from 'vue-chat-scroll'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/loading.css'
import './assets/css/loading-btn.css'

Vue.config.productionTip = false

Vue.use(VueChatScroll)
Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
