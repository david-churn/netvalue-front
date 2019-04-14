import Vue from 'vue'
import Vuex from 'vuex'
const _ = require('lodash');
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
// complains when store data updated outside mutations. Remove for production.
  strict: true,
  state: {
    deleteStr: 'delete',
    urlStr: 'http://localhost:3000/',
    profileStr: 'profile/',

//  profile information
    profileObj: {
      personID: -1,
      gID: "",
      decimalStr: ".",
      separatorStr: ",",
      nickNm: "mugwump",
      emailStr: "mugwump@onthefence.com",
      lastLogInTsp: "",
      updateAt: "",
    },
//  id, type, symbol, description, apr, payment, shares, price, amount
    assets: [
      {
        id: 2
      , type: 'other'
      , description: 'Cash'
      , amount: 12345.12
      },
      {
        id: 3
      , type: 'saving'
      , description: 'Bank Savings'
      , apr: 0.004
      , amount: 200
      , payment: 50
      },
      {
        id: 5
      , type: 'saving'
      , description: 'Bank Checking'
      , apr: 0.001
      , amount: 20000
      },
      {
        id: 7
      , type: 'stock'
      , amount: 3002.27
      , symbol: 'UHG'
      , description: 'Her Stock'
      , shares: 15.0001
      , payment: 0
      , price: 200.15
      , company: 'United Healthcare Group'
      },
      {
        id: 19
      , type: 'other'
      , description: 'home'
      , amount: 83500
      },
      {
        id: 23
      , type: 'other'
      , description: 'life insurance policy'
      , amount: 14238.75
      }
  ],
//  id, type, description, apr, payment, amount
    debts: [
      {
        id: 29
      , type: 'loan'
      , description: 'home mortgage'
      , apr : 0.02
      , payment: 893.56
      , amount: 45678.90
      },
      {
        id: 31
      , type: 'loan'
      , description: 'car loan'
      , apr: 0.05
      , payment: 300
      , amount: 6700
      },
      {
        id: 37
      , type: 'loan'
      , description: 'VISA'
      , apr: 0.18
      , payment: 300
      , amount: 6700
      }
    ]
  },
  getters: {
    activeAssets(state) {
      return state.assets
        .filter(asset => asset.type !== state.deleteStr);
    },
    typeAssets: (state) => (whichType) => {
      return state.assets
        .filter(asset => asset.type === whichType);
    },
    activeDebts(state) {
      return state.debts
        .filter(debt => debt.type !== state.deleteStr);
    },
    typeDebts: (state) => (whichType) => {
      return state.debts
        .filter(debt => debt.type === whichType);
    },
    getProfile(state) {
      return state.profile;
    }
  },
  actions: {
    deleteAsset(context,id) {
      context.commit('deleteAsset', id);
    },
    insertAsset(context,assetObj) {
      context.commit('insertAsset', assetObj);
    },
    updateAsset(context,assetObj) {
      context.commit('updateAsset', assetObj);
    },
    deleteDebt(context,id) {
      context.commit('deleteDebt', id);
    },
    insertDebt(context,debtObj) {
      context.commit('insertDebt', debtObj);
    },
    updateDebt(context,debtObj) {
      context.commit('updateDebt', debtObj);
    },
    deleteProfile(context,personID) {
      context.commit('deleteProfile', personID);
    },
    insertProfile(context,personObj) {
      context.commit('insertProfile', personObj);
    },
    updateProfile(context,personObj) {
      context.commit('updateProfile', personObj);
    }
  },
  mutations: {
    deleteAsset(state,delID) {
      let assetIdx = state.assets.map(asset => asset.id ).indexOf(delID);
      state.assets[assetIdx].type = state.deleteStr;
    },
    insertAsset(state,assetObj) {
      state.assets.push(assetObj);
    },
    updateAsset(state,updateObj) {
      let assetIdx = _.findIndex(state.assets, obj => obj.id === updateObj.id);
      console.log(`index=${assetIdx}`,updateObj);
//! remove the if for production
      if (assetIdx >= 0) {
        state.assets.splice(assetIdx,1,updateObj);
      }
    },
    deleteDebt(state,delID) {
      let debtIdx = state.debts.map(debt => debt.id ).indexOf(delID);
      state.debts[debtIdx].type = state.deleteStr;
    },
    insertDebt(state,debtObj) {
      state.debts.push(debtObj);
    },
    updateDebt(state,updateObj) {
      let debtIdx = _.findIndex(state.debts, obj => obj.id === updateObj.id);
      console.log(`index=${debtIdx}`,updateObj);
//! remove the if for production
      if (debtIdx >= 0) {
        state.debts.splice(debtIdx,1,updateObj);
      }
    },
    deleteProfile(state,personID) {
      let delStr = state.urlStr + state.profileStr + 'deluser/' + personID;
      console.log(`delStr=${delStr}`);
      axios.delete(delStr)
        .then ((resp) => {
          if (!resp.data.errors) {
            console.log(resp.data);
            state.profile = {};
          }
          else {
            console.log(resp.data.errors);
          }
        })
        .catch ((error) => {
          console.log(`delete error=`,error);
          throw (error);
        })
    },
    insertProfile(state,personObj) {
//! call the backend to set up new profile information and assign personID
      let updStr = state.urlStr + state.profileStr + 'adduser/' + personObj.gID;
      console.log(`updStr=${updStr}`,personObj);
      axios.post(updStr, personObj)
        .then ((resp) => {
          if (!resp.data.errors) {
            console.log(resp.data);
//! update the state.profile with the returned information
          }
          else {
            console.log(resp.data.errors);
          }
        })
        .catch ((error) => {
          console.log(`post error=`,error);
          throw (error)
        })
    },
// updates from the profile screen
    updateProfile(state,personObj) {
      state.profileObj.nickNm = personObj.nickNm;
      state.profileObj.emailStr = personObj.emailStr;
      state.profileObj.decimalStr = personObj.decimalStr;
      state.profileObj.separatorStr = personObj.separatorStr;
      let updStr = state.urlStr + state.profileStr + 'upduser/' + state.profileObj.personID;
      console.log(`updStr=${updStr}`,state.profileObj);
      axios.patch(updStr, state.profileObj)
        .then ((resp) => {
          if (!resp.data.errors) {
            console.log(resp.data);
          }
          else {
            console.log(resp.data.errors);
          }
        })
        .catch ((error) => {
          console.log(`post error=`,error);
          throw (error)
        })
    }
  }
})
