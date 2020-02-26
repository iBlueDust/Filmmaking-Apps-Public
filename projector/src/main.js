import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueSocketIOExt from 'vue-socket.io-extended';
import Io from 'socket.io-client';

import serverLocation from '!raw-loader!@/assets/server-ip.txt';

Vue.config.productionTip = false;

console.log('IP:', serverLocation);

// Socket.IO
// TODO: Turn off debug during production
const socket = Io(serverLocation, { debug: true });

Vue.use(VueSocketIOExt, socket);

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');