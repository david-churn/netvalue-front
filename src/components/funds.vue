<template>
  <div class="funds">
    <h3>Mutual Funds go here.</h3>
  </div>

</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'funds',
  data: function () {
    return {
      title: 'Funds',
    }
  },
  computed: mapGetters(['allFunds'])
}
</script>

<style lang="css" scoped>
</style>
