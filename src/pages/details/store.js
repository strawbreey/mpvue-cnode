// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

import { getTimeInfo, formatTime } from '@/utils/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    detail: null,
    content: null,
    replies: null,
    author: {
      avatar_url: '',
      loginname: '',
      last_reply_at: '',
      title: '',
      reply_count: 0
    }
  },
  getters: {
    article: state => state.detail ? state.detail.content : null,
    replies: state => state.detail ? state.detail.replies : null
  },
  mutations: {
    getArticle: (state, action) => {
      if (action) {
        state.detail = action
        state.detail.create_at = formatTime(action.create_at)
        state.content = action.content
        state.author.avatar_url = action.author.avatar_url
        state.author.loginname = action.author.loginname
        state.author.last_reply_at = getTimeInfo(action.last_reply_at)
        state.author.title = action.title
        state.author.reply_count = action.reply_count

        _.map(action.replies, res => {
          res.create_at = getTimeInfo(res.create_at)
        })
        state.replies = action.replies
      }
    },
    clearArticle: (state) => {
      state.detail = null
      state.content = null
      state.replies = null
      state.author = {
        avatar_url: '',
        loginname: '',
        last_reply_at: '',
        title: '',
        reply_count: 0
      }
    },
    collectTopic: (state, action) => {
      state.detail.is_collect = true
    },
    deCollectTopic: (state, action) => {
      state.detail.is_collect = false
    },
    ups: (state, action) => {
      _.map(state.replies, res => {
        if (res.id === action) {
          if (res.is_uped === true) {
            _.remove(res.ups, res => {
              return res === action
            })
          } else {
            res.ups.push(action)
          }
          res.is_uped = !res.is_uped
        }
      })
    }
  }
})

export default store
