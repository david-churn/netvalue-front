<template>
  <div class="endingbalance">
    <h2>{{ title }}</h2>
    <p>Calculate how long it will take to achieve a desired balance and interest earned from monthly deposits to a starting balance at a fixed interest rate.  Assumes monthly interest compounding.</p>
    <p>To model a loan, use a negative starting balance with a desired balance of zero.</p>
    <p>The calculation has a limit of 100 years.</p>
    <div class="row">
      <div class="flex2 right">
        <div>Starting Balance:</div>
        <div>Monthly Payment:</div>
        <div>Annual Interest Rate:</div>
        <div>Desired Balance:</div>
        <div>&gt;&gt;&gt;</div>
        <div>Ending Balance:</div>
        <div>Earnings:</div>
        <div>Months:</div>
      </div>
      <div class="flex2">
        <input type="number" step=".01" class="amt" v-model="principleAmt">
        <input type="number" step=".01" class="amt" v-model="paymentAmt">
        <input type="number" step=".01" class="amt" v-model="APR">%
        <input type="number" step=".01" class="amt" v-model="resultAmt">
        <button type="button"           @click="calculateIt">calculate</button>
        <div>{{ balanceAmt.toDecFormat(2,3,sepPt,decPt)}}</div>
        <div>{{ earningAmt.toDecFormat(2,3,sepPt,decPt)}}</div>
        <div>{{ periodQty.toDecFormat(0,3,sepPt) }}</div>
      </div>
    </div>
    <p class="small">Results are estimates for planning.  Assumes monthly compound interest for monthly payments.</p>
  </div>
</template>

<script>
export default {
  name: "endingbalance",
  data: function () {
    return {
      APR: 0,
      balanceAmt: 0,
      earningAmt: 0,
      paymentAmt: 0,
      periodQty: 0,
      principleAmt: 0,
      resultAmt: 0,
      title: "Desired Balance",
    }
  },
  computed: {
    decPt: function() {
      return this.$store.state.profileObj.decimalStr;
    },
    sepPt: function() {
      return this.$store.state.profileObj.separatorStr;
    }
  },
  methods: {
    calculateIt() {
      let b = Math.round(this.principleAmt * 100) / 100;
      let p = Math.round(this.paymentAmt * 100) / 100;
      let rt = this.APR/1200;
      let tEarn = 0;
      let periods = 0;
      while (b < this.resultAmt && periods < 1200) {
        let pEarn = Math.round(b * rt * 100) / 100;
        tEarn += pEarn;
        b += (p + pEarn);
        periods++;
      }
      this.balanceAmt = b;
      this.earningAmt = tEarn;
      this.periodQty = periods;
      return;
    }
  }
}
</script>

<style lang="css" scoped>
input {
  max-width: 90%;
}
p {
  margin: 5%;
}
.small {
  font-size: 0.6em;
}
</style>
