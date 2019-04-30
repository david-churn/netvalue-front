<template>
  <div class="others">
    <h3 class="center">{{ title }}</h3>
    <div class="half">
      <div class="right">Balance</div>
      <div class="right">{{ subtotalAmt }}</div>
    </div>
    <hr>
    <div v-for="(asset,index) in otherAssets" :key="index">
      <div class="row">
        <div class="flex2 label">
          <div>Description:</div>
          <div>Balance:</div>
        </div>
        <div class="flex2">
          <div>
            <input type="text"
              v-show="asset.description!='Cash'"
              :value="asset.description"
              @change="updateRow($event,asset,'description')">
            <div class="flex2"
              v-show="asset.description=='Cash'">
              {{ asset.description }}
            </div>
          </div>
          <div>
            <input  type="number" step=".01" class="right"
              :value="asset.amount"
              @change="updateRow($event,asset,'amount')">
          </div>
        </div>
      </div>
      <button type="button"
        v-show="asset.description!='Cash'"
        @click="deleteRow(asset.id)">remove
      </button>
      <hr>
    </div>
    <button type="button" @click="addRow">Add Other Account</button>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "others",
  data: function () {
    return {
      //  tempId is a unique number for each asset component.  Prevents duplicate tempId
      //  between the components.  All components must subtract tempId by 1000 in addRow method.
            tempId: -2,
      title: "Other Assets",
      type: "other"
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
      return this.otherAssets
        .map(asset => Number.isFinite(Number(asset.amount)) ? Number(asset.amount) : 0)
        .reduce((total, amount) => total + amount, 0)
        .toDecFormat(2,3,this.sepPt,this.decPt);
    },
    otherAssets: function () {
      return this.typeAssets(this.type);
    },
    ...mapGetters(["typeAssets"])
  },
  methods: {
    addRow() {
      this.tempId-=1000;
      let newOther = {
        id: this.tempId,
        type: this.type,
        amount: 0,
        description: "property or insurance"
      };
      this.$store.dispatch("insertAsset",newOther);
    },
    deleteRow(aID) {
      this.$store.dispatch("deleteAsset",aID);
    },
    updateRow(e,asset,propStr) {
// "Cash" is the special account in other where future value calculations will dump money.  Do not allow another one to be created.  Cash cannot be deleted.
      if ( propStr==="description" &&  e.srcElement.value==="Cash")
        {
          e.srcElement.value="cash";
        }
      console.log(`event=`,e);
      let updAsset = {
        id: asset.id,
        type: asset.type,
        amount: asset.amount,
        description: asset.description
      };
      updAsset[propStr] = e.srcElement.value;
      this.$store.dispatch("updateAsset",updAsset);
    }
  }
}
</script>

<style lang="css" scoped>
input {
  max-width: 90%;
}
half {
  max-width: 45%;
  text-align: right;
}
</style>
