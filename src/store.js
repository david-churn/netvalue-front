import Vue from "vue"
import Vuex from "vuex"
import _ from "lodash";
import axios from "axios";
import moment from "moment";

Vue.use(Vuex)

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

    profileObj: {},
//  id, type, symbol, description, apr, payment, shares, price, amount
    assets: [
      { id: 0,
        type: "other",
        symbol: null,
        description: "Cash",
        apr: null,
        payment: null,
        shares: null,
        price: null,
        amount: 0
      }
    ],
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
      context.commit("insertAsset", assetObj);
    },
    updateAsset(context,assetObj) {
      context.commit("updateAsset", assetObj);
    },
    deleteDebt(context,id) {
      context.commit("deleteDebt", id);
    },
    insertDebt(context,debtObj) {
      context.commit("insertDebt", debtObj);
    },
    updateDebt(context,debtObj) {
      context.commit("updateDebt", debtObj);
    },
    clearProfile(context) {
      context.commit("clearProfile");
    },
    deleteProfile(context,personID) {
      context.commit("deleteProfile", personID);
    },
    fetchProfile(context,userObj) {
      let fetchStr = this.state.localUrlStr + this.state.profileStr + "gid/" + userObj.uid;
      axios.get(fetchStr)
        .then ((resp) => {
          if (!resp.data.errors) {
            console.log(resp.data);
            context.commit("fetchProfile",resp.data);
            this.dispatch("readNetValue");
          }
          else {
            console.log(resp.data.errors);
          }
        })
        .catch ((error) => {
          console.log(`post error=`,error);
          throw (error)
        });
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
      console.log(`readNetValue (${requestStr})`);
      axios.get(requestStr)
        .then ((resp) => {
          console.log(resp.data);
          context.commit("readNetValue",resp.data);
        })
        .catch ((error) => {
          console.log(`post error=`,error);
          throw (error);
        })
    },
    saveNetValue(context) {
      let requestStr = this.state.localUrlStr + this.state.netValueStr + "write/" + this.state.profileObj.personID;
      let requestObj = {
        assets: this.state.assets,
        debts: this.state.debts
      };
      console.log(`saveNetValue ${requestStr}`,requestObj);
      axios.post(requestStr, requestObj)
        .then ((resp) => {
          console.log(resp.data);
          context.commit("saveNetValue",resp.data);
        })
        .catch ((error) => {
          console.log(`post error=`,error);
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
    clearProfile(state) {
      state.profileObj = {};
    },
    deleteProfile(state,personID) {
      let delStr = state.localUrlStr + state.profileStr + "deluser/" + personID;
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
    fetchProfile(state,personObj) {
      state.profileObj = {
        personID: personObj.personID,
        lastLogInTsp: moment(personObj.lastLogInTsp).format("MMMM Do YYYY, h:mm:ss a"),
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
      let updStr = state.localUrlStr + state.profileStr + "upduser/" + state.profileObj.personID;
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
    },
// read the asset information from the database.
    readNetValue(state,netValueObj) {
      state.assets = netValueObj.assets;
      state.debts = netValueObj.debts;
    },
// save the asset information to the database.
    saveNetValue(state,netValueObj) {
      state.assets = netValueObj.assets;
      state.debts = netValueObj.debts;
    }
  }
})
