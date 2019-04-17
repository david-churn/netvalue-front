<template>
  <div class="profile">
    <h1>{{ title }}</h1>
    <div class="">Name: {{ gNameStr }} </div>
    <button type="button" @click="chgProf">Change It</button>
    <div class="">Called By:
      <input type="text" required v-model="nickNm">
    </div>
    <div class="">Email Address:
      <input type="text" required v-model="emailStr">
    </div>
    <div class="">Decimal Point character:
      <input type="text" v-model="decimalStr">
    </div>
    <div class="">Thousands Separator character:
      <input type="text" v-model="separatorStr">
    </div>
    <div class="">Number example = {{ exampleNbr }}</div>
    <div class="">
      <div class="">Last log in: {{ profileObj.lastLogInTsp }}</div>
      <div class="">Last profile change: {{ profileObj.updatedAt }}</div>
    </div>
    <div class="">
      <p>{{ messageTx }}</p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapState } from "vuex";
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
      messageTx: "who ARE you?",
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
      }
      this.$store.dispatch("updateProfile", updateObj);
    }
  }
}

</script>

<style scoped>
input {
  margin: 0.5em;
}
</style>
