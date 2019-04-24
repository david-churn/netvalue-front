<template>
  <div class="others">
    <h3 class="row">
      <div class="col-amount">{{ subtotalAmt }}</div>
      <div class="flex10">{{ title }}</div>
    </h3>
    <div class="row">
      <div class="col-amount">Balance</div>
      <div class="flex9">Description</div>
      <div class="flex1">Action</div>
    </div>
    <div class="row"
      v-for="(asset,index) in otherAssets" :key="index">
      <div class="col-amount">
        <input  type="number" step=".01" class="amt"
          :value="asset.amount"
          @change="updateRow($event,asset,'amount')">
      </div>
      <div class="flex9">
        <input type="text"
          :value="asset.description"
          @change="updateRow($event,asset,'description')">
      </div>
      <div class="flex1">
        <button type="button"
          v-show="asset.description!='Cash'"
          @click="deleteRow(asset.id)">remove
        </button>
      </div>
    </div>
    <div class="row">
      <button type="button" @click="addRow">Add Other Account</button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'others',
  data: function () {
    return {
      //  tempId is a unique number for each asset component.  Prevents duplicate tempId
      //  between the components.  All components must subtract tempId by 1000 in addRow method.
            tempId: -2,
      title: 'Other Assets',
      type: 'other'
    }
  },
  computed: {
    subtotalAmt: function () {
      return this.otherAssets
        .map(asset => Number.isFinite(Number(asset.amount)) ? Number(asset.amount) : 0)
        .reduce((total, amount) => total + amount, 0)
        .toDecFormat(2);
    },
    otherAssets: function () {
      return this.typeAssets(this.type);
    },
    ...mapGetters(['typeAssets'])
  },
  methods: {
    addRow() {
      this.tempId-=1000;
      let newOther = {
        id: this.tempId,
        type: this.type,
        amount: 0,
        description: 'property or insurance'
      };
      this.$store.dispatch('insertAsset',newOther);
    },
    deleteRow(aID) {
      this.$store.dispatch('deleteAsset',aID);
    },
    updateRow(e,asset,propStr) {
      let updAsset = {
        id: asset.id,
        type: asset.type,
        amount: asset.amount,
        description: asset.description
      };
      updAsset[propStr] = e.srcElement.value;
      console.log(updAsset);
      this.$store.dispatch('updateAsset',updAsset);
    }
  }
}
</script>

<style lang="css" scoped>
input {
  max-width: 90%;
}
</style>
