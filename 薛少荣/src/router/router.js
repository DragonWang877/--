import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        // redirect:'/ASingleAnalysis',
        children: [{
                path: '/ASingleAnalysis',
                name: 'ASingleAnalysis',
                component: () => import('@/views/ASingleAnalysis/index.vue'),
            },
            {
                path: '/teacher',
                name: 'teacher',
                component: () => import('@/views/teacher/index.vue')
            },
            {
                path: '/applyfor',
                name: 'applyfor',
                component: () => import('@/views/applyfor/index.vue')
            },
            {
                path: '/add',
                name: 'add',
                component: () => import('@/views/add/index.vue')
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue')
    },
    // {
    //     path: '*',
    //     name: '404',
    //     component: () => import('@/views/not/not.vue')
    // }
]


const router = new VueRouter({
    mode: "history",
    routes
})

export default router