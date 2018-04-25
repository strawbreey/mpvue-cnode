// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    login: false,
    accesstoken: '',
    loginname: '',
    avatar_url: ''
  },
  mutations: {
    getLoginInfoByStore: (state) => {
      if (!state.accesstoken) {
        try {
          state.accesstoken = wx.getStorageSync('accesstoken')
          state.loginname = wx.getStorageSync('loginname')
          state.avatar_url = wx.getStorageSync('avatar_url')
          if (state.accesstoken) {
            state.login = true
          } else {
            state.login = false
          }
        } catch (e) {
          // Do something when catch error
        }
      }
    },
    logout: (state) => {
      try {
        wx.clearStorageSync()
        state.accesstoken = ''
        state.loginname = ''
        state.avatar_url = ''
        state.login = false
      } catch (e) {
        // Do something when catch error
      }
    }
  }
})

export default store
