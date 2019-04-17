import Vue from "vue"
import Router from "vue-router"
import About from "./views/About.vue"
import FutureValue from "./views/FutureValue.vue"
import Home from "./views/Home.vue"
import NetValue from "./views/NetValue.vue"
import Profile from "./views/Profile.vue"
import StockMarket from "./views/StockMarket.vue"
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
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/futurevalue",
      name: "futurevalue",
      component: FutureValue
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
      path: "/stockmarket",
      name: "stockmarket",
      component: StockMarket
    },
    {
      path: "/tools",
      name: "tools",
      component: Tools
    }
  ]
})
