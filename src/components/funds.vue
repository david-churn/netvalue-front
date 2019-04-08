<template>
  <div class="funds">
    <h3>{{title}}</h3>
    <div class="row">
      <div class="col-amount">Balance</div>
      <div class="flex1">Shares</div>
      <div class="flex1">Price</div>
      <div class="flex1">Symbol</div>
      <div class="flex1">Description</div>
      <div class="flex1">Annual Dividends</div>
    </div>
    <div class="row"
      v-for="(asset,index) in allFunds" :key="index">
      <div class="col-amount"><input v-model="asset.amount" type="number" step=".01" class="amt"></div>
      <div class="flex1"><input v-model="asset.shares" type="number" step=".000001" class="amt"></div>
      <div class="flex1">{{ asset.price ? asset.price.toDecFormat(2) : Number(0).toFixed(2) }}</div>
      <div class="flex1"><input v-model="asset.symbol" type="text"></div>
      <div class="flex1"><input v-model="asset.description" type="text"></div>
      <div class="flex1"><input v-model="asset.payment" type="number" step=".01" class="amt"></div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'funds',
  data: function () {
    return {
      title: 'Funds',
    }
  },
  computed: mapGetters(['allFunds'])
}
</script>

<style lang="css" scoped>
</style>
