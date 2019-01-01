import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
import api from '@/utils/api'
import SERVER from '@/utils/api/config'
import install from '@/utils/install'
// import swal from 'sweetalert'
import 'normalize.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/index.scss'


Vue.use(install);
Vue.prototype.$api = api;
Vue.prototype.$SERVER = SERVER;
Vue.use(ElementUI);
// Vue.prototype.$swal = swal;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
