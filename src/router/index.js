import { createRouter, createWebHistory } from "vue-router";
import Events from "../views/Events.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import HomePage from "../views/HomePage.vue";

const routes = [
  { path: "/login", name: "Login", component: Login },
  { path: "/signup", name: "Signup", component: Signup },
  { path: "/events", name: "Events", component: Events },
  { path: "/", name: "Home", component: HomePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
