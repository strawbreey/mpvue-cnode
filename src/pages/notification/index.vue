<template>
  <div class="container p-0 bg-light">
    <div :class="{'d-none': !loading}">
      <loading  />
    </div>

    <nav class="d-flex shadow-sm p-2">
      <div class="flex-fill small" href="#">通知列表</div>
      <div v-if="unread && unread.length" class="float-right small" @click="allRead">
        全部已读
        <img src="/static/images/icon/right.png" style="height: 18px; width: 18px;"/>
      </div>
      <div v-else class="float-right small font-weight-light" @click="allRead">
        全部已读
        <img src="/static/images/icon/right-fill.png" style="height: 18px; width: 18px;"/>
      </div>			
    </nav>
    <!-- 已登录 -->
    <div :class="{ invisible: !login }">
      <!-- 列表 -->
      <scroll-view scroll-y style="height: calc(100vh - 2rem);">
        <div v-for="(item, i) in unread" :item="item" :key="i">
          <div class="media border-bottom p-3 bg-gradient-light">
            <img class="mr-3" :src="item.author.avatar_url" style="width: 100rpx; height: 100rpx;" alt="avatar">
            <div class="media-body" @click="oneRead(item.id)">
              <h6 v-if="item.type === 'reply'" class="mt-0">{{item.author.loginname}} 评论了<span class="inline font-weight-bold" @click="goto(item.topic.id)" :href="'/pages/details/main?id='+item.topic.id"> {{item.topic.title}}</span> 主题下</h6>
              <wxParse :content="item.reply.content" />
              <div>{{item.create_at}}</div>
            </div>
          </div>
        </div>

        <div v-for="(item, i) in read" :item="item" :key="i">
          <div class="media border-bottom p-3">
            <img class="mr-3" :src="item.author.avatar_url" style="width: 100rpx; height: 100rpx;" alt="avatar">
            <div class="media-body" @click="oneRead(item.id)">
              <h6 v-if="item.type === 'reply'" class="mt-0">{{item.author.loginname}} 评论了<span class="inline font-weight-bold" @click="goto(item.topic.id)" :href="'/pages/details/main?id='+item.topic.id"> {{item.topic.title}}</span> 主题下</h6>
              <wxParse :content="item.reply.content" />
              <div>{{item.create_at}}</div>
            </div>
          </div>
        </div>

        <div class="text-center p-2 small font-weight-light">没有更多内容</div>
      </scroll-view>
    </div>

    <!-- 未登录状态 -->
    <div class="fixed-top" :class="{ invisible: login }" style="height: 80vh">
      <div class="d-flex h-100 flex-column justify-content-center align-items-center">
        <img src="/static/images/icon/notification.png" class="pb-3" style="width: 4rem; height: 4rem">
        <p class="font-weight-bold">还没有收到通知</p>
        <p class="small w-50 text-center font-weight-light">你获得的回复, 赞同等动态更新将会显示在这里</p>
        
        <a href="/pages/auth/main?from=notification" class="btn btn-primary text-white w-25">登录</a>
      </div>
    </div>
  </div>
</template>

<script>
// import { formatTime } from '@/utils/index'
import store from './store'
import auth from '../auth/store'
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
    read () {
      return store.state.readMessageList
    },
    unread () {
      return store.state.notReadMessageList
    },
    login () {
      return auth.state.login
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
        store.commit('getNotification', response)
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    allRead () {
      if (this.unread.length < 1) {
        wx.showToast({
          title: '全部已读',
          icon: 'none'
        })
      } else {
        let data = {
          accesstoken: ''
        }
        api.post('/message/mark_all', data).then(response => {
          console.log('222')
          store.commit('allRead', response)
        }).catch(error => {
          console.log(error)
        })
      }
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
    auth.commit('getLoginInfoByStore')
    if (this.login) {
      this.getNotification()
    }
  }
}
</script>

<style>
.wxParse {
  margin: 0;
}
</style>
