import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VModal from 'vue-js-modal';
import VueSocketIOExt from 'vue-socket.io-extended';
import Io from 'socket.io-client';
import UrlJoin from 'url-join';

import serverLocation from '!raw-loader!@/assets/server-ip.txt';

Vue.config.productionTip = false;

const location = UrlJoin(serverLocation, '/projector')
console.log('IP:', location);

// Socket.IO
// TODO: Turn off debug during production
const socket = Io(location, { debug: true });

Vue.use(VueSocketIOExt, socket);
Vue.use(VModal, {
    dynamic: true,
    transition: 'fade',
});

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');