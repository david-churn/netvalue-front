<template>
  <div class="stocks">
    <h3 class="row">
      <div class="col-amount">{{ subtotalAmt }}</div>
      <div class="flex7">{{ title }}</div>
      <div class="col-amount">{{ subtotalDividend }}</div>
      <div class="flex1"></div>
    </h3>
    <div class="row">
      <div class="col-amount">Balance</div>
      <div class="col-amount">Shares</div>
      <div class="flex1">Symbol</div>
      <div class="flex4">Description</div>
      <div class="col-amount">Annual Dividends</div>
      <div class="flex1">Action</div>
    </div>
    <div class="row">
      <div class="flex2"></div>
      <div class="col-amount">Price</div>
      <div class="flex8">Company Name</div>
    </div>
    <div v-if="stocksAssets.length">
      <div
        v-for="(asset,index) in stocksAssets" :key="index">
        <div class="row">
          <div class="col-amount">{{ asset.amount }}</div>
          <div class="col-amount">
            <input type="number" step=".000001" class="amt"
              :value="asset.shares"
              @change="updateRow($event,asset,'shares')">
          </div>
          <div class="flex1">
            <input type="text"
              :value="asset.symbol"
              @change="updateRow($event,asset,'symbol')">
          </div>
          <div class="flex4">
            <input type="text"
               :value="asset.description"
               @change="updateRow($event,asset,'description')">
          </div>
          <div class="col-amount">
            <input type="number" step=".01" class="amt"
              :value="asset.payment"
              @change="updateRow($event,asset,'payment')">
          </div>
          <div class="flex1">
            <button type="button" @click="deleteRow(asset.id)">remove</button>
          </div>
        </div>
        <div class="row">
          <div class="flex2"></div>
          <div class="col-amount">{{ asset.price }}</div>
          <div class="flex8">{{ asset.company }}</div>
        </div>
      </div>
    </div>
    <div class="row">
      <button type="button" @click="addRow">Add Stock</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {mapGetters} from "vuex";

export default {
  name: "stocks",
  data: function () {
    return {
//  tempId is a unique number for each asset component.  Prevents duplicate tempId
//  between the components.  All components must subtract tempId by 1000 in addRow method.
      tempId: -3,
      title: "Stocks",
      type: "stock"
    }
  },
  computed: {
    subtotalAmt: function () {
      return this.stocksAssets
        .map(asset => Number.isFinite(Number(asset.amount)) ? Number(asset.amount) : 0)
        .reduce((total, amount) => total + amount, 0)
        .toDecFormat(2);
    },
    subtotalDividend: function() {
      return this.stocksAssets
        .map(asset => Number.isFinite(Number(asset.payment)) ? Number(asset.payment) : 0)
        .reduce((total, payment) => total + payment, 0)
        .toDecFormat(2);
    },
    stocksAssets: function () {
      return this.typeAssets(this.type);
    },
    ...mapGetters(["typeAssets"])
  },
  methods: {
    addRow() {
      this.tempId-=1000;
      let newStock = {
        id: this.tempId,
        type: this.type,
        amount: "0.00",
        symbol: "",
        description: "Your Stock",
        shares: 0,
        payment: 0,
        price: 0,
        latestSource: "",
        latestTime: "",
        company: ""
      };
      this.$store.dispatch("insertAsset", newStock);
    },
    deleteRow(aID) {
      this.$store.dispatch("deleteAsset", aID);
    },
    updateRow(e,asset,propStr) {
      console.log(`updateRow=`,e);
      let updAsset = {
        id: asset.id,
        type: asset.type,
        amount: asset.amount,
        symbol: asset.symbol,
        description: asset.description,
        shares: asset.shares,
        payment: asset.payment,
        price: asset.price,
        latestSource: asset.latestSource,
        latestTime: asset.latestTime,
        company: asset.company
      };
      updAsset[propStr] = e.srcElement.value;
      if (propStr==="shares") {
        updAsset.amount = Number(updAsset.price * updAsset.shares).toDecFormat(2);
      }
      if (propStr==="symbol") {
        if (updAsset.symbol) {
          let requestStr = this.$store.state.localUrlStr + this.$store.state.stockStr + this.$store.state.priceStr + updAsset.symbol;
          console.log(`requestStr=${requestStr}`);
          return axios.get(requestStr)
            .then ((resp) => {
              console.log(resp.data);
              updAsset.price = resp.data.latestPrice.toDecFormat(4);
              updAsset.latestSource = resp.data.latestSource;
              updAsset.latestTime =
              resp.data.latestTime;
              updAsset.company = resp.data.companyName;
              updAsset.amount = Number(resp.data.latestPrice * updAsset.shares).toDecFormat(2);
              console.log(`unrounded ${updAsset.amount}=${resp.data.latestPrice}*${updAsset.shares}`);
              this.$store.dispatch("updateAsset", updAsset);
            })
            .catch ((error) => {
              console.log(`post error=`,error);
              throw (error)
            });
        }
        else {
          updAsset.price = undefined;
          updAsset.latestSource = "";
          updAsset.latestTime = "";
          updAsset.company= "";
          this.$store.dispatch("updateAsset", updAsset);
        }
      }
      else {
        this.$store.dispatch("updateAsset", updAsset);
      }
    }
  }
}
</script>

<style lang="css" scoped>
input {
  max-width: 90%;
}

</style>
