<template>
  <div class="netvalue">
    <h2>{{ title}}</h2>
    <div class="card">
      <div class="row">
        <div class="flex1 right">{{ subtotalAssetsAmt }}</div>
        <div class="flex1 left">Assets</div>
      </div>
      <div class="row">
        <div class="flex1 right">{{ subtotalDebtsAmt }}</div>
        <div class="flex1 left">Debts</div>
      </div>
      <hr>
      <div class="row">
        <div class="flex1 right">{{ totalAmt }}</div>
        <div class="flex1 left">Total Net Value</div>
      </div>
      <div class="row">
        <div class="flex1">
          <button type="button"
            @click="saveNetValue">Save</button>
        </div>
        <div class="flex1 right">
          <button type="button"
            @click="resetNetValue">Reset</button>
        </div>
      </div>
    </div>
    <h2>Assets</h2>
    <div class="card">
      <aSavings/>
    </div>
    <div class="card">
      <aStocks/>
    </div>
    <div class="card">
      <aOthers/>
    </div>
    <h2>Debts</h2>
    <div class="card">
      <dLoans/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import {mapGetters} from "vuex";
// third party
import firebase from "firebase/app";
require("firebase/auth");
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
      errorToast: {
        position: 'top-center',
        duration: 5000,
        fullWidth: true,
        fitToScren: true,
        type: 'error'
      },
      successToast: {
        position: 'top-center',
        duration: 2000,
        type: 'success',
        theme: 'bubble'
      }
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
    decPt: function() {
      return this.$store.state.profileObj.decimalStr;
    },
    sepPt: function() {
      return this.$store.state.profileObj.separatorStr;
    },
    subtotalAssetsAmt: function () {
      return this.activeAssets
        .map(asset => Number.isFinite(Number(asset.amount)) ? Number(asset.amount) : 0)
        .reduce((total, amount) => total + amount, 0)
        .toDecFormat(2,3,this.sepPt,this.decPt);
    },
    subtotalDebtsAmt: function () {
      return this.activeDebts
        .map(asset => Number.isFinite(Number(asset.amount)) ? Number(asset.amount) : 0)
        .reduce((total, amount) => total + amount, 0)
        .toDecFormat(2,3,this.sepPt,this.decPt);
    },
    totalAmt: function () {
      return Number(
          this.activeAssets
            .map(asset => Number.isFinite(Number(asset.amount)) ? Number(asset.amount) : 0)
            .reduce((total, amount) => total + amount, 0)
        - this.activeDebts
            .map(asset => Number.isFinite(Number(asset.amount)) ? Number(asset.amount) : 0)
            .reduce((total, amount) => total + amount, 0)
        ).toDecFormat(2,3,this.sepPt,this.decPt);
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
      Vue.toasted.show('Saving', this.successToast);
    },
    resetNetValue () {
      this.$store.dispatch("readNetValue");
      Vue.toasted.show('Reading', this.successToast);
    }
  }
}

</script>

<style scoped>
</style>
