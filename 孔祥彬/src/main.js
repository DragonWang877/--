import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './permission'
import store from "./store";
import bus from "./uitls/bus";

Vue.config.productionTip = false

Vue.use(ElementUI);

// 全局注册组件
Vue.component("AlterDialog", () =>
  import("./components/alterDialog")
);

Vue.prototype.$bus = bus;

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
