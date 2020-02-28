import Vue from 'vue';
import App from './App.vue';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import VModal from 'vue-js-modal';

import serverLocation from '!raw-loader!@/assets/server-ip.txt';

Vue.use(VModal, { dynamic: true, transition: 'fade' });

console.log(serverLocation);
const socket = io(serverLocation);

Vue.use(VueSocketIOExt, socket);

Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
}).$mount('#app');
