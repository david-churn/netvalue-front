<template>
  <div class="profile">
    <h1>{{ title }}</h1>
    <div class="row">
      <div class="flex2">Name: {{ gNameStr }} </div>
      <div class="flex2 right">
        <button class="redbtn" type="button" @click="removeAll">Forget Me</button>
      </div>
    </div>
    <div class="">Number example = {{ exampleNbr }}</div>
    <div class="">
      <div class="">Last profile change: {{ profileObj.updatedAt }}</div>
    </div>
    <hr>
    <div class="row">
      <div class="flex2 right">Called By:</div>
      <div class="flex2">
        <input type="text" required v-model="nickNm">
      </div>
    </div>
    <div class="row">
      <div class="flex2 right">Email Address:</div>
      <div class="flex2">
      <input type="text" required v-model="emailStr">
      </div>
    </div>
    <div class="row">
      <div class="flex2 right">Decimal character:</div>
      <div class="flex2">
        <input type="text" v-model="decimalStr">
      </div>
    </div>
    <div class="row">
      <div class="flex2 right">Separator character:</div>
      <div class="flex2">
        <input type="text" v-model="separatorStr">
      </div>
    </div>
    <button type="button" @click="chgProf">Change It</button>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from "vuex";
import firebase from "firebase/app";
require("firebase/auth");
import _ from "lodash";

export default {
  name: "profile",
  data: function () {
    return {
      title: "Profile",
      gNameStr: "",
      nickNm: "",
      emailStr: "",
      decimalStr: "",
      separatorStr: "",
      exampleNbr: 0,

      errorToast: {
        position: 'top-center',
        duration: 5000,
        fullWidth: true,
        fitToScren: true,
        type: 'error'
      },
      successToast: {
        position: 'top-center',
        duration: 2000,
        type: 'success',
        theme: 'bubble'
      }
    }
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$store.dispatch("clearProfile");
        this.$router.push("/");
      }
      else {
        if (_.isEmpty(this.personProfile)) {
          this.$store.dispatch("fetchProfile",user)
        }
      this.gNameStr = user.displayName;
      }
    });
    this.nickNm = this.profileObj.nickNm;
    this.emailStr = this.profileObj.emailStr;
    this.decimalStr = this.profileObj.decimalStr;
    this.separatorStr = this.profileObj.separatorStr;
    this.exampleNbr = Number( 123456789.1234 ).toDecFormat(4,3,this.separatorStr,this.decimalStr);
  },
  computed: mapState (["profileObj"]),
  methods: {
    chgProf () {
      this.exampleNbr = Number( 123456789.1234 ).toDecFormat(4,3,this.separatorStr,this.decimalStr);
      let updateObj = {
        nickNm: this.nickNm,
        emailStr: this.emailStr,
        decimalStr: this.decimalStr,
        separatorStr: this.separatorStr
      };
      this.$store.dispatch("updateProfile", updateObj);
      Vue.toasted.show('Updating', this.successToast);
    },
    removeAll () {
      if (confirm('Forget all your information,' + this.nickNm + '?')) {
        this.$store.displatch("removeAll",this.profileObj.personID)
      }
      console.log(`${this.profileObj.personID} forgotten`);
    }
  }
}

</script>

<style scoped>
input {
  margin: 0.5em;
}
.redbtn {
  background: red;
  font-weight: bold;
  border: double 1px black;
}
</style>
