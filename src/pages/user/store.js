// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
// import _ from 'lodash'

// import { getTimeInfo } from '@/utils/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userinfo: {
      avatar_url: null,
      loginname: null,
      score: 0
    },
    topic: [],
    reply: [],
    collect: []
  },

  mutations: {
    getUserInfo: (state, action) => {
      if (action) {
        console.log(action)
        state.userinfo.avatar_url = action.avatar_url
        state.userinfo.loginname = action.loginname
        state.userinfo.score = action.score

        state.reply = action.recent_replies
        state.topic = action.recent_topics
      }
    },
    getCollectList: (state, action) => {
      if (action) {
        state.collect = action
      }
    }
  }
})

export default store
