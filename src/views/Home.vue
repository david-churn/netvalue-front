<template>
  <div class="home">
    <div id="fbui-auth"></div>
  </div>
</template>

<script>
// import firebase from 'firebase';
import firebase from 'firebase/app';
require('firebase/auth');
import firebaseui from 'firebaseui';
import '../utils/firebaseConfig.js';
import 'firebaseui/dist/firebaseui.css';

export default {
  name: 'home',
  mounted() {
// FirebaseUI config.
    const uiConfig = {
      signInSuccessUrl: '/netvalue',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // Terms of service url/callback.
      tosUrl: '<your-tos-url>',
      // Privacy policy url/callback.
      privacyPolicyUrl: function() {
        window.location.assign('<your-privacy-policy-url>');
      }
    };
// Initialize the FirebaseUI Widget using Firebase.
    let ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#fbui-auth', uiConfig);
  }
}
</script>

<style scoped>
</style>
