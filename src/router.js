import Vue from "vue"
import Router from "vue-router"
import Home from "./views/Home.vue"
import NetValue from "./views/NetValue.vue"
import Profile from "./views/Profile.vue"
import Tools from "./views/Tools.vue"

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
      path: "/tools",
      name: "tools",
      component: Tools
    }
  ]
})
