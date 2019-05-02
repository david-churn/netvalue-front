<template>
  <div class="emi">
    <h3>{{ title }}</h3>
    <p>Calculate a payment amount for an equal number of payments to pay of a loan over a period of months.  The result includes the total amount paid and interest cost.  Assumes monthly interest compounding.</p>
    <hr>
    <div class="row">
      <div class="flex2 right">
        <div class="in-text">Starting Balance:</div>
        <div class="in-text">Annual Interest Rate:</div>
        <div class="in-text">Months:</div>
        <div class="in-text">&gt;&gt;&gt;</div>
        <div>Monthly Payment:</div>
        <div>Total Paid:</div>
        <div>Interest Paid:</div>
      </div>
      <div class="flex2">
        <div>
          <input type="number" step=".01" class="right" v-model="principleAmt">
        </div>
        <div>
          <input type="number" step=".01" class="right" v-model="APR">%
        </div>
        <div>
          <input type="number" class="right" v-model="periodQty">
        </div>
        <div>
          <button type="button"         @click="calculateIt">calculate</button>
        </div>
        <div>{{ paymentAmt.toDecFormat(2,3,sepPt,decPt)}}</div>
        <div>{{ totalAmt.toDecFormat(2,3,sepPt,decPt)}}</div>
        <div>{{ costAmt.toDecFormat(2,3,sepPt,decPt)}}</div>
      </div>
    </div>
    <p class="small">Results are estimates for planning.  Assumes monthly compound interest for monthly payments.</p>
  </div>
</template>

<script>
export default {
  name: "emi",
  data: function () {
    return {
      APR: 0,
      costAmt: 0,
      paymentAmt: 0,
      periodQty: 0,
      principleAmt: 0,
      title: "Equated Monthly Installment",
      totalAmt: 0,
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
      let rt = this.APR/1200;
      let q = Math.round(this.periodQty);
      this.paymentAmt = Math.round((this.principleAmt * rt) * ((1 + rt) ** q) / (((1 + rt) ** q) - 1 ) * 100) / 100;
      this.totalAmt = Math.round(this.paymentAmt * this.periodQty * 100) / 100;
      this.costAmt = Math.round((this.totalAmt - this.principleAmt) * 100) / 100;
      return
    }
  }
}
</script>

<style lang="css" scoped>
</style>
