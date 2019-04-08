import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
//  type, symbol, description, apr, payment, shares, price, amount
    assets: [
      {
        type: 'other'
      , description: 'Cash'
      , amount: 12345.12
      },
      {
        type: 'saving'
      , description: 'Bank Savings'
      , apr: 0.004
      , amount: 200
      },
      {
        type: "saving"
      , description: 'Bank Checking'
      , apr: 0.001
      , amount: 20000
      },
      {
        type: 'stock'
      , symbol: 'UHG'
      , description: "United Healthcare Group"
      , shares: 15.4321
      },
      {
        type: 'bond'
      , symbol: "USSB"
      , description: "United States Savings Bond"
      , apr: .02
      , amount: 2000
      },
      {
        type: 'bond'
      , symbol: 'KCI'
      , description: "KC MO Airport"
      , payment: 100
      },
      {
        type: 'fund'
      , symbol: 'VWIA'
      , description: 'IRA from 401(k)'
      , shares: 50000
      },
      {
        type: 'other'
      , description: 'home'
      , amount: 83500
      },
      {
        type: 'other'
      , description: 'life insurance policy'
      , amount: 14238.75
      }
  ],
//  type, description, apr, payment, amount
    debts: [
      {
        type: 'loan'
      , description: 'home mortgage'
      , apr : 0.02
      , payment: 893.56
      , amount: 45678.90
      },
      {
        type: "loan"
      , description: 'car loan'
      , apr: 0.05
      , payment: 300
      , amount: 6700
      },
      {
        type: "card"
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
    allSavings(state) {
      return state.assets.filter(asset => asset.type==="saving");
    },
    allStocks(state) {
      return state.assets.filter(asset => asset.type==="stock");
    },
    allBonds(state) {
      return state.assets.filter(asset => asset.type==="bond");
    },
    allMFund(state) {
      return state.assets.filter(asset => asset.type==="fund");
    },
    allOther(state) {
      return state.assets.filter(asset => asset.type==="other");
    },
    allDebts(state) {
      return state.debts;
    }
  },
  actions: {
    insertAsset(context,assetObj) {
      context.commit('insertAsset', assetObj)
    },
    insertDebt(context,debtObj) {
      context.commit('insertDebt', debtObj)
    }
  },
  mutations: {
    insertAsset(state,assetObj) {
      state.assets.push(assetObj);
    },
    insertDebt(state,debtObj) {
      state.assets.push(debtObj);
    }
  }
})
