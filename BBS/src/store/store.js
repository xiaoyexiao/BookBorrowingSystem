import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: 0, // 1学生 0管理员
    id: '', // 学生或管理员的账号
    nikeName: ''
  },
  mutations: {
    setId (state, id) {
      state.id = id
    },
    setStatus (state, status) {
      state.status = status
    },
    setNikeName (state, nikeName) {
      state.nikeName = nikeName
    }
  },
  getters: {
    getId (state) {
      return state.id
    },
    getStatus (state) {
      return state.status
    },
    getNikeName (state) {
      return state.nikeName
    }
  }
})
