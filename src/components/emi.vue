<template>
  <div class="emi">
    <h2>{{ title }}</h2>
    <p>Calculate a payment amount for an equal number of payments to pay of a loan over a period of months.  The result includes the total amount paid and interest cost.  Assumes monthly interest compounding.</p>
    <div class="row">
      <div class="flex2 right">
        <div>Starting Balance:</div>
        <div>Annual Interest Rate:</div>
        <div>Months:</div>
        <div>&gt;&gt;&gt;</div>
        <div>Monthly Payment:</div>
        <div>Total Paid:</div>
        <div>Interest Paid:</div>
      </div>
      <div class="flex2">
        <input type="number" step=".01" class="amt" v-model="principleAmt">
        <input type="number" step=".01" class="amt" v-model="APR">%
        <input type="number" class="amt" v-model="periodQty">
        <button type="button"         @click="calculateIt">calculate</button>
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
