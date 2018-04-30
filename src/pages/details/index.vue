<template>
  <div class="container p-0 bg-light" style="min-height: 100vh">
    <!-- loading -->
    <div :class="{'d-none': !loading}">
      <loading  />
    </div>

    <div :class="{'d-none': loading}" class="bg-white p-3 mb-3 rounded-0">
      <!-- 用户信息 -->
      <!-- <div class="media" @click.stop="gotoUser(author.loginname)">
        <img class="mr-3 rounded-1 icon-5" :src="author.avatar_url" alt="avatar">
        <div class="media-body">
          <div>{{author.loginname}}</div>
          <div class="small">{{author.last_reply_at}}</div>        
        </div>
      </div> -->

      <div class="position-relative d-flex bg-white justify-content-center align-items-center border-bottom-0" @click.stop="gotoUser(author.loginname)">
        <img :src="author.avatar_url" alt="..." class="rounded-circle mr-2 icon-4">
        <div class="flex-fill p-1 align-middle" >{{author.loginname}}
          <span v-if="author.top" class="badge small badge-danger">置顶</span>
          <span v-if="author.good" class="badge small badge-danger">精华</span>              
        </div>
        <div class="p-1 align-bottom font-weight-light small">{{author.last_reply_at}}</div>
      </div>

      <!-- 内容 -->
      <div class="card p-0 m-0 border-0 rounded-0 ">
        <div class="card-body px-0 w-100 " v-if="article" >
          <h6 class="font-weight-bold mb-3">{{author.title}}</h6>
          <wxParse :content="article" imageMode="widthFix" />
          <time class="text-right pt-4 font-weight-light small">编辑于 {{detail.create_at}}</time>
          <p class="text-right font-weight-light mb-0 small">著作权归作者所有</p>
        </div>
      </div>
    </div>


    <!-- 底部菜单栏 -->
    <div class="fixed-bottom d-flex w-auto bg-white small border-top border-light">
      <a v-if="detail && detail.is_collect" class="flex-fill pl-3 d-flex justify-content-start align-items-center" @click="deCollectTopic(detail.id)" style="border-right: none;">
        <img src="/static/images/icon/mark-fill.png" class="icon-3"/> 已收藏</a>
      <a v-else class="flex-fill pl-3 d-flex justify-content-start align-items-center" @click="collectTopic(detail.id)" style="border-right: none;">
        <img src="/static/images/icon/mark.png" class="icon-3"/> 收藏</a>
      <button hover-class="none" class="d-flex p-2 w-25 justify-content-center align-items-center bg-white"  open-type="share">
        <img class="pr-2 icon-3" src="/static/images/icon/share.png"/>
        分享
      </button>
     
      <a :href="'/pages/comment/main?id=' + params.id" class="d-flex w-25 justify-content-center align-items-center" style="border-left: none;">
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
      mode: {
        mode: 'widthFix',
        padding: 0,
        lozyLoad: false
      },
      loading: true
    }
  },

  components: {
    wxParse,
    loading
  },

  computed: {
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
  onShareAppMessage: function (res) {
    return {
      title: this.author.title,
      path: '/pages/details/main?id=' + this.$root.$mp.query.id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
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
    // 收藏话题
    collectTopic (e) {
      let data = {
        accesstoken: '',
        topic_id: e
      }
      api.post('/topic_collect/collect', data).then(response => {
        if (response) {
          store.commit('collectTopic', response)
          // console.log(response)
          wx.showToast({
            title: '收藏成功',
            icon: 'none'
          })
        }
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
  },
  onUnload () {
    store.commit('clearArticle')
  }
}

</script>

<style>
.button {
  border: none;
}
button::after {
 content: none;
 border: none;
}

</style>

