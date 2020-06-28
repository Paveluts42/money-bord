import Vue from 'vue'
import Vuelidate from 'vuelidate'

import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/Date.Filter'
import currencyFilter from './filters/Currency.Filter'
import localizeFilter from './filters/localize.filter'
import messagePlug from './utils/message.plugin'
import tooltipDirective from './directives/tooltip.directive'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
import firebase from 'firebase/app'
import Loader from "./components/app/Loader";
import 'firebase/auth'
import 'firebase/database'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'
import titlePlugin from  "./utils/title.plugin"


firebase.initializeApp({
  apiKey: "AIzaSyAjvhMiOS8PKgohpTqdGqpRTmD0cChbsC0",
  authDomain: "money-bord.firebaseapp.com",
  databaseURL: "https://money-bord.firebaseio.com",
  projectId: "money-bord",
  storageBucket: "money-bord.appspot.com",
  messagingSenderId: "991466420440",
  appId: "1:991466420440:web:6e883a5817447665b27fad"
})
let app
firebase.auth().onAuthStateChanged(()=>{
  if (!app){
    app= new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

})
Vue.component('Loader',Loader)
Vue.component('paginate',Paginate)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.use(titlePlugin)

Vue.use(messagePlug)
Vue.directive("tooltipe",tooltipDirective)
Vue.config.productionTip = false
Vue.filter('date',dateFilter)
Vue.filter('localize',localizeFilter)
Vue.filter('currency',currencyFilter)

