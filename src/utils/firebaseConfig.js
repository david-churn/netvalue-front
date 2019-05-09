'use strict'
// 5/8/2019 David Churn removed authorization

import firebase from 'firebase';

const config = {
  apiKey: "your key information here",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};
firebase.initializeApp(config);
