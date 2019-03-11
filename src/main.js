import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import * as firebase from "firebase";
import jQuery from "jquery";
import "popper.js";
import "bootstrap";
import "./assets/app.scss";
import * as firebaseConfig from "../.env";

Vue.config.productionTip = false;

window.$ = window.jQuery = jQuery;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp(firebaseConfig);
  }
}).$mount("#app");
