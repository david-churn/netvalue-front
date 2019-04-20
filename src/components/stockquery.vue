<template>
  <div class="stocks">
    <h2>{{ title }}</h2>
    <div class="row">
      <div class="flex2 right">Symbol: </div>
      <div class="flex10">
        <input type="text"
          v-model="stockObj.symbol"
          @change="queryAPI">
      </div>
    </div>
    <div class="row">
      <div class="flex2 right">Price: </div>
      <div class="flex10">{{ stockObj.latestPrice }}</div>
    </div>
    <div class="row">
      <div class="flex2 right">Company Name: </div>
      <div class="flex4">{{ stockObj.companyName }}</div>
      <div class="flex2 right">Exchange: </div>
      <div class="flex4">{{ stockObj.exchange }}</div>
    </div>
    <div class="row">
      <div class="flex2 right">Web Site: </div>
      <div class="flex4">{{ stockObj.website}}</div>
      <div class="flex2 right">Sector: </div>
      <div class="flex4">{{ stockObj.sector}}</div>
    </div>
    <p>Data provided for free by <a href="https://iextrading.com/developer">IEX</a>. View <a href="https://iextrading.com/api-exhibit-a/">IEX&rsquo;s Terms of Use</a>.
    </p>
  </div>
</template>

<script>
import axios from "axios"
import { mapState } from "vuex"

export default {
  name: "stockQuery",
  data: function () {
    return {
      iexCompanyStr: "/company?filter=companyName,exchange,industry,website,sector",

      stockObj: {
        symbol: "F",
        exchange: "dunno",
        latestPrice: 1234567.89,
        latestSource: "Dave's mind",
        companyName: "Ford Motor Company",
        industry: "Industrial",
        sector: "Manufacturing",
        website: "https://www.ford.com"
      },
      title: "Stock Look Up",
    }
  },
  methods: {
    queryAPI() {
      let iexPrefix = this.$store.state.iexUrlStr + this.$store.state.iexStockStr + this.stockObj.symbol;
      let iexRequest = iexPrefix + this.$store.state.iexPriceStr;
      console.log(`iexRequest=${iexRequest}`);
      axios.get(iexRequest)
        .then ((resp) => {
          console.log(resp.data);
          this.stockObj.latestPrice = resp.data.latestPrice;
          this.stockObj.latestSource = resp.data.latestSource;
        })
        .then ( () => {
          iexRequest = iexPrefix + this.iexCompanyStr
          console.log(`iexRequest=${iexRequest}`);
          return axios.get(iexRequest)
        })
        .then ((resp) => {
          console.log(resp.data);
          this.stockObj.companyName = resp.data.companyName;
          this.stockObj.exchange = resp.data.exchange;
          this.stockObj.industry = resp.data.industry;
          this.stockObj.website = resp.data.website;
          this.stockObj.sector = resp.data.sector;
        })
        .catch ((error) => {
          console.log(`post error=`,error);
          throw (error)
        });
    }
  }
}
</script>

<style lang="css" scoped>
.right {
  text-align: right;
}
</style>
