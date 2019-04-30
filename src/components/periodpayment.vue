<template>
  <div class="periodpayment">
    <h2>{{ title }}</h2>
    <p>Calculate the total money and interest earned resulting from monthly deposits to a starting balance at a fixed interest rate.  Assumes monthly interest compounding.</p>
    <div class="row">
      <div class="flex2 right">
        <div>Starting Balance:</div>
        <div>Monthly Payment:</div>
        <div>Annual Interest Rate:</div>
        <div>Months:</div>
        <div>&gt;&gt;&gt;</div>
        <div>Ending Balance:</div>
        <div>Earnings:</div>
      </div>
      <div class="flex2">
        <input type="number" step=".01" class="amt"
            v-model="principleAmt">
        <input type="number" step=".01" class="amt"
          v-model="paymentAmt">
        <input type="number" step=".01" class="amt" v-model="APR">%
        <input type="number" class="amt"
          v-model="periodQty">
        <button type="button"
          @click="calculateIt">calculate
        </button>
        <div>{{ balanceAmt.toDecFormat(2,3,this.sepPt,this.decPt)}}</div>
        <div class="flex10">{{ earningAmt.toDecFormat(2,3,this.sepPt,this.decPt)}}</div>
      </div>
    </div>
    <p class="small">Results are estimates for planning.  Assumes monthly compound interest for monthly payments.</p>
  </div>
</template>

<script>
export default {
  name: "periodpayment",
  data: function () {
    return {
      APR: 0,
      balanceAmt: 0,
      earningAmt: 0,
      paymentAmt: 0,
      periodQty: 0,
      principleAmt: 0,
      title: "Periodic Payments",
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
      for (let q = 0; q < this.periodQty; q++) {
        let pEarn = Math.round(b * rt * 100) / 100;
        tEarn += pEarn;
        b += (p + pEarn);
      }
      this.balanceAmt = b;
      this.earningAmt = tEarn;
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
