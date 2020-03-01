import Vue from 'vue';
import App from './App.vue';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import VModal from 'vue-js-modal';
import UrlJoin from 'url-join';

export const serverLocation = 'http://192.168.0.15:5000/';

Vue.use(VModal, { dynamic: true, transition: 'fade' });

const location = UrlJoin(serverLocation, '/controller');
console.log(location);
const socket = io(location);

Vue.use(VueSocketIOExt, socket);

Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
}).$mount('#app');
