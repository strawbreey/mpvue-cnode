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
    replies: [],
    author: {
      avatar_url: '',
      loginname: '',
      last_reply_at: '',
      title: '',
      reply_count: 0
    }
  },
  getters: {
    article: state => state.detail ? state.detail.content : null
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
        state.author.good = action.good
        state.author.top = action.top
        if (action.replies) {
          _.map(action.replies, res => {
            res.create_at = getTimeInfo(res.create_at)
          })
          state.replies = action.replies.slice(0, 10)
        }
      }
    },
    clearArticle: (state) => {
      state.detail = null
      state.content = null
      state.replies = []
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
    },
    getMoreReply: (state) => {
      if (state.replies.length < state.detail.replies.length) {
        state.replies = state.detail.replies.slice(0, (state.replies.length / 10 + 1) * 10)
      }
    }
  }
})

export default store
