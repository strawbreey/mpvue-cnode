<template>
  <div class="container p-0">
    <div :class="{'d-none': !loading}">
      <loading  />
    </div>
    <!-- 用户信息 -->
    <scroll-view scroll-y style="height: calc(100vh - 100rpx);">
      <view v-for="(item, i) in replies" :item="item" :key="i">
        <div class="media border-bottom p-3">
          <img class="mr-3" :src="item.author.avatar_url" alt="Generic placeholder image bg-primary" style="min-width: 100rpx; width: 100rpx; height: 100rpx">
          <div class="media-body">
            <div class="d-flex flex-row">
              <div class="flex-fill">
                <h6 class="pb-0 mb-0">{{item.author.loginname}}</h6>
                <time class="small">{{item.create_at}}</time>   
              </div>
              <div class="p-2">
                点赞
              </div>
            </div>
            <wxParse :content="item.content"/>    
          </div>
        </div>
      </view>
    </scroll-view>
    <div class="fixed-bottom d-flex w-100 p-2 bg-white border-top">
      <input class="form-control w-100" aria-describedby="emailHelp" placeholder="回复..." />
    </div>
  </div>
</template>

<script>
// Use Vuex
import store from '../details/store'
import wxParse from 'mpvue-wxparse'
import api from '@/api/index'
import loading from '@/components/loading'

export default {
  data () {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  components: {
    wxParse,
    loading
  },
  computed: {
    replies () {
      return store.getters.replies
    },
    detail () {
      return store.state.detail
    }
  },
  methods: {
    decrement () {
      store.commit('decrement')
    },
    addReplies () {
      // 添加评论
      let data = {
        accesstoken: ''
      }
      this.loading = true
      api.get('/topic/' + this.detail.id + '/replies', data).then(response => {
        console.log('222')
        store.commit('getNotification', response)
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    ups (e) {
      let data = {
        accesstoken: ''
      }
      this.loading = true
      api.post('/reply/' + e + '/ups', data).then(response => {
        console.log('222')
        // store.commit('getNotification', response)
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    // this.increment()
    console.log('222')
  }
}

</script>
<style>
.wxParse {
  margin: 0;
}
</style>
