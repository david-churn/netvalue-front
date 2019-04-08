<template>
  <div class="profile">
    <h1>profile page</h1>
    <div class="">Name:
      <input type="text" v-model="newUser">
    </div>
    <div class="">Called By:
      <input type="text" v-model="nickNm">
    </div>
    <div class="">Occupation:
      <input type="text" v-model="occupationTx">
    </div>
    <div class="">Contact Phone:
      <input type="number" v-model="contactNbr">
    </div>
    <div class="">Age:
      <input type="number" v-model="ageQt">
    </div>
    <button type="button" @click="chgProf">Change It</button>
    <div class="">
      <p>{{ messageTx }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase';

export default {
  name: 'profile',
  data: function () {
    return {
      authorized: false,
      messageTx: "",
      newUser: "",
      nickNm: "",
      occupationTx: "",
      contactNbr: 0,
      ageQt: 0
    }
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.displayName);
        this.newUser = user.displayName;
        let _this = this;
        axios.get('http://localhost:3000/extra/' + user.uid)
          .then ((resp) => {
            console.log(`MySQL says`, resp);
            if (resp.status === 200 && resp.data.length > 0) {
              _this.nickNm = resp.data[0].NickNm;
              _this.occupationTx = resp.data[0].OccupationTx;
              _this.contactNbr = resp.data[0].ContactNbr;
              _this.ageQt = resp.data[0].AgeQt;
            }
            else {
              _this.nickNm = "";
              _this.occupationTx = "";
              _this.contactNbr = 0;
              _this.ageQt = 0;
            }
          })
          .catch(function(error) {
            console.log(error);
            _this.nickNm = "";
            _this.occupationTx = "";
            _this.contactNbr = 0;
            _this.ageQt = 0;
          })
      }
      else {
        this.$router.push('/');
      }
    })
  },
  methods: {
    chgProf () {
      let user=firebase.auth().currentUser;
      console.log(`Google user=`, user.uid);
      let _this = this;

      user.updateProfile({
      displayName: this.newUser,
      })
      .then(function() {
        console.log('Google Changed!');
        _this.messageTx = 'Google Changed (1 of 2)'
        let extraObj = {
          UID: user.uid,
          NickNm: _this.nickNm,
          OccupationTx: _this.occupationTx,
          ContactNbr: _this.contactNbr,
          AgeQt: _this.ageQt
        };
        console.log(`extraObj=`, extraObj);
        axios.post('http://localhost:3000/insextra', extraObj)
      })
      .then ((resp) => {
        console.log(`MySQL says`, resp);
        _this.messageTx = 'Changed'
      })
      .catch(function(error) {
        _this.messageTx = "MySQL says " + error;
      })
    }
  }
}

</script>

<style scoped>
input {
  margin: 0.5em;
}
</style>
