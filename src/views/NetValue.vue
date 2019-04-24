<template>
  <div class="netvalue">
    <h2 class="row">
      <div class="col-amount">{{ totalAmt }}</div>
      <div class="flex10">{{ title }}</div>
    </h2>
    <div class="row">
      <div class="flex11">
        <button type="button"
          @click="saveNetValue">Save</button>
      </div>
      <div class="flex1">
        <button type="button"
          @click="resetNetValue">Reset</button>
      </div>
    </div>
    <h2 class="row">
      <div class="col-amount">{{ subtotalAssetsAmt }}</div>
      <div class="flex10">Assets</div>
    </h2>
    <div class="card">
      <aSavings/>
    </div>
    <div class="card">
      <aStocks/>
    </div>
    <div class="card">
      <aOthers/>
    </div>
    <h2 class="row">
      <div class="col-amount">{{ subtotalDebtsAmt }}</div>
      <div class="flex10">Debts</div>
    </h2>
    <div class="card">
      <dLoans/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
// third party
import firebase from "firebase";
import _ from "lodash";

// components
import aOthers from "../components/others.vue";
import aSavings from "../components/savings.vue";
import aStocks from "../components/stocks.vue";
import dLoans from "../components/loans.vue";

export default {
  name: "NetValue",
  components: {
    aSavings,
    aStocks,
    aOthers,
    dLoans
  },
  data: function () {
    return {
      title: "Net Value",
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
          this.$store.dispatch("fetchProfile",user);
        }
      }
    })
  },
  computed: {
    subtotalAssetsAmt: function () {
      return this.activeAssets
        .map(asset => Number.isFinite(Number(asset.amount)) ? Number(asset.amount) : 0)
        .reduce((total, amount) => total + amount, 0)
        .toDecFormat(2);
    },
    subtotalDebtsAmt: function () {
      return this.activeDebts
        .map(asset => Number.isFinite(Number(asset.amount)) ? Number(asset.amount) : 0)
        .reduce((total, amount) => total + amount, 0)
        .toDecFormat(2);
    },
    totalAmt: function () {
      return Number(
          this.activeAssets
            .map(asset => Number.isFinite(Number(asset.amount)) ? Number(asset.amount) : 0)
            .reduce((total, amount) => total + amount, 0)
        - this.activeDebts
            .map(asset => Number.isFinite(Number(asset.amount)) ? Number(asset.amount) : 0)
            .reduce((total, amount) => total + amount, 0)
        ).toDecFormat(2);
    },
    ...mapGetters([
      "activeAssets",
      "activeDebts",
      "personProfile"
    ])
  },
  methods: {
    saveNetValue () {
      this.$store.dispatch("saveNetValue");
    },
    resetNetValue () {
      this.$store.dispatch("readNetValue");
    }
  }
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
