<template>
  <div class="profile">
    <h1>{{ title }}</h1>
    <button type="button" @click="chgProf">Save Profile</button>
    <div class="row">
      <div class="flex2 label">
        <div>Name:</div>
        <div>Number Example:</div>
        <div>Last Profile Change:</div>
      </div>
      <div class="flex2">
        <div>{{ gNameStr }}</div>
        <div>{{ exampleNbr }}</div>
        <div>{{ profileObj.updatedAt }}</div>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="flex2 label">
        <div class="in-text">Called By:</div>
        <div class="in-text">Email Address:</div>
        <div class="in-text">Decimal character:</div>
        <div class="in-text">Separator character:</div>
      </div>
      <div class="flex2">
        <input type="text" required v-model="nickNm">
        <input type="text" required v-model="emailStr">
        <input type="text" maxLength=1 required v-model="decimalStr">
        <input type="text" maxLength=1 required v-model="separatorStr">
      </div>
    </div>
    <button class="redbtn" type="button" @click="removeAll">Delete All</button>
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
    this.exampleNbr = Number( 123456789.12 ).toDecFormat(2,3,this.separatorStr,this.decimalStr);
  },
  computed: mapState (["profileObj"]),
  methods: {
    chgProf () {
      this.exampleNbr = Number( 123456789.12 ).toDecFormat(2,3,this.separatorStr,this.decimalStr);
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
      if (confirm('Delete all assets, debts, and your profile, ' + this.nickNm + '?')) {
        this.$store.dispatch("deleteProfile",this.profileObj.personID)
      }
    }
  }
}

</script>

<style scoped>
div, input {
  margin: 0.2em;
  min-height: 1.5em;
}
.in-text {
  margin-bottom: 0.25em;
  margin-top: 0.4em;
}
.redbtn {
  background: red;
  border: double 1px black;
  font-weight: bold;
  padding: 0.5em;
}
</style>
