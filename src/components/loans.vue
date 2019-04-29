<template>
  <div class="loans">
    <h3 class="center">{{ title }}</h3>
    <div class="row">
      <div class="col-amount">Balance</div>
      <div class="flex2">Monthly Payment</div>
    </div>
    <div class="row">
      <div class="col-amount">{{ subtotalAmt }}</div>
      <div class="col-amount">{{ subtotalPayment }}</div>
    </div>
    <hr>
    <div v-for="(debt,index) in loansDebts" :key="index">
      <div class="row">
        <div class="flex2 label">Description:</div>
        <div class="flex2 right">
          <input type="text"
            :value="debt.description"
            @change="updateRow($event,debt,'description')">
        </div>
      </div>
      <div class="row">
        <div class="col-amount">Balance:</div>
        <div class="col-amount">
          <input type="number" step=".01" class="right"
            :value="debt.amount"
            @change="updateRow($event,debt,'amount')">
        </div>
      </div>
      <div class="row">
        <div class="flex2 right">Monthly Payment:</div>
        <div class="col-amount">
          <input type="number" step=".01" class="right"
            v-model="debt.payment"
            @change="updateRow($event,debt,'payment')">
        </div>
      </div>
      <div class="row">
        <div class="flex2 right">Annual Interest:</div>
        <div class="col-amount">
          <input type="number" step=".0001" class="right"
            :value="debt.apr"
            @change="updateRow($event,debt,'apr')">%
        </div>
      </div>
      <button type="button" @click="deleteRow(debt.id)">remove</button>
      <hr>
    </div>
    <button type="button" @click="addRow">Add Loan</button>
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
        .reduce((total, amount) => total + amount, 0)
        .toDecFormat(2);
    },
    subtotalPayment: function() {
      return this.loansDebts
        .map(debt => Number.isFinite(Number(debt.payment)) ? Number(debt.payment) : 0)
        .reduce((total, payment) => total + payment, 0)
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
input {
  max-width: 90%;
}

</style>
