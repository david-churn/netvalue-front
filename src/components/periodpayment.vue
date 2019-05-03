<template>
  <div class="periodpayment">
    <h3>{{ title }}</h3>
    <p>Calculate the total money and interest earned resulting from monthly deposits to a starting balance at a fixed interest rate.  Assumes monthly interest compounding.</p>
    <hr>
    <div class="row">
      <div class="flex1 right">
        <div class="in-text">Starting Balance:</div>
        <div class="in-text">Monthly Payment:</div>
        <div class="in-text">Annual Interest Rate:</div>
        <div class="in-text">Months:</div>
        <div class="in-text">&gt;&gt;&gt;</div>
        <div>Ending Balance:</div>
        <div>Earnings:</div>
      </div>
      <div class="flex1">
        <div>
          <input type="number" step=".01" class="right" v-model="principleAmt">
        </div>
        <div>
          <input type="number" step=".01" class="right" v-model="paymentAmt">
        </div>
        <div>
          <input type="number" step=".01" class="right" v-model="APR">%
        </div>
        <div>
          <input type="number" class="right"
            v-model="periodQty">
        </div>
        <div>
          <button type="button"
            @click="calculateIt">calculate
          </button>
        </div>
        <div>{{ balanceAmt.toDecFormat(2,3,this.sepPt,this.decPt)}}</div>
        <div>{{ earningAmt.toDecFormat(2,3,this.sepPt,this.decPt)}}</div>
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
</style>
