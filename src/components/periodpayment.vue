<template>
  <div class="periodpayment">
    <h2>{{ title }}</h2>
    <div class="row">
      <div class="col-amount">Starting Balance:</div>
      <div class="flex10">
        <input type="number" step=".01" class="amt"
          v-model="principleAmt">
      </div>
    </div>
    <div class="row">
      <div class="col-amount">Monthly payment:</div>
      <div class="flex10">
        <input type="number" step=".01" class="amt"
          v-model="paymentAmt">
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
      <div class="col-amount">Ending Balance:</div>
      <div class="flex10">
        {{ balanceAmt.toDecFormat(2,3,this.sepPt,this.decPt)}}
      </div>
    </div>
    <div class="row">
      <div class="col-amount">Earnings:</div>
      <div class="flex10">
        {{ earningAmt.toDecFormat(2,3,this.sepPt,this.decPt)}}
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
      let rt = this.APR/12;
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
.small {
  font-size: 0.6em;
}
</style>
