import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/boot/:id',
        name: 'boot',
        props: route => ({ id: route.params.id }),
        component: () =>
            import ('@/views/Boot.vue'),
    },
    {
        path: '/profile/:id',
        name: 'profile',
        props: (route) => ({ id: route.params.id, }),
        component: () =>
            import ('@/views/Profile.vue')
    },
]

export default new VueRouter({
    routes
})