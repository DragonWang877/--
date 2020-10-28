import Vue from 'vue';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './permission'
import bus from "@/utils/bus";
import store from "@/store/index"


//bus挂在vue的实例下
Vue.prototype.$bus = bus;

//使用elementui
Vue.use(ElementUI);

//使用vue路由
Vue.use(VueRouter)

Vue.config.productionTip = false;


//注册全局组件
Vue.component('AnmendInfo',()=>import('./components/amendInfo.vue'))

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
