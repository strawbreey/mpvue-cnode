<template>
  <div class="container p-5">
    <!-- 用户授权 -->
    <div class="text-center border-bottom mb-3 py-5">
      <image src="/static/images/svg/cnodejs.svg" style="width: 423rpx; height: 100rpx"/>
    </div>

    <p class="text-left mb-3">该程序将获取以下授权:</p>
    <p class="small text-left ml-4 mb-2">获得你的公开信息(昵称, 头像等)</p>
    <p class="small text-left ml-4 mb-5">扫码登录cnode账号</p>

    <div class="btn btn-lg btn-primary mb-3" @click="scan">扫码登录</div>
    <div class="btn btn-lg btn-secondary "  @click="refuse">取消</div>

  </div>
</template>

<script>
// Use Vuex
import store from './store'
import api from '@/api/index'

export default {
  computed: {
    count () {
      return store.state.count
    }
  },
  methods: {
    increment () {
      store.commit('increment')
    },
    refuse () {
      console.log('refuse')
      wx.navigateBack({delta: 1})
    },
    scan () {
      wx.scanCode({
        success: (res) => {
          let data = {
            accesstoken: res.result
          }
          api.post('/accesstoken', data).then(response => {
            try {
              wx.setStorageSync('accesstoken', data.accesstoken)
              wx.setStorageSync('loginname', response.loginname)
              wx.setStorageSync('avatar_url', response.avatar_url)
              wx.setStorageSync('id', response.id)
              store.commit('getLoginInfoByStore')
              if (this.$root.$mp.query && this.$root.$mp.query.from) {
                wx.switchTab({
                  url: '/pages/' + this.$root.$mp.query.from + '/main'
                })
              } else {
                wx.navigateBack({delta: 1})
              }
            } catch (e) {
              console.log(e)
            }
          }).catch(error => {
            console.log(error)
          })
        }
      })
    }
  },
  mounted () {
    // this.params.id = this.$root.$mp.query.id
    // this.loading = true
    // this.getArticle()
    if (this.$root.$mp.query && this.$root.$mp.query.from) {
      this.from = this.$root.$mp.query.from
    }
    console.log(this.$root.$mp.query)
  }
}

</script>
<style>
button::after{
  content: none;
}
</style>
