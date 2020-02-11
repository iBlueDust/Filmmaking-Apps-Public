import Vue from "vue";
import App from "./App.vue";
import router from './router';
import Io from "socket.io-client";
import VueSocketIO from 'vue-socket.io';

import serverLocation from "!raw-loader!@/assets/server-ip.txt";

Vue.config.productionTip = false;

export const Socket = Io(serverLocation, {
    upgrade: false,
    reconnection: true,
    forceNew: false
});

// TODO: Turn off debug during production
Vue.use(new VueSocketIO({ connection: Socket, debug: true }));

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");