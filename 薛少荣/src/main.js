import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router/router'
import routers from './promission'
import bus from './utils/bus'


Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.prototype.$bus = bus;
new Vue({
  router,
  routers,
  render: h => h(App),
}).$mount('#app')
