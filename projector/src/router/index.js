import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/boot',
        name: 'boot',
        component: () =>
            import ('@/views/Boot.vue'),
    },
    {
        path: '/profile',
        name: 'profile',
        component: () =>
            import ('@/views/Profile.vue'),
    },
];

export default new VueRouter({
    routes,
});