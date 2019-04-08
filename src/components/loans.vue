<template>
  <div class="loans">
    <h3>Loans go here.</h3>
  </div>

</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'loans',
  data: function () {
    return {
      title: 'Loans',
    }
  },
  computed: mapGetters(['allDebts'])
}
</script>

<style lang="css" scoped>
</style>
