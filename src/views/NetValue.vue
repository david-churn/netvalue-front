<template>
  <div class="netvalue">
    <h2 class="row">
      <div class="col-amount">{{ totalAmt }}</div>
      <div class="flex10">Net Value</div>
    </h2>
    <div class="row">
      <div class="flex11">
        <button type="button">Save</button>
      </div>
      <div class="flex1">
        <button type="button">Reset</button>
      </div>
    </div>
    <h2 class="row">
      <div class="col-amount">{{ subtotalAssetsAmt }}</div>
      <div class="flex10">Assets</div>
    </h2>
    <aSavings/>
    <aFunds/>
    <aStocks/>
    <aBonds/>
    <aOthers/>
    <h2 class="row">
      <div class="col-amount">{{ subtotalDebtsAmt }}</div>
      <div class="flex10">Debts</div>
    </h2>
    <dLoans/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import aBonds from '../components/bonds.vue';
import aFunds from '../components/funds.vue';
import aOthers from '../components/others.vue';
import aSavings from '../components/savings.vue';
import aStocks from '../components/stocks.vue';
import dLoans from '../components/loans.vue';

export default {
  name: 'NetValue',
  components: {
    aSavings,
    aBonds,
    aStocks,
    aFunds,
    aOthers,
    dLoans
  },

  data: function () {
    return {
      totalAssets: 0,
      totalDebts: 0
    }
  },
  computed: {
    subtotalAssetsAmt: function () {
      return this.activeAssets
        .map(asset => Number.isFinite(Number(asset.amount)) ? Number(asset.amount) : 0)
        .reduce((total, amount) => total + amount)
        .toDecFormat(2);
    },
    subtotalDebtsAmt: function () {
      return this.activeDebts
        .map(asset => Number.isFinite(Number(asset.amount)) ? Number(asset.amount) : 0)
        .reduce((total, amount) => total + amount)
        .toDecFormat(2);
    },
    totalAmt: function () {
      return Number(this.totalAssets - this.totalDebts).toDecFormat(2);
    },
    ...mapGetters(['activeAssets', 'activeDebts'])
  }
}

</script>

<style scoped>

</style>
