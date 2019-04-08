<template>
  <div class="others">
    <h3>Others go here.</h3>
  </div>

</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'others',
  data: function () {
    return {
      title: 'Others',
    }
  },
  computed: mapGetters(['allOthers'])
}
</script>

<style lang="css" scoped>
</style>
