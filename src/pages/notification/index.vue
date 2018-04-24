<template>
  <div class="container p-0">
    <div :class="{'d-none': !loading}">
      <loading  />
    </div>
    <!-- 已登录 -->
    <div class="visible">
      <nav class="navbar navbar-expand-lg navbar-light bg-light clearfix p-2">
        <span class="navbar-brand" href="#">通知列表</span>
        <dev class="navbar-brand float-right" href="#">
          全部标记为已读
          <switch checked bindchange="switch1Change"/>
        </dev>				
      </nav>

      <!-- 列表 -->
      <scroll-view scroll-y style="height: calc(100vh - 96rpx);">
        <view v-for="(item, i) in list" :item="item" :key="i">
          <div class="media border-bottom p-3 bg-light">
            <img class="mr-3 bg-light" :src="item.author.avatar_url" style="width: 100rpx; height: 100rpx; background-color: red" alt="Generic placeholder image">
            <div class="media-body" @click="oneRead(item.id)">
              <h6 v-if="item.type === 'reply'" class="mt-0">{{item.author.loginname}} 评论了<span class="inline font-weight-bold" @click="goto(item.topic.id)" :href="'/pages/details/main?id='+item.topic.id"> {{item.topic.title}}</span> 主题下</h6>
              <wxParse :content="item.reply.content" />
              <div>{{item.create_at}}</div>
            </div>
          </div>
        </view>
      </scroll-view>
    </div>

    <!-- <div class="invisible fixed-top d-flex justify-content-center">
      <div class="load8">
        <div class="loader">Loading...</div>
      </div>
    </div> -->

    <!-- 请先登录 -->
    <div class="invisible fixed-top d-flex justify-content-center">
      <div class="">
        <div class="small">请先登录</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { formatTime } from '@/utils/index'
import store from './store'
import api from '@/api/index'
import wxParse from 'mpvue-wxparse'
import loading from '@/components/loading'

export default {
  data () {
    return {
      loading: false
    }
  },
  computed: {
    list () {
      return store.state.readMessageList
    },
    notList () {
      return store.state.notReadMessageList
    }
  },

  components: {
    wxParse,
    loading
  },

  methods: {
    getNotification () {
      let data = {
        accesstoken: ''
      }
      this.loading = true
      api.get('/messages', data).then(response => {
        console.log('222')
        store.commit('getNotification', response)
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    allRead () {
      let data = {
        accesstoken: 'd94a1a54-f215-4757-bcfd-486be823e876'
      }
      api.post('/message/mark_all', data).then(response => {
        console.log('222')
        store.commit('allRead', response)
      }).catch(error => {
        console.log(error)
      })
    },
    oneRead (e) {
      console.log(e)
      let id = e
      let data = {
        accesstoken: 'd94a1a54-f215-4757-bcfd-486be823e876'
      }
      api.post('/message/mark_one/' + id, data).then(response => {
        console.log('222')
        store.commit('oneRead', response)
      }).catch(error => {
        console.log(error)
      })
    },
    goto (e) {
      wx.navigateTo({
        url: '/pages/details/main?id=' + e
      })
    }
  },

  mounted () {
    this.getNotification()
  }
}
</script>

<style>
.wxParse {
  margin: 0;
}
</style>
