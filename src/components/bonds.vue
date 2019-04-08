<template>
  <div class="bonds">
    <h3>Bonds go here.</h3>
  </div>

</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'bonds',
  data: function () {
    return {
      title: 'Bonds',
    }
  },
  computed: mapGetters(['allBonds'])
}
</script>

<style lang="css" scoped>
</style>
