import Vue from "vue";
import App from "./App.vue";
import firebase from 'firebase/app';
import 'firebase/firestore';
import router from './router'

Vue.config.productionTip = false;

firebase.initializeApp({
    apiKey: "AIzaSyB39IG8U7IKlfDEps3kkEZBmFQVANYbtLw",
    authDomain: "sqzr-8e063.firebaseapp.com",
    databaseURL: "https://sqzr-8e063.firebaseio.com",
    projectId: "sqzr-8e063",
    storageBucket: "sqzr-8e063.appspot.com",
    messagingSenderId: "131120108041",
    appId: "1:131120108041:web:69ff7a081ff6887d8f1ed8"
})

export const db = firebase.firestore();

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");