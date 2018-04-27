<template>
  <div class="container p-0 bg-light">
    <div :class="{'d-none': !loading}">
      <loading  />
    </div>
    <!-- 导航栏 -->
    <ul class="nav nav-justified shadow-sm mb-1">
      <li class="nav-item" v-bind:class="{ active: params.tab === 'all', 'text-primary': params.tab === 'all' }" @click="selectTab('all')">
        <span class="nav-link">全部</span>
      </li>
      <li class="nav-item" v-bind:class="{ active: params.tab === 'good', 'text-primary': params.tab === 'good' }" @click="selectTab('good')">
        <span class="nav-link">精华</span>
      </li>
      <li class="nav-item" v-bind:class="{ active: params.tab === 'ask', 'text-primary': params.tab === 'ask' }" @click="selectTab('ask')">
        <span class="nav-link">问答</span>
      </li>
      <li class="nav-item" v-bind:class="{ active: params.tab === 'job', 'text-primary': params.tab === 'job' }" @click="selectTab('job')">
        <span class="nav-link">招聘</span>
      </li>
    </ul>

    <!-- 列表栏 -->
    <scroll-view scroll-y style="height: calc(100vh - 2.0rem);" @scroll="scrollFn" :scroll-top="scroll.top" @scrolltolower="loadMore" @scrolltoupper="refresh">
      <view v-for="(item, i) in list" :item="item" :key="i">
        <!-- <view class="nav-item">{{item}}</view> -->
        <a :href="'/pages/details/main?id='+item.id" class="card shadow-sm p-0 rounded-0 border-0 mb-3">
          <div class="card-header d-flex bg-white justify-content-center border-bottom-0" @click.stop="gotoUser(item.author.loginname)">
            <img :src="item.author.avatar_url" alt="..." class="rounded-circle mr-2" style="height: 2rem; width: 2rem;">
            <div class="flex-fill p-2" >{{item.author.loginname}}</div>
            <div class="p-2">{{item.last_reply_at}}</div>
          </div>
          <div class="card-body pt-0">
            <h6 class="card-title font-weight-bold">{{item.title}}</h6>
            <p class="card-text text-truncate-1">{{item.content}}</p>
          </div>
        </a>
      </view>
      <div v-if="list.length > 10" class="text-center p-2 small font-weight-light">加载中...</div>      
    </scroll-view>
  </div>
</template>

<script>
import api from '@/api/index'
import store from './store'
import wxParse from 'mpvue-wxparse'
import loading from '@/components/loading'
// import { mapGetters, mapState } from 'vuex'

export default {
  data () {
    return {
      params: {
        page: 1,
        tab: 'all',
        limit: 10
      },
      scroll: {
        top: 0,
        scrollTop: 0
      },
      loading: false
    }
  },

  components: {
    wxParse,
    loading
  },

  computed: {
    list () {
      return store.getters.list
    }
  },

  methods: {
    gotoUser (e) {
      wx.navigateTo({
        url: '/pages/me/main?name=' + e
      })
    },
    selectTab (e) {
      this.params.page = 1
      this.params.tab = e
      // this.scroll.top = 0
      this.getArticleList()
    },
    getArticleList () {
      this.loading = true
      if (this.params.page === 1) {
        store.commit('clearlist')
        api.get('/topics', this.params).then(response => {
          store.commit('getlist', response)
          this.loading = false
        }).catch(error => {
          console.log(error)
        })
      } else {
        api.get('/topics', this.params).then(response => {
          store.commit('getMoreList', response)
          this.loading = false
        }).catch(error => {
          console.log(error)
        })
      }
    },
    scrollFn (e) {
      this.scroll.scrollTop = e.mp.detail.scrollTop
    },
    loadMore (e) {
      this.scroll.top = this.scroll.scrollTop
      this.params.page++
      this.getArticleList()
    },
    refresh () {
      console.log('refresh')
    }
  },

  created () {
    this.getArticleList()
  }
}
</script>
