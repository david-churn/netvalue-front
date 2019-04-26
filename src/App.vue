<template>
  <div id="app">
    <navCmp/>
    <h1>{{ title }} for {{ this.$store.state.profileObj.nickNm}}</h1>
    <router-view/>
    <footer class="center">&copy; 2019</footer>
  </div>
</template>

<script>
import navCmp from './components/nav.vue';

export default {
  name: "app",
  components: {
    navCmp },
  data: function () {
    return {
      title: 'Net Value',
    }
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
h1 {
  text-align: center;
}
body {
  margin: 1% 5%;
}
.toasted-container .toasted.bubble {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 1.5em;
}
.amt {
  text-align: right;
}
.center {
  text-align: center;
}
.label {
  text-align: right;
  margin: 0 1% 0 0;
}
.right {
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
* {
  box-sizing: border-box;
  background: green;
  color: $whitish;
}
// responsive changes
//  tablet sized
@media (min-width: 768px) {
  * {
    background: lightgreen;
    color: $blackish;
  }
}
//  pc sized
@media (min-width: 1280px) {
  * {
    background: $greenish;
    color: $blackish;
  }
}

</style>
