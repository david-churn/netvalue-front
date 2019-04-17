<template>
  <div class="loans">
    <h3 class="row">
      <div class="col-amount">{{ subtotalAmt }}</div>
      <div class="flex7">{{ title }}</div>
      <div class="col-amount">{{ subtotalPayment }}</div>
      <div class="flex1"></div>
    </h3>
    <div class="row" v-show="loansDebts.length > 0">
      <div class="col-amount">Balance</div>
      <div class="flex6">Description</div>
      <div class="flex1">APR</div>
      <div class="flex2">Monthly Payment</div>
      <div class="flex1">Action</div>
    </div>
    <div class="row"
      v-for="(debt,index) in loansDebts" :key="index">
      <div class="col-amount">
        <input type="number" step=".01" class="amt"
          :value="debt.amount"
          @change="updateRow($event,debt,'amount')">
      </div>
      <div class="flex6">
        <input type="text"
          :value="debt.description"
          @change="updateRow($event,debt,'description')">
      </div>
      <div class="flex1">
        <input type="number" step=".0001" class="amt"
          :value="debt.apr"
          @change="updateRow($event,debt,'apr')">
      </div>
      <div class="col-amount">
        <input type="number" step=".01" class="amt"
          v-model="debt.payment"
          @change="updateRow($event,debt,'payment')">
      </div>
      <div class="flex1">
        <button type="button" @click="deleteRow(debt.id)">remove</button>
      </div>
    </div>
    <div class="row">
      <button type="button" @click="addRow">Add Loan</button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'loans',
  data: function () {
    return {
//  tempId is a unique number for each asset/debt component.  Prevents duplicate tempId
//  between the components.  All components must subtract tempId by 1000 in addRow method.
      tempId: -11,
      title: 'Loans',
      type: 'loan'
    }
  },
  computed: {
    subtotalAmt: function () {
      return this.loansDebts
        .map(debt => Number.isFinite(Number(debt.amount)) ? Number(debt.amount) : 0)
        .reduce((total, amount) => total + amount)
        .toDecFormat(2);
    },
    subtotalPayment: function() {
      return this.loansDebts
        .map(debt => Number.isFinite(Number(debt.payment)) ? Number(debt.payment) : 0)
        .reduce((total, payment) => total + payment)
        .toDecFormat(2);
    },
    loansDebts: function () {
      return this.typeDebts(this.type);
    },
    ...mapGetters(['typeDebts'])
  },
  methods: {
    addRow() {
      this.tempId-=1000;
      let newLoan = {
        id: this.tempId,
        type: this.type,
        amount: 0,
        description: 'Your Loan',
        apr: 0,
        payment: 0
      };
      this.$store.dispatch('insertDebt', newLoan);
    },
    deleteRow(dID) {
      this.$store.dispatch('deleteDebt', dID);
    },
    updateRow(e,debt,propStr) {
      let updDebt = {
        id: debt.id,
        type: debt.type,
        amount: debt.amount,
        description: debt.description,
        apr: debt.apr,
        payment: debt.payment
      };
      updDebt[propStr] = e.srcElement.value;
      this.$store.dispatch('updateDebt', updDebt);
    }
  }
}
</script>

<style lang="css" scoped>
</style>
