import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      userId : '',
      rank : '',
      tags : [],
      message : ''
    }
  },
  getters: {
    USER_INFO: state => {
      return state.userInfo
    }
  },
  mutations: {
    SET_INFO: (state, payload) => {
      state.userInfo = payload
    },
    SET_ID: (state, payload) => {
      state.userInfo.userId = payload
    },
    SET_RANK: (state, payload) => {
      state.userInfo.rank = payload
    },
    SET_TAGS: (state, payload) => {
      state.userInfo.tags = payload
    },
    SET_MSG: (state, payload) => {
      state.userInfo.message = payload
    },
  },
  actions: {
  },
  modules: {
  }
})
