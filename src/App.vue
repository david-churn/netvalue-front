<template>
  <div id="app">
    <navCmp/>
    <h1>{{ title }}</h1>
    <p>{{ todayStr }}</p>
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
    navCmp },
  data: function () {
    return {
      title: 'Your Simple Net Value',
      todayStr: ''
    }
  },
  created() {
    this.todayStr = moment().format('MMMM Do YYYY');
  }
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
body {
  margin: 1%;
}
input {
  width: 90%;
}
.amt {
  text-align: right;
}
.row {
  display: flex;
  margin: 1%;
}
.col-amount {
  flex: 2;
  min-width: 5em;
  text-align: right;
  margin: 0 1em;
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
.flex7 {
  flex: 7;
}
.flex8 {
  flex: 8;
}
.flex9 {
  flex: 9;
}
.flex10 {
  flex: 10;
}
.flex11 {
  flex: 11;
}
.flex12 {
  flex: 12;
}
</style>
