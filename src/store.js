import Vue from 'vue'
import Vuex from 'vuex'
const _ = require('lodash');

Vue.use(Vuex)

export default new Vuex.Store({
// complains when store data updated outside mutations. Remove for production.
  strict: true,
  state: {
//  type, symbol, description, apr, payment, shares, price, amount
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
      , type: "saving"
      , description: 'Bank Checking'
      , apr: 0.001
      , amount: 20000
      },
      {
        id: 7
      , type: 'stock'
      , symbol: 'UHG'
      , description: "United Healthcare Group"
      , shares: 15.4321
      },
      {
        id: 11
      , type: 'bond'
      , symbol: "USSB"
      , description: "United States Savings Bond"
      , apr: .02
      , amount: 2000
      },
      {
        id: 13
      , type: 'bond'
      , symbol: 'KCI'
      , description: "KC MO Airport"
      , payment: 100
      },
      {
        id: 17
      , type: 'fund'
      , symbol: 'VWIA'
      , description: 'IRA from 401(k)'
      , shares: 50000
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
//  type, description, apr, payment, amount
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
      , type: "loan"
      , description: 'car loan'
      , apr: 0.05
      , payment: 300
      , amount: 6700
      },
      {
        id: 37
      , type: "card"
      , description: 'VISA'
      , apr: 0.18
      , payment: 300
      , amount: 6700
      }
    ]
  },
  getters: {
    allAssets(state) {
      return state.assets
    },
    typeAssets: (state) => (whichType) => {
      return state.assets
        .filter(asset => asset.type===whichType);
    },
    allStocks(state) {
      return state.assets.filter(asset => asset.type==="stock");
    },
    allBonds(state) {
      return state.assets.filter(asset => asset.type==="bond");
    },
    allFunds(state) {
      return state.assets.filter(asset => asset.type==="fund");
    },
    allOthers(state) {
      return state.assets.filter(asset => asset.type==="other");
    },
    allDebts(state) {
      return state.debts;
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
    insertDebt(context,debtObj) {
      context.commit('insertDebt', debtObj);
    }
  },
  mutations: {
    deleteAsset(state,delID) {
      console.log(`delete ID=${delID}`);
      let assetIdx = state.assets.map(asset => asset.id ).indexOf(delID);
      state.assets[assetIdx].type = 'delete';
    },
    insertAsset(state,assetObj) {
      state.assets.push(assetObj);
    },
    updateAsset(state,updateObj) {
      let assetIdx = _.findIndex(state.assets, obj => obj.id===updateObj.id);
//! remove the if for production
      if (assetIdx > 0) {
        state.assets.splice(assetIdx,1,updateObj);
      }
    },
    insertDebt(state,debtObj) {
      state.debts.push(debtObj);
    }
  }
})
