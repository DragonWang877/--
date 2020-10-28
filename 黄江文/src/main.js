import Vue from 'vue'
import App from './App.vue'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./utils/permission.js";
import bus from './utils/bus.js';

Vue.use(ElementUI)
Vue.config.productionTip = false;

// 全局注册插件
Vue.component("FormDialog", () => import('./components/formDialog.vue'));

Vue.prototype.$bus = bus;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
