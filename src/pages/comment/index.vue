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
          <div class="media-body"  @click.stop="replySomeOne(item)">
            <div class="d-flex flex-row">
              <div class="flex-fill">
                <h6 class="pb-0 mb-0">{{item.author.loginname}}</h6>
                <time class="small">{{item.create_at}}</time>   
              </div>
              <div class="p-2 d-flex justify-content-end align-items-center small" @click.stop="ups(item.id)">
                <img v-if="item.is_uped" src="/static/images/icon/zan-fill.png" class="mr-1" style="height: 16px; width: 16px;"/>
                <img v-else src="/static/images/icon/zan.png" class="mr-1" style="height: 16px; width: 16px;"/>
                {{item.ups.length > 0 ? item.ups.length : ''}}
              </div>
            </div>
            <wxParse :content="item.content"/>    
          </div>
        </div>
      </view>
    </scroll-view>
    <div class="fixed-bottom d-flex w-auto p-2 bg-white border-top">
      <input class="form-control d-block w-100 small" :placeholder="placeholder" confirm-type="send" @input="bindinput" @confirm="submit" />
      <a type="button" class="close" aria-label="Close" @click="clear">
        <span aria-hidden="true">&times;</span>
      </a>
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
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      params: {
        accesstoken: '',
        content: '',
        reply_id: ''
      },
      placeholder: '添加评论',
      reply: {
        loginname: '',
        reply_id: ''
      }
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
      console.log('ups')
      let data = {
        accesstoken: ''
      }
      store.commit('ups', e)
      api.post('/reply/' + e + '/ups', data).then(response => {
        // store.commit('ups', e)
      }).catch(error => {
        console.log(error)
      })
    },
    bindinput (e) {
      this.params.content = e.mp.detail.value
    },
    submit (e) {
      let reply = this.reply.reply_id ? '[@' + this.reply.loginname + '](/user/' + this.reply.loginname + ')' : ''
      let from = '<br/>来自酷炫的 [CNodeMD](https://github.com/TakWolf/CNode-Material-Design)'
      this.params.content = reply + this.params.content + from
      api.post('/topic/' + this.detail.id + '/replies', this.params).then(response => {
        console.log(response)
        // store.commit('ups', e)
      }).catch(error => {
        console.log(error)
      })
    },
    replySomeOne (e) {
      console.log(e)
      this.placeholder = '回复 ' + e.author.loginname + ' 的评论'
      this.params.reply_id = e.id

      this.reply.loginname = e.author.loginname
      this.reply.reply_id = e.id
    },
    clear () {
      this.placeholder = '回复评论'
      this.params.reply_id = ''

      this.reply.loginname = ''
      this.reply.reply_id = ''
    }
  },
  mounted () {
    this.clear()
  }
}

</script>
<style>
.wxParse {
  margin: 0;
}
</style>
