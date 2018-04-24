// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

import { getTimeInfo } from '@/utils/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    list: 0
  },
  getters: {
    list: state => state.list
  },
  mutations: {
    getlist: (state, action) => {
      // 截取前100个字符
      _.map(action, res => {
        res.content = res.content.replace(/<\/?.+?>/g, '').slice(0, 100) + '...'
        res.last_reply_at = getTimeInfo(res.last_reply_at)
      })
      state.list = action
    },
    getMoreList: (state, action) => {
      _.map(action, res => {
        res.content = res.content.replace(/<\/?.+?>/g, '').slice(0, 100) + '...'
        res.last_reply_at = getTimeInfo(res.last_reply_at)
      })
      state.list = _.compact(_.concat(state.list, action))
      // _.map(state.list, res => {
      //   res.content = res.content.replace(/<\/?.+?>/g, '').slice(0, 100) + '...'
      //   res.last_reply_at = getTimeInfo(res.last_reply_at)
      // })
    },
    clearlist: (state) => {
      console.log('222')
      state.list = []
    }
  }
})

export default store
