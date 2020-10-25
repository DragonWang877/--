
import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。

// <!-- 使用 router-link 组件来导航. -->
// <!-- 通过传入 `to` 属性指定链接. -->
// <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
// <router-link to="/home">Go to Foo</router-link>
// <router-link to="/login">Go to Bar</router-link>

//name是在跳转路径的时候
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/page/home/index.vue'),

        children: [
            {
                // 当 /singleAnalysis 匹配成功，
                // singleAnalysis 会被渲染在 Home 的 <router-view> 中
                path: '/singleAnalysis',
                name: '/singleAnalysis',
                component: () => import('@/page/singleAnalysis/index.vue')
            },
            {
                // 当 /teacherManagement 匹配成功
                // teacherManagement 会被渲染在 Home 的 <router-view> 中
                path: '/teacherManagement',
                name: '/teacherManagement',
                component: () => import('@/page/teacherManagement/index.vue')
            },
            {
                // 当 applicationManagement 匹配成功
                // applicationManagement 会被渲染在 Home 的 <router-view> 中
                path: '/applicationManagement',
                name: '/applicationManagement',
                component: () => import('@/page/applicationManagement/index.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'logins',
        component: () => import('@/page/login/index.vue')
    }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
//hash 会在路径后面加一个/#
//而history不会

/*
vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。
如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。
vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。
不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404，这就不好看了。
所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。
*/
const router = new VueRouter({
    mode: "history",
    routes // (缩写) 相当于 routes: routes
})





export default router


