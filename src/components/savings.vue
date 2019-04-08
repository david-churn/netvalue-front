<template lang="html">
  <div class="savings">
    <h3 class="row">
      <div class="col-amount">{{ subtotal.toDecFormat(2) }}</div>
      <div class="flex10">{{ title }}</div></h3>
    <div class="row">
      <div class="col-amount">Balance</div>
      <div class="flex6">Description</div>
      <div class="flex1">APR</div>
      <div class="flex3">Monthly Contribution</div>
    </div>
    <div class="row"
      v-for="(asset,index) in allSavings" :key="index">
      <div class="col-amount"><input v-model="asset.amount" type="number" step=".01" class="amt"></div>
      <div class="flex6"><input v-model="asset.description" type="text"></div>
      <div class="flex1"><input v-model="asset.apr" type="number" step=".0001" class="amt"></div>
      <div class="flex3"><input v-model="asset.payment" type="number" step=".01" class="amt"></div>
    </div>
    <div class="row">
      <button type="button" @click="addRow">Add Savings Account</button>
      <button type="button" @click="allSavings">Reset Savings</button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'savings',
  data: function () {
    return {
      title: 'Savings and Checking',
      subtotal: 20200,
    }
  },
  computed: {
    subtotalAmt: function () {
      return -1
    },
    ...mapGetters(['allSavings'])
  },
  methods: {
    addRow() {
      let newSavings = {
        type: 'saving',
        amount: 0,
        description: 'Savings',
        apr: 0,
        payment: 0
      };
      this.$store.dispatch('insertAsset', newSavings);
    }
  }
}
</script>

<style lang="css" scoped>
</style>
