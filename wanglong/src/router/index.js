import VueRouter from 'vue-router';
// import login from '@/page/login/index';
// import home from '@/page/home/index';
// import err from '@/page/err/index';
// import apply from '@/page/apply/index';
// import teacher from '@/page/apply/index';

// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
// const Loginpage = Login;
// const Homepage = Home;
// const Errpage = Err;

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
// name在跳转的时候有用
const routes = [
  { path: '/',name:'home', component: () => import('@/page/home/index') ,
  children: [
    {
      path: '/once',
      component:  () => import('@/page/onceAnalyze/index')
    },
    {
      path: '/teacher',
      component: () => import('@/page/teacher/index')
    },
    {
      path: '/apply',
      component: () => import('@/page/apply/index')
    }
  ]
},
  { path:'/login',name:'login',component:() => import('@/page/login/index')},
  { path:'*',name:'err',component:() => import('@/page/err/index')},
]




// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes,// (缩写) 相当于 routes: routes
  mode: 'history',
})



export default router