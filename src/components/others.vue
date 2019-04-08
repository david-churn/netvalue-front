<template>
  <div class="others">
    <h3>{{title}}</h3>
    <div class="row">
      <div class="col-amount">Balance</div>
      <div class="flex1">Description</div>
    </div>
    <div class="row"
      v-for="(asset,index) in allOthers" :key="index">
      <div class="col-amount"><input v-model="asset.amount" type="number" step=".01" class="amt"></div>
      <div class="flex1"><input v-model="asset.description" type="text"></div>
    </div>
  </div>

</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'others',
  data: function () {
    return {
      title: 'Other Assets',
    }
  },
  computed: mapGetters(['allOthers'])
}
</script>

<style lang="css" scoped>
</style>
