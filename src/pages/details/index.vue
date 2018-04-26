<template>
  <div class="container p-0 bg-light" style="min-height: 100vh">
    <!-- loading -->
    <div :class="{'d-none': !loading}">
      <loading  />
    </div>

    <div :class="{'d-none': loading}" class="bg-white p-3 card rounded-0 shadow-sm">
      <!-- 用户信息 -->
      <div class="media"  @click.stop="gotoUser(author.loginname)">
        <img class="mr-3 rounded-1 icon-5" :src="author.avatar_url" alt="avatar">
        <div class="media-body">
          <div>{{author.loginname}}</div>
          <div class="small">{{author.last_reply_at}}</div>        
        </div>
      </div>

      <!-- 内容 -->
      <div class="card p-0 pb-4 m-0 border-0 rounded-0">
        <div class="card-body px-0 w-100" v-if="article" >
          <h5 class="font-weight-bold pb-3">{{author.title}}</h5> 
          <wxParse :content="article" />
          <time class="text-right pt-4">编辑于 {{detail.create_at}}</time>
          <p class="text-right">著作权归作者所有</p>
        </div>
      </div>
    </div>


    <!-- 底部菜单栏 -->
    <div class="fixed-bottom d-flex w-auto p-2 px-4 bg-white border-top small">
      <a v-if="detail && detail.is_collect" class="flex-fill d-flex justify-content-start align-items-center small" @click="deCollectTopic(detail.id)">
        <img src="/static/images/icon/mark-fill.png" class="icon-3"/> 已收藏</a>
      <a v-else class="flex-fill d-flex justify-content-start align-items-center small" @click="collectTopic(detail.id)">
        <img src="/static/images/icon/mark.png" class="icon-3"/> 收藏</a>
      <a class="d-flex w-25 justify-content-end align-items-center">
        <img class="pr-2 icon-3" src="/static/images/icon/share.png"/> 分享
      </a>
      <a href="/pages/comment/main" class="d-flex w-25 justify-content-end align-items-center">
        <img class="pr-2 icon-3" src="/static/images/icon/message.png"/> {{ author.reply_count ? '(' +  author.reply_count + ')' : '' }}
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
    gotoUser (e) {
      wx.navigateTo({
        url: '/pages/me/main?name=' + e
      })
    },
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

  created () {
    store.commit('clearArticle')
  },
  mounted () {
    this.params.id = this.$root.$mp.query.id
    this.loading = true
    this.getArticle()
  }
}

</script>

