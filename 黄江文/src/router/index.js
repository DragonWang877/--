import Vue from "vue";
import VueRouter from "vue-router";
// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
Vue.use(VueRouter);

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  {
    id: '/',
    path: '/',
    name: 'Home', component: () => import('@/views/home/index.vue'),
    children: [
      {
        id: '/once',
        path: "once",
        name: "once",
        component: () => import('@/views/once/index.vue'),
        children: [
          {
            id: '/analyse',
            path: "analyse",
            name: "analyse",
            component: () => import('@/views/analyse/index.vue'),
          }
        ]
      },
      {
        id: '/teacherAdimin',
        path: "teacherAdimin",
        name: "teacherAdimin",
        component: () => import('@/views/teacherAdimin/index.vue')
      },
      {
        id: '/applicationAdmin',
        path: "applicationAdmin",
        name: "applicationAdmin",
        component: () => import('@/views/applicationAdmin/index.vue')
      },
      {
        id: '/mean',
        path: 'mean',
        name: 'mean',
        component: () => import('@/views/mean/index.vue')
      }
    ]
  },
  { id: '/login', path: '/login', name: 'Login', component: () => import('@/views/login/index.vue') },
  { id: '*', path: '*', name: '404', component: () => import('@/views/404/index.vue') }
]


// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  mode: "history",
  routes // (缩写) 相当于 routes: routes
})


export default router;
