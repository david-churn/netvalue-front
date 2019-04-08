<template>
  <div class="stocks">
    <h3>Stocks go here.</h3>
  </div>

</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'stocks',
  data: function () {
    return {
      title: 'Stocks',
    }
  },
  computed: mapGetters(['allStocks'])
}
</script>

<style lang="css" scoped>
</style>
