<template lang="html">
  <div id="nav">
    <div class="flex1 box">{{ todayStr }}</div>
    <div class="flex1 box">
      <router-link to="/">Home</router-link>
    </div>
    <div class="flex1 box">
      <router-link to="/netvalue">Net Value</router-link>
    </div>
    <div class="flex1 box">
      <router-link to="/tools">Tools</router-link>
    </div>
    <div class="flex1 box">
      <router-link to="/profile">Profile</router-link>
    </div>
    <div class="flex1 box">
      <router-link to="/about">About</router-link>
    </div>
    <div class="flex1 box">
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
* {
}
button {
  background: #c5efcb;
  color: #2c3e50;
  margin: 0 0.5em;
}
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
.box {
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
}

</style>
