import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {db} from "./firebase";
import router from "./router";
import {auth} from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

let app;
library.add(faGoogle)

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);
    app.use(router); 
    app.component('font-awesome-icon', FontAwesomeIcon)
    app.mount("#app");
  }
});
