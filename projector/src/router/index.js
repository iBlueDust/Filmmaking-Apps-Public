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
        props: route => ({ autoPlay: route.query.auto }),
        component: () =>
            import ('@/views/Boot.vue'),
    },
    {
        path: '/profile',
        name: 'profile',
        props: route => ({ interval: route.query.interval }),
        component: () =>
            import ('@/views/Profile.vue'),
    },
    {
        path: '/profile/single',
        name: 'profile.single',
        props: route => ({ profileId: route.query.id }),
        component: () =>
            import ('@/views/SingleProfile.vue'),
    },
    {
        path: '/blank',
        name: 'blank',
        component: () =>
            import ('@/views/Blank.vue'),
    },
    {
        path: '/medical',
        name: 'medical',
        component: () =>
            import ('@/views/Medical.vue'),
    },
];

export default new VueRouter({
    routes,
});