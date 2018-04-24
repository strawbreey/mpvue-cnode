<template>
  <div class="container p-3">
    <!-- loading -->
    <div :class="{'d-none': !loading}">
      <loading  />
    </div>

    <div :class="{'d-none': loading}">
      <!-- 用户信息 -->
      <div class="media">
        <img class="mr-3" :src="author.avatar_url" alt="Generic placeholder image" style="width: 100rpx; height: 100rpx">
        <div class="media-body">
          <div>{{author.loginname}}</div>
          <div>{{author.last_reply_at}}</div>        
        </div>
      </div>

      <!-- 内容 -->
      <div class="card p-0 pb-5 m-0 border-0 rounded-0">
        <div class="card-body px-0 w-100" v-if="article" >
          <h5 class="card-title">{{author.title}}</h5>        
          <wxParse :content="article" />
          <time class="small text-right pt-5">编辑于 {{detail.create_at}}</time>
          <p class="small text-right">著作权归作者所有</p>
        </div>
      </div>
    </div>


    <!-- 底部菜单栏 -->
    <div class="fixed-bottom d-flex w-auto p-2 px-4 bg-white border-top small">
      <div v-if="detail && detail.is_collect" class="flex-fill d-flex justify-content-start align-items-center small" @click="deCollectTopic(detail.id)">
        <img src="/static/images/icon/mark-fill.png" style="height: 20px; width: 20px; "/> 已收藏</div>
      <div v-else class="flex-fill d-flex justify-content-start align-items-center small" @click="collectTopic(detail.id)">
        <img src="/static/images/icon/mark.png" style="height: 20px; width: 20px;"/> 收藏</div>
      <a class="d-flex w-25 justify-content-end align-items-center">
        <img src="/static/images/icon/share.png" style="height: 20px; width: 20px;"/> 分享
      </a>
      <a href="/pages/comment/main" class="d-flex w-25 justify-content-end align-items-center">
        <img src="/static/images/icon/message.png" style="height: 20px; width: 20px;"/> ({{author.reply_count}})
      </a>
    </div>
  </div>
</template>

<script>
// Use Vuex
import store from './store'
import api from '@/api/index'
import wxParse from 'mpvue-wxparse'
import loading from '@/components/loading'

export default {
  data () {
    return {
      params: {
        id: null
      },
      loading: true
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
    article () {
      return store.state.content
    },
    author () {
      return store.state.author
    },
    detail () {
      return store.state.detail
    }
  },
  methods: {
    getArticle () {
      this.loading = true
      let data = {}
      store.commit('clearArticle')
      api.get('/topic/' + this.params.id, data).then(response => {
        store.commit('getArticle', response)
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    collectTopic (e) {
      this.loading = true

      let data = {
        accesstoken: '',
        topic_id: e
      }
      api.post('/topic_collect/collect', data).then(response => {
        store.commit('collectTopic', response)
        // console.log(response)
        wx.showToast({
          title: '收藏成功',
          icon: 'none'
        })
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    deCollectTopic (e) {
      let data = {
        accesstoken: '',
        topic_id: e
      }
      api.post('/topic_collect/de_collect', data).then(response => {
        store.commit('deCollectTopic', response)
        wx.showToast({
          title: '已取消收藏',
          icon: 'none'
        })
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.params.id = this.$root.$mp.query.id
    this.loading = true
    this.getArticle()
  }
}

</script>

