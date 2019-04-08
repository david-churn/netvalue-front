<template>
  <div class="loans">
    <h3>{{title}}</h3>
    <div class="row">
      <div class="col-amount">Balance</div>
      <div class="flex1">Description</div>
      <div class="flex1">Annual Percentage Rate</div>
      <div class="flex1">Monthly Payment</div>
    </div>
    <div class="row"
      v-for="(asset,index) in allDebts" :key="index">
      <div class="col-amount"><input v-model="asset.amount" type="number" step=".01" class="amt"></div>
      <div class="flex1"><input v-model="asset.description" type="text"></div>
      <div class="flex1"><input v-model="asset.apr" type="number" step=".0001" class="amt"></div>
      <div class="flex1"><input v-model="asset.payment" type="number" step=".01" class="amt"></div>
    </div>
  </div>

</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'loans',
  data: function () {
    return {
      title: 'Loans',
    }
  },
  computed: mapGetters(['allDebts'])
}
</script>

<style lang="css" scoped>
</style>
