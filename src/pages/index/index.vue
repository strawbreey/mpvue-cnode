<template>
  <div class="container p-0 bg-light">
    <!-- 导航栏 -->
    <ul class="nav nav-justified shadow-sm">
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
    <scroll-view scroll-y style="height: calc(100vh - 88rpx);" @scroll="scrollFn" :scroll-top="scroll.top" @scrolltolower="loadMore" @scrolltoupper="refresh">
      <view v-for="(item, i) in list" :item="item" :key="i">
        <!-- <view class="nav-item">{{item}}</view> -->
        <a :href="'/pages/details/main?id='+item.id" class="card shadow-sm p-0 rounded-0 border-0 border-0 mb-3">
          <div class="card-header d-flex bg-white justify-content-center">
            <img :src="item.author.avatar_url" alt="..." class="rounded-circle mr-0" style="height: 75rpx; width: 75rpx;">
            <div class="flex-fill p-2">{{item.author.loginname}}</div>
            <div class="p-2">{{item.last_reply_at}}</div>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{item.title}}</h5>
            <p class="card-text text-truncate-1">{{item.content}}</p>
          </div>
        </a>
      </view>
    </scroll-view>
  </div>
</template>

<script>
import api from '@/api/index'
import store from './store'
import wxParse from 'mpvue-wxparse'
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
        top: 0
      }
    }
  },

  components: {
    wxParse
  },

  computed: {
    list () {
      return store.getters.list
    }
  },

  methods: {
    selectTab (e) {
      this.params.page = 1
      this.params.tab = e
      this.scroll.top = 0
      this.getArticleList()
    },
    getArticleList () {
      api.get('/topics', this.params).then(response => {
        if (this.params.page === 1) {
          store.commit('getlist', response)
        } else {
          store.commit('getMoreList', response)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    scrollFn (e) {
      // console.log(e)
      this.scroll.top = e.mp.detail.scrollTop
    },
    loadMore () {
      console.log('loadmore')
      this.params.page++
      this.getArticleList()
    },
    refresh () {
      console.log('refresh')
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getArticleList()
    console.log(this)
  }
}
</script>

<style lang="scss">
page{
  font-size: 16px;
}
.h6{
  font-size: 1rem;
}

button::after{
  // content: none;
}
</style>
