import Vue from "vue"
import Router from "vue-router"
import About from "./views/About.vue"
import Home from "./views/Home.vue"
import NetValue from "./views/NetValue.vue"
import Profile from "./views/Profile.vue"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/netvalue",
      name: "netvalue",
      component: NetValue
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/about",
      name: "about",
      component: About
    }
  ]
})
