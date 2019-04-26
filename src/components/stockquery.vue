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
      <div class="flex10">{{ stockObj.latestPrice }}
        <span v-if="stockObj.latestSource"> at {{ stockObj.latestSource}}</span>
        <span v-if="stockObj.latestTime"> on {{ stockObj.latestTime }}</span>
      </div>
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
  methods: {
    queryAPI() {
      if (this.stockObj.symbol) {
        let requestStr = this.$store.state.localUrlStr + this.$store.state.stockStr + this.$store.state.companyStr + this.stockObj.symbol;
        console.log(`requestStr=${requestStr}`);
        axios.get(requestStr)
          .then ((resp) => {
            console.log(resp.data);
            this.stockObj.latestPrice = resp.data.latestPrice.toDecFormat(2);
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
            console.log(`post error=`,error);
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
.right {
  text-align: right;
}
.small {
  font-size: 0.6em;
}
</style>
