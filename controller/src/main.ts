import Vue from 'vue';
import App from './App.vue';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import VModal from 'vue-js-modal';

Vue.use(VModal, { dynamic: true, transition: 'fade' });

const socket = io('http://localhost:5000/controller');

Vue.use(VueSocketIOExt, socket);

Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
}).$mount('#app');
