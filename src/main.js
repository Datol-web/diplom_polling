import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import Vuelidate from 'vuelidate'
import  'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'

import moment from 'moment'

Vue.prototype.moment = moment

Vue.config.productionTip = false

Vue.use(Vuelidate);

// конфиг фаербейза
var firebaseConfig = {
  apiKey: "AIzaSyCEPRezeEcG2yM9QH6g_M2zm-D7CiJ4h1c",
  authDomain: "green-atom.firebaseapp.com",
  databaseURL: "https://green-atom-default-rtdb.firebaseio.com/",
  projectId: "green-atom",
  storageBucket: "green-atom.appspot.com",
  messagingSenderId: "241293828309",
  appId: "1:241293828309:web:d5140ed2b34d7a8c64425c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app

//защита роутов, до авторизации другие роуты не доступны
firebase.auth().onAuthStateChanged(()=> {
  if(!app) {
    app = new Vue({
      render: h => h(App),
      router,
      store
    }).$mount('#app')
  }
});