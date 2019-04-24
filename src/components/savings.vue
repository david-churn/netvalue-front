<template lang="html">
  <div class="savings">
    <h3 class="row">
      <div class="col-amount">{{ subtotalAmt }}</div>
      <div class="flex7">{{ title }}</div>
      <div class="col-amount">{{ subtotalContrib }}</div>
      <div class="flex1"></div>
    </h3>
    <div class="row">
      <div class="col-amount">Balance</div>
      <div class="flex6">Description</div>
      <div class="flex1">APR</div>
      <div class="flex2">Monthly Contribution</div>
      <div class="flex1">Action</div>
    </div>
    <div class="row"
      v-for="(asset,index) in savingsAssets" :key="index">
      <div class="col-amount">
        <input type="number" step=".01" min="0" class="amt"
          :value="asset.amount"
          @change="updateRow($event, asset,'amount')">
      </div>
      <div class="flex6">
        <input type="text"
          :value="asset.description"
          @change="updateRow($event, asset, 'description')">
      </div>
      <div class="flex1">
        <input type="number" step=".0001" min="0" class="amt"
          :value="asset.apr"
          @change="updateRow($event, asset, 'apr')">
      </div>
      <div class="col-amount">
        <input type="number" step=".01" min="0" class="amt"
          :value="asset.payment"
          @change="updateRow($event, asset, 'payment')">
      </div>
      <div class="flex1">
        <button type="button" @click="deleteRow(asset.id)">remove</button>
      </div>
    </div>
    <div class="row">
      <button type="button" @click="addRow">Add Savings</button>
    </div>
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
    subtotalAmt: function () {
      return this.savingsAssets
        .map(asset => Number.isFinite(Number(asset.amount)) ? Number(asset.amount) : 0)
        .reduce((total, amount) => total + amount, 0)
        .toDecFormat(2);
    },
    subtotalContrib: function() {
      return this.savingsAssets
        .map(asset => Number.isFinite(Number(asset.payment)) ? Number(asset.payment) : 0)
        .reduce((total, payment) => total + payment, 0)
        .toDecFormat(2);
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

</style>
