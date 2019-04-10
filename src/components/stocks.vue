<template>
  <div class="stocks">
    <h3 class="row">
      <div class="col-amount">{{ subtotalAmt }}</div>
      <div class="flex10">{{ title }}</div>
    </h3>
    <div class="row">
      <div class="col-amount">Balance</div>
      <div class="col-amount">Shares</div>
      <div class="flex1">Symbol</div>
      <div class="flex4">Description</div>
      <div class="col-amount">Annual Dividends</div>
      <div class="flex1">Action</div>
    </div>
    <div class="row">
      <div class="flex2"></div>
      <div class="col-amount">Price</div>
      <div class="flex8">Company Name</div>
    </div>
    <div
      v-for="(asset,index) in stocksAssets" :key="index">
      <div class="row">
        <div class="col-amount">{{ asset.shares * lookup.price }}</div>
        <div class="col-amount">
          <input type="number" step=".000001" class="amt"
            :value="asset.shares"
            @focusout="updateRow($event,asset,'shares')">
        </div>
        <div class="flex1">
          <input type="text"
            :value="asset.symbol"
            @focusout="updateRow($event,asset,'symbol')">
        </div>
        <div class="flex4">
          <input type="text"
             :value="asset.description"
             @focusout="updateRow($event,asset,'description')">
        </div>
        <div class="col-amount">
          <input type="number" step=".01" class="amt"
            :value="asset.payment"
            @focusout="updateRow($event,asset,'payment')">
        </div>
      </div>
      <div class="row">
        <div class="flex2"></div>
        <div class="col-amount">{{ asset.price ? asset.price.toDecFormat(2) : Number(0).toFixed(2) }}</div>
        <div class="flex8">{{ asset.company }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'stocks',
  data: function () {
    return {
      title: 'Stocks',
    }
  },
  computed: mapGetters(['allStocks'])
}
</script>

<style lang="css" scoped>
</style>
