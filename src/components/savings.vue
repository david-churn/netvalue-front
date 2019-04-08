<template lang="html">
  <div class="savings">
    <h3>{{title}}</h3>
    <div class="row"
      v-for="(asset,index) in allSavings" :key="index">
      <div class="col-amount">{{asset.amount.format(2)}}</div>
      <div class="flex4"> {{ asset.description}}</div>
      <div class="flex1"> {{ asset.apr.format(4)}}</div>
    </div>
<!--
    <div class="">
      <input type="text" name="" value="number" increment=0.01>
    </div>
    <div class="">
      <div class="left">Skill</div>
      <input type="text" v-model="newSkill.name">
    </div> -->
  </div>

</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'savings',
  data: function () {
    return {
      title: 'Savings and Checking',
    }
  },
  computed: mapGetters(['allSavings'])
}
</script>

<style lang="css" scoped>
</style>
