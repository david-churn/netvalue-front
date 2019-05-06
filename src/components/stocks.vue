<template>
  <div class="stocks">
    <h3>{{ title }}</h3>
    <div class="row">
      <div class="flex1 right">
        <div class="uline">Balance</div>
        <div>{{ subtotalAmt }}</div>
      </div>
      <div class="flex1 right">
        <div class="uline">Annual Dividends</div>
        <div>{{ subtotalDividend }}</div>
      </div>
    </div>
    <hr>
    <div v-for="(asset,index) in stocksAssets" :key="index">
      <div class="row">
        <div class="flex1 right">
          <div class="in-text">Description:</div>
        </div>
        <div class="flex1">
          <div>
            <input type="text"
               :value="asset.description"
               @change="updateRow($event,asset,'description')">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="flex1 right">
          <div class="in-text">Balance:</div>
        </div>
        <div class="flex1">
          <div class="in-text">{{ Number(asset.amount)        .toDecFormat(2,3,sepPt,decPt) }}</div>
        </div>
      </div>

      <div class="row">
        <div class="flex1 right">
          <div class="in-text">Shares:</div>
        </div>
        <div class="flex1">
          <div>
            <input type="number" step=".0001" class="right"
              :value="asset.shares"
              @change="updateRow($event,asset,'shares')">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="flex1 right">
          <div class="in-text">Symbol:</div>
        </div>
        <div class="flex1">
          <div>
            <input type="text" class="short-in"
              :value="asset.symbol"
              @change="updateRow($event,asset,'symbol')">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="flex1 right">
          <div class="in-text">Price:</div>
        </div>
        <div class="flex1">
          <div class="in-text">{{ Number(asset.price).toDecFormat(2,3,sepPt,decPt) }}</div>
        </div>
      </div>

      <div class="row">
        <div class="flex1 right">
          <div class="in-text"> at {{ asset.latestSource}}:</div>
        </div>
        <div class="flex1">
          <div class="in-text">{{ asset.latestTime}}</div>
        </div>
      </div>

      <div class="row">
        <div class="flex1 right">
          <div class="in-text">Company Name:</div>
        </div>
        <div class="flex1">
          <div class="in-text">{{ asset.company }}</div>
        </div>
      </div>

      <div class="row">
        <div class="flex1 right">
          <div class="in-text">Annual Dividends:</div>
        </div>
        <div class="flex1">
          <div>
            <input type="number" step=".01" class="right"
              :value="asset.payment"
              @change="updateRow($event,asset,'payment')">
          </div>
        </div>
      </div>
      <button type="button" @click="deleteRow(asset.id)">remove</button>
      <hr>
    </div>
    <button type="button" @click="addRow">Add Stock</button>
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
    decPt: function() {
      return this.$store.state.profileObj.decimalStr;
    },
    sepPt: function() {
      return this.$store.state.profileObj.separatorStr;
    },
    subtotalAmt: function () {
      return this.stocksAssets
        .map(asset => Number.isFinite(Number(asset.amount)) ? Number(asset.amount) : 0)
        .reduce((total, amount) => total + amount, 0)
        .toDecFormat(2,3,this.sepPt,this.decPt);
    },
    subtotalDividend: function() {
      return this.stocksAssets
        .map(asset => Number.isFinite(Number(asset.payment)) ? Number(asset.payment) : 0)
        .reduce((total, payment) => total + payment, 0)
        .toDecFormat(2,3,this.sepPt,this.decPt);
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
        updAsset.amount = Number(updAsset.price * updAsset.shares).toFixed(2);
      }
      if (propStr==="symbol") {
        if (updAsset.symbol) {
          let requestStr = this.$store.state.localUrlStr + this.$store.state.stockStr + this.$store.state.priceStr + encodeURIComponent(updAsset.symbol);
          return axios.get(requestStr)
            .then ((resp) => {
              updAsset.price = resp.data.latestPrice;
              updAsset.latestSource = resp.data.latestSource;
              updAsset.latestTime =
              resp.data.latestTime;
              updAsset.company = resp.data.companyName;
              updAsset.amount = Number(resp.data.latestPrice * updAsset.shares).toFixed(2);
              this.$store.dispatch("updateAsset", updAsset);
            })
            .catch ((error) => {
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
</style>
