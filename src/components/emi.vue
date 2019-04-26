<template>
  <div class="emi">
    <h2>{{ title }}</h2>
    <div class="row">
      <div class="col-amount">Starting Balance:</div>
      <div class="flex10">
        <input type="number" step=".01" class="amt"
          v-model="principleAmt">
      </div>
    </div>
    <div class="row">
      <div class="col-amount">Annual Interest Rate:</div>
      <div class="flex10">
        <input type="number" step=".0001" class="amt"
          v-model="APR">
      </div>
    </div>
    <div class="row">
      <div class="col-amount">Months:</div>
      <div class="flex10">
        <input type="number" class="amt"
          v-model="periodQty">
      </div>
    </div>
    <div>
      <button type="button"
        @click="calculateIt">calculate
      </button>
    </div>
    <div class="row">
      <div class="col-amount">Monthly Payment:</div>
      <div class="flex10">
        {{ paymentAmt.toDecFormat(2,3,this.sepPt,this.decPt)}}
      </div>
    </div>
    <div class="row">
      <div class="col-amount">Total Paid:</div>
      <div class="flex10">
        {{ totalAmt.toDecFormat(2,3,this.sepPt,this.decPt)}}
      </div>
    </div>
    <div class="row">
      <div class="col-amount">Total Cost:</div>
      <div class="flex10">
        {{ costAmt.toDecFormat(2,3,this.sepPt,this.decPt)}}
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
      let rt = this.APR/12;
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
.small {
  font-size: 0.6em;
}
</style>
