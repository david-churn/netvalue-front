<template>
  <div class="netvalue">
    <h2>{{ totalAmt.toDecFormat(2) }} Net Value </h2>
    <button type="button">save work</button>
    <button type="button">reset to saved</button>
    <h2>{{ assetAmt.toDecFormat(2) }} Assets</h2>
    <aSavings/>
    <aFunds/>
    <aStocks/>
    <aBonds/>
    <aOthers/>
    <h2>{{ debtAmt.toDecFormat(2) }} Debts</h2>
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
      totalAmt: 0.89,
      assetAmt: 1234567890.12,
      debtAmt: 0
    }
  },
  computed: mapGetters([
    'allAssets', 'allDebts'])
}

</script>

<style scoped>

</style>
