<template>
  <div class="tools">
    <h1>{{ title }}</h1>
    <div class="card">
      <stockQuery/>
    </div>
  </div>
</template>

<script>
// third party
import firebase from "firebase";
import _ from "lodash";
// project library
import calculations from "../utils/calculations";
import stockQuery from "../components/stockquery.vue";
//
export default {
  name: "profile",
  components: {
    calculations,
    stockQuery
  },
  data: function () {
    return {
      title: "Tools",
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
.card {
  background: $whitish;
  border: solid 1px black;
  margin: 1%;
  padding: 1%;
}
</style>
