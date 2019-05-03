<template lang="html">
  <div id="nav">
    <div class="flex1 nav-box">
      <img alt="David logo" class="logo" src="../assets/logo.png">
    </div>
    <div class="flex1 nav-box">{{ todayStr }}</div>
    <div class="flex1 nav-box">
      <router-link to="/">Home</router-link>
    </div>
    <div class="flex1 nav-box" v-show="authorized">
      <router-link to="/netvalue">Net Value</router-link>
    </div>
    <div class="flex1 nav-box" v-show="authorized">
      <router-link to="/tools">Tools</router-link>
    </div>
    <div class="flex1 nav-box" v-show="authorized">
      <router-link to="/profile">Profile</router-link>
    </div>
    <div class="flex1 nav-box">
      <span v-if="authorized">
        <button type="button" @click="logout">Sign Out</button>
      </span>
      <span v-else>Sign In</span>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
const moment = require('moment');

export default {
  name: 'navCmp',
  data: function () {
    return {
      authorized: false,
      todayStr: ""
    }
  },
  created (){
    this.todayStr = moment().format('MMMM Do YYYY');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authorized = true;
        console.log(`user=`,user);
      }
      else {
        this.authorized = false;
      }
    })
  },
  methods: {
    logout () {
      firebase.auth().signOut()
        .then(function() {
          console.log('Signed Out!');
        })
        .catch(function(error) {
          console.error('Sign Out Error', error);
        });
    }
  }
}
</script>

<style lang="scss" scoped>
#nav {
  background: #c5efcb;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.logo {
  height: 1.25em;
  width: auto;
  margin: 0;
}
.nav-box {
  background: #c5efcb;
  border: solid 1px black;
  color: #2c3e50;
  margin: 0;
  padding: 1%;
  text-align:center;
}

@media (min-width: 768px) {
  #nav {
    display: flex;
  }
  .logo {
    height: 2em;
  }
}

</style>
