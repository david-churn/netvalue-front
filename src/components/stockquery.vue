<template>
  <div class="stocks">
    <h3>{{ title }}</h3>
    <p>Look up information about a stock based upon its symbol.</p>
    <hr>
    <div class="row">
      <div class="flex1 right">
        <div class="in-text">Symbol:</div>
      </div>
      <div class="flex1">
        <div>
          <input type="text" class="short-in"
              v-model="stockObj.symbol"
              @change="queryAPI">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="flex1 right">
        <div>Price:</div>
      </div>
      <div class="flex1">
        <div>{{ stockObj.latestPrice }}</div>
      </div>
    </div>
    <div class="row">
      <div class="flex1 right">
        <div>at {{ stockObj.latestSource}}:</div>
      </div>
      <div class="flex1">
        <div>{{ stockObj.latestTime }}</div>
      </div>
    </div>
    <div class="row">
      <div class="flex1 right">
        <div>Company Name:</div>
      </div>
      <div class="flex1">
        <div>{{ stockObj.companyName }}</div>
      </div>
    </div>
    <div class="row">
      <div class="flex1 right">
        <div>Web Site:</div>
      </div>
      <div class="flex1">
        <div>{{ stockObj.website}}</div>
      </div>
    </div>
    <div class="row">
      <div class="flex1 right">
        <div>Exchange:</div>
      </div>
      <div class="flex1">
        <div>{{ stockObj.exchange }}</div>
      </div>
    </div>
    <div class="row">
      <div class="flex1 right">
        <div>Sector: </div>
      </div>
      <div class="flex1">
        <div>{{ stockObj.sector}}</div>
      </div>
    </div>
    <p class="small">Data provided for free by <a href="https://iextrading.com/developer">IEX</a>. View <a href="https://iextrading.com/api-exhibit-a/">IEX&rsquo;s Terms of Use</a>.
    </p>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "stockQuery",
  data: function () {
    return {
      iexCompanyStr: "/company?filter=companyName,exchange,industry,website,sector",

      stockObj: {
        symbol: "",
        exchange: "",
        latestPrice: undefined,
        latestSource: "",
        latestTime: "",
        companyName: "",
        industry: "",
        sector: "",
        website: ""
      },
      title: "Stock Look Up",
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
    queryAPI() {
      if (this.stockObj.symbol) {
        let requestStr = this.$store.state.localUrlStr + this.$store.state.stockStr + this.$store.state.companyStr + encodeURIComponent(this.stockObj.symbol);
        axios.get(requestStr)
          .then ((resp) => {
            this.stockObj.latestPrice = resp.data.latestPrice.toDecFormat(2,3,this.sepPt,this.decPt);
            this.stockObj.latestSource = resp.data.latestSource;
            this.stockObj.latestTime =
            resp.data.latestTime;
            this.stockObj.companyName = resp.data.companyName;
            this.stockObj.exchange = resp.data.exchange;
            this.stockObj.industry = resp.data.industry;
            this.stockObj.website = resp.data.website;
            this.stockObj.sector = resp.data.sector;
          })
          .catch ((error) => {
            throw (error)
          });
      }
      else {
        this.stockObj = {
          symbol: "",
          exchange: "",
          latestPrice: undefined,
          latestSource: "",
          latestTime: "",
          companyName: "",
          industry: "",
          sector: "",
          website: ""
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
