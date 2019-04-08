<template>
  <div id="app">
    <navCmp/>
    <h1>Your Simple Net Value</h1>
    <!-- <p>{{ moment().format('MMMM Do YYYY') }}</p> -->
    <router-view/>
  </div>
</template>

<script>
import navCmp from './components/nav.vue';

//shrink this to just what is needed?  anything?
const _ = require('lodash');
const moment = require('moment');

export default {
  name: "app",
  components: {
    navCmp }
}
</script>

<style lang="scss">
@import '../node_modules/normalize.css/normalize.css';

/* colors */
$whitish: #f0f0f0;
$blackish: #191516;
$redish: #dd2d4a;
$greenish: #c5efcb;

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $blackish;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: $blackish;
    &.router-link-exact-active {
      color: orange;
    }
  }
}
h1 {
  text-align: center;
}
.row {
  display: flex;
}
.col-amount {
  flex: 1;
  min-width: 5em;
  text-align: right;
}
.flex1 {
  flex: 1;
}
.flex2 {
  flex: 2;
}
.flex3 {
  flex: 3;
}
.flex4 {
  flex: 4;
}
.flex5 {
  flex: 5;
}
.flex6 {
  flex: 6;
}
</style>
