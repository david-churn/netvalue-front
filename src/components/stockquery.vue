<template>
  <div class="stocks">
    <h3>{{ title }}</h3>
    <p>Look up information about a stock based upon its symbol.</p>
    <hr>
    <div class="row">
      <div class="flex2 right">
        <div class="in-text">Symbol:</div>
        <div>Price:</div>
        <div>at {{ stockObj.latestSource}}:</div>
        <div>Company Name:</div>
        <div>Web Site:</div>
        <div>Exchange:</div>
        <div>Sector: </div>
      </div>
      <div class="flex2">
        <div>
          <input type="text"
              v-model="stockObj.symbol"
              @change="queryAPI">
        </div>
        <div>{{ stockObj.latestPrice }}</div>
        <div>{{ stockObj.latestTime }}</div>
        <div>{{ stockObj.companyName }}</div>
        <div>{{ stockObj.website}}</div>
        <div>{{ stockObj.exchange }}</div>
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
