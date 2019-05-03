<template>
  <div id="app">
    <navCmp/>
    <div class="body-view">
      <h1>{{ title }} for {{ this.$store.state.profileObj.nickNm || "you"}}</h1>
      <router-view/>
    </div>
    <footer>&copy; 2019</footer>
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
* {
  box-sizing: border-box;
}
div {
  min-height: 1.5em;
}
footer {
  border-top: solid 1px $blackish;
  background: $greenish;
  text-align: center;
}
h1, h2, h3 {
  text-align: center;
}
input {
  max-width: 90%;
}
.body-view {
  margin: 1% 5%;
}
.box {
  border: solid 1px $blackish;
}
.card {
  background: $whitish;
  border: solid 1px $blackish;
  margin: 5% 0;
  padding: 2%;
  vertical-align: top;
}
.flex1 {
  flex: 1;
}
.half {
  max-width: 45%;
  text-align: right;
}
.in-text {
  line-height: 1.5em;
}
.left {
  text-align: left;
}
.redbtn {
  background: $redish;
  border: double 1px $blackish;
  color: $whitish;
  font-weight: bold;
  padding: 0.5em;
}
.right {
  margin: 0 0.2em 0 0;
  text-align: right;
}
.row {
  display: flex;
  margin: 1%;
}
.short-in {
  width: 3em;
}
.small {
  font-size: 0.6em;
}
.toasted-container .toasted.bubble {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 1.5em;
}
// responsive changes
//  tablet sized
@media (min-width: 768px) {
  body {
    background: lightgray;
  }
  h1, h2, h3 {
    text-align: left;
  }
  .body-view {
    margin: 2em;
  }
  .card {
    margin: 1em;
    width: 30em;
    display: inline-block;
  }
}
//  pc sized
@media (min-width: 1280px) {
  body {
    background: lightblue;
  }
}
</style>
