<template>
  <div class="tools">
    <h2>{{ title }}</h2>
    <div class="card">
      <stockQuery/>
    </div>
    <div class="card">
      <periodPayment/>
    </div>
    <div class="card">
      <endingBalance/>
    </div>
    <div class="card">
      <emi/>
    </div>
  </div>
</template>

<script>
// third party
import firebase from "firebase/app";
require("firebase/auth");
import _ from "lodash";
// project library
import emi from "../components/emi.vue";
import endingBalance from "../components/endingbalance.vue";
import periodPayment from "../components/periodpayment.vue";
import stockQuery from "../components/stockquery.vue";
//
export default {
  name: "profile",
  components: {
    emi,
    endingBalance,
    periodPayment,
    stockQuery
  },
  data: function () {
    return {
      title: "Financial Tools",
    }
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$store.dispatch("clearProfile");
        this.$router.push("/");
      }
      else {
        if (_.isEmpty(this.personProfile)) {
          this.$store.dispatch("fetchProfile",user)
        }
      }
    })
  },
}
</script>

<style scoped>
</style>
