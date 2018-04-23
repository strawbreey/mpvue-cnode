// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

import { getTimeInfo } from '@/utils/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    readMessageList: null,
    notReadMessageList: null
  },
  getters: {
    article: state => state.detail ? state.detail.content : null,
    replies: state => state.detail ? state.detail.replies : null
  },
  mutations: {
    getNotification: (state, action) => {
      if (action) {
        _.map(action.has_read_messages, res => {
          console.log(res)
          res.create_at = getTimeInfo(res.create_at)
        })

        _.map(action.readMessageList, res => {
          res.create_at = getTimeInfo(res.create_at)
        })

        state.notReadMessageList = action.hasnot_read_messages
        state.readMessageList = action.has_read_messages
        console.log(state)
      }
    },
    allRead: (state, action) => {
      // const obj = state
      // obj.count -= 1
    },
    oneRead: (state, action) => {
      // const obj = state
      // obj.count -= 1
    },
    decrement: (state) => {
      const obj = state
      obj.count -= 1
    }
  }
})

export default store
