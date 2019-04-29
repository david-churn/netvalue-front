<template lang="html">
  <div class="savings">
    <h3 class="center">{{ title }}</h3>
    <div class="row">
      <div class="flex2 right">Balance</div>
      <div class="flex2 right">Monthly Contribution</div>
    </div>
    <div class="row">
      <div class="col-amount">{{ subtotalAmt }}</div>
      <div class="col-amount">{{ subtotalContrib }}</div>
    </div>
    <hr>
    <div v-for="(asset,index) in savingsAssets" :key="index">
      <div class="row">
        <div class="flex2 label">Description:</div>
        <div class="flex2 right">
          <input type="text"
            :value="asset.description"
            @change="updateRow($event, asset, 'description')">
        </div>
      </div>
      <div class="row">
        <div class="flex2 label">Balance:</div>
        <div class="col-amount">
          <input type="number" step=".01" min="0" class="right"
            :value="asset.amount"
            @change="updateRow($event, asset,'amount')">
        </div>
      </div>
      <div class="row">
        <div class="flex2 label">Monthly Contribution:</div>
        <div class="col-amount">
          <input type="number" step=".01" min="0" class="right"
            :value="asset.payment"
            @change="updateRow($event, asset, 'payment')">
        </div>
      </div>
      <div class="row">
        <div class="flex2 label">Annual Interest:</div>
        <div class="col-amount">
          <input type="number" step=".0001" min="0" class="right"
            :value="asset.apr"
            @change="updateRow($event, asset, 'apr')">%
        </div>
      </div>
      <button type="button" @click="deleteRow(asset.id)">remove</button>
      <hr>
    </div>
    <button type="button" @click="addRow">Add Savings</button>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'savings',
  data: function () {
    return {
//  tempId is a unique number for each asset component.  Prevents duplicate tempId
//  between the components.  All components must subtract tempId by 1000 in addRow method.
      tempId: -1,
      title: 'Savings and Checking',
      type: 'saving'
    }
  },
  computed: {
    decPt: function() {
      return this.$store.state.profileObj.decimalStr;
    },
    sepPt: function() {
      return this.$store.state.profileObj.separatorStr;
    },
    subtotalAmt: function () {
      return this.savingsAssets
        .map(asset => Number.isFinite(Number(asset.amount)) ? Number(asset.amount) : 0)
        .reduce((total, amount) => total + amount, 0)
        .toDecFormat(2,3,this.sepPt,this.decPt);
    },
    subtotalContrib: function() {
      return this.savingsAssets
        .map(asset => Number.isFinite(Number(asset.payment)) ? Number(asset.payment) : 0)
        .reduce((total, payment) => total + payment, 0)
        .toDecFormat(2,3,this.sepPt,this.decPt);
    },
    savingsAssets: function () {
      return this.typeAssets(this.type);
    },
    ...mapGetters(['typeAssets'])
  },
  methods: {
    addRow() {
      this.tempId-=1000;
      let newSavings = {
        id: this.tempId,
        type: this.type,
        amount: 0,
        description: 'Your savings',
        apr: 0,
        payment: 0
      };
      this.$store.dispatch('insertAsset', newSavings);
    },
    deleteRow(aID) {
      this.$store.dispatch('deleteAsset', aID);
    },
    updateRow(e,asset,propStr) {
      let updAsset = {
        id: asset.id,
        type: asset.type,
        amount: asset.amount,
        description: asset.description,
        apr: asset.apr,
        payment: asset.payment
      };
      updAsset[propStr] = e.srcElement.value;
      this.$store.dispatch('updateAsset', updAsset);
    }
  }
}
</script>

<style lang="css" scoped>
input {
  max-width: 90%;
}
button {
  margin: 1%;
}
</style>
