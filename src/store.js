import Vue from "vue"
import Vuex from "vuex"
import _ from "lodash";
import axios from "axios";
import firebase from 'firebase/app';
require('firebase/auth');
import moment from "moment";

Vue.use(Vuex);

export default new Vuex.Store({
// complains when store data updated outside mutations. Remove for production.
  strict: true,
  state: {
    companyStr: "company/",
    deleteStr: "delete",
    localUrlStr: "http://localhost:3000/",
    netValueStr: "nv/",
    priceStr: "price/",
    profileStr: "profile/",
    stockStr: "stock/",

//  personID, createdAt, decimalStr, emailStr, gID, nickNm, separatorStr, updatedAt
    profileObj: {},
//  id, type, symbol, description, apr, payment, shares, price, amount
    assets: [],
//  id, type, description, apr, payment, amount
    debts: []
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
// Is this redundant?  can just access this.$state.store.profileObj in views/components?
    personProfile(state) {
      return state.profileObj;
    }
  },
  actions: {
    deleteAsset(context,id) {
      context.commit("deleteAsset", id);
    },
    insertAsset(context,assetObj) {
      let postStr = this.state.localUrlStr + this.state.netValueStr
        + "asset/" + this.state.profileObj.personID
        + "/" + encodeURIComponent(assetObj.type);
      axios.post(postStr)
        .then ((resp) => {
          if (!resp.data.errors) {
            assetObj.id = resp.data.assetID;
            context.commit("insertAsset", assetObj);
          }
        })
        .catch ((error) => {
          throw error
        });
    },
    updateAsset(context,assetObj) {
        context.commit("updateAsset", assetObj);
    },
    deleteDebt(context,id) {
      context.commit("deleteDebt", id);
    },
    insertDebt(context,debtObj) {
      let postStr = this.state.localUrlStr + this.state.netValueStr
        + "debt/" + this.state.profileObj.personID        + "/" + encodeURIComponent(debtObj.type);
      axios.post(postStr)
        .then ((resp) => {
          if (!resp.data.errors) {
            debtObj.id = resp.data.debtID;
            context.commit("insertDebt", debtObj);
          }
        })
        .catch ((error) => {
          throw error
        });
    },
    updateDebt(context,debtObj) {
      context.commit("updateDebt", debtObj);
    },
    clearProfile(context) {
      context.commit("clearProfile");
    },
    deleteProfile(context,personID) {
      let delStr = this.state.localUrlStr + this.state.profileStr + "deluser/" + personID;
      axios.delete(delStr)
        .then ((resp) => {
          if (!resp.data.errors) {
            context.commit("deleteProfile");
          }
        })
        .catch ((error) => {
          throw error
        })
    },
    fetchProfile(context,userObj) {
      return new Promise((resolve) => {
        let fetchStr = this.state.localUrlStr + this.state.profileStr + "gid/" + userObj.uid;
        axios.get(fetchStr)
        .then ((resp) => {
          if (!resp.data.errors) {
            context.commit("fetchProfile",resp.data);
            resolve();
            this.dispatch("readNetValue");
          }
        })
        .catch ((error) => {
          throw error
        })
      })
    },
    insertProfile(context,personObj) {
      context.commit("insertProfile", personObj);
    },
    loadProfile(context,personObj) {
      context.commit("loadProfile",personObj)
    },
    updateProfile(context,personObj) {
      context.commit("updateProfile", personObj);
    },
    readNetValue(context) {
      let requestStr = this.state.localUrlStr + this.state.netValueStr + "read/" + this.state.profileObj.personID;
      axios.get(requestStr)
        .then ((resp) => {
          context.commit("readNetValue",resp.data);
        })
        .catch ((error) => {
          throw (error);
        })
    },
    saveNetValue() {
      let requestStr = this.state.localUrlStr + this.state.netValueStr + "write/" + this.state.profileObj.personID;
      let requestObj = {
        assets: this.state.assets,
        debts: this.state.debts
      };
      axios.post(requestStr, requestObj)
        .then ()
        .catch ((error) => {
          throw (error);
        })
    }
  },
  mutations: {
    deleteAsset(state,delID) {
      let assetIdx = state.assets.map(asset => asset.id ).indexOf(delID);
      state.assets[assetIdx].type = state.deleteStr;
    },
    insertAsset(state,assetObj) {
      assetObj.description = assetObj.description==="Cash" ? "cash" : assetObj.description;
      state.assets.push(assetObj);
    },
    updateAsset(state,updateObj) {
      let assetIdx = _.findIndex(state.assets, obj => obj.id === updateObj.id);
      state.assets.splice(assetIdx,1,updateObj);
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
      state.debts.splice(debtIdx,1,updateObj);
    },
    clearProfile(state) {
      state.profileObj = {};
    },
    deleteProfile(state) {
      state.profile = {};
      state.assets = [];
      state.debts = [];
      firebase.auth().signOut()
        .catch(function(error) {
          throw error;
        });
    },
    fetchProfile(state,personObj) {
      state.profileObj = {
        personID: personObj.personID,
        updatedAt: moment(personObj.updatedAt).format("MMMM Do YYYY, h:mm:ss a"),
        nickNm: personObj.nickNm,
        emailStr: personObj.emailStr,
        decimalStr: personObj.decimalStr,
        separatorStr: personObj.separatorStr
      };
    },
    insertProfile(state,personObj) {
//! call the backend to set up new profile information and assign personID
      let updStr = state.localUrlStr + state.profileStr + "adduser/" + personObj.gID;
      axios.post(updStr, personObj)
        .catch ((error) => {
          throw error
        })
    },
// updates from the profile screen
    updateProfile(state,personObj) {
      state.profileObj.nickNm = personObj.nickNm;
      state.profileObj.emailStr = personObj.emailStr;
      state.profileObj.decimalStr = personObj.decimalStr;
      state.profileObj.separatorStr = personObj.separatorStr;
      let updStr = state.localUrlStr + state.profileStr + "upduser/" + state.profileObj.personID;
      axios.patch(updStr, state.profileObj)
        .catch ((error) => {
          throw error
        })
    },
// read the asset information from the database.
    readNetValue(state,netValueObj) {
      state.assets = netValueObj.assets;
      state.debts = netValueObj.debts;
    }
  }
})
