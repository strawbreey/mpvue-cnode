<template>
  <div class="container p-4">
    <!-- 用户授权 -->
    <div class="d-flex flex-column justify-content-center align-items-center border-bottom mb-3" style="height: 300rpx;">
      <image class="mb-2" src="/static/images/icon/home-fill.png" style="width: 100rpx; height: 100rpx"/>
      <div class="" style="margin-bottom: 20rpx;">CNODE</div>
    </div>

    <div class="" style="margin-bottom: 40rpx; text-align: left">该程序将获取以下授权:</div>
    <div class="small" style="margin-bottom: 100rpx; text-align: left; margin-left: 40rpx;">获得你的公开信息(昵称, 头像等)</div>

    <div class="btn btn-lg btn-primary mb-2" @click="scan">扫码登录</div>
    <div class="btn btn-lg btn-secondary "  @click="refuse">取消</div>

  </div>
</template>

<script>
// Use Vuex
import store from './store'

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
          console.log(res)
          try {
            wx.setStorageSync('accessToken', res)
          } catch (e) {
            console.log(e)
          }
        }
      })
    },
    decrement () {
      store.commit('decrement')
    }
  }
}

</script>
<style>
button::after{
  content: none;
}
</style>
