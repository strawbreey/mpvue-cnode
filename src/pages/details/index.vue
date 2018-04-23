<template>
  <div class="container">
    <!-- 用户信息 -->
    <div class="media">
      <img class="mr-3" :src="author.avatar_url" alt="Generic placeholder image" style="width: 100rpx; height: 100rpx">
      <div class="media-body">
        <div>{{author.loginname}}</div>
        <div>{{author.last_reply_at}}</div>        
      </div>
    </div>

    <!-- 内容 -->
    <div class="card p-0 pb-5 m-0 border-0 rounded-0" style="width: 18rem;">
      <div class="card-body px-0 w-100" v-if="article" >
        <h5 class="card-title">{{author.title}}</h5>        
        <wxParse :content="article" />
      </div>
    </div>

    <!-- 底部菜单栏 -->
    <div class="fixed-bottom d-flex w-100 p-2 bg-white border-top">
      <div class="flex-fill d-flex justify-content-center">收藏</div>
      <a href="/pages/comment/main" class="flex-fill d-flex justify-content-center">评论({{author.reply_count}})</a>
    </div>
  </div>
</template>

<script>
// Use Vuex
import store from './store'
import api from '@/api/index'
import wxParse from 'mpvue-wxparse'

export default {
  data () {
    return {
      params: {
        id: null
      }
    }
  },

  components: {
    wxParse
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
    }
  },
  methods: {
    getArticle () {
      console.log(this.params.id)
      api.get('/topic/' + this.params.id).then(response => {
        console.log('222')
        store.commit('getArticle', response)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.params.id = this.$root.$mp.query.id
    this.getArticle()
  }
}

</script>
<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}

</style>
