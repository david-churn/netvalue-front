<template lang="html">
  <div id="navCmp">
    <span>{{ todayStr }}</span> | 
    <router-link to="/">Home</router-link> |
    <router-link to="/netvalue">Net Value</router-link> |
    <router-link to="/futurevalue">Future Value</router-link> |
    <router-link to="/tools">Tools</router-link> |
    <router-link to="/profile">Profile</router-link> |
    <router-link to="/about">About</router-link>
    <span v-if="authorized"> |
      <button type="button" @click="logout">SignOut</button>
    </span>
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
button {
  margin: 0 0.5em;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
