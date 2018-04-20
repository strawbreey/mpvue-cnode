<template>
  <div class="container p-0 bg-light">
    <!-- 导航栏 -->
    <ul class="nav nav-justified">
      <li class="nav-item" v-bind:class="{ active: nav === 'a', 'text-primary': nav === 'a' }" @click="selectTab('a')">
        <span class="nav-link">全部</span>
      </li>
      <li class="nav-item" v-bind:class="{ active: nav === 'b', 'text-primary': nav === 'b' }" @click="selectTab('b')">
        <span class="nav-link">精华</span>
      </li>
      <li class="nav-item" v-bind:class="{ active: nav === 'c', 'text-primary': nav === 'c' }" @click="selectTab('c')">
        <span class="nav-link">问答</span>
      </li>
      <li class="nav-item" v-bind:class="{ active: nav === 'd', 'text-primary': nav === 'd' }" @click="selectTab('d')">
        <span class="nav-link">招聘</span>
      </li>
    </ul>

    <!-- 列表栏 -->
    <scroll-view scroll-y style="height: calc(100vh - 88rpx);">
      <view v-for="(item, i) in list" :item="item" :key="i">
        <!-- <view class="nav-item">{{item}}</view> -->
        <div class="card shadow rounded-0 border-0 mb-4">
          <div class="card-header d-flex bg-white justify-content-center border-0 ">
            <img src="#" alt="..." class="img-thumbnail rounded-circle mt-1 mr-2" style="height: 45rpx; width: 45rpx;">
            <div class="flex-fill p-2">I'm a flexbox container!</div>
            <div class="p-2">一分钟前</div>
          </div>
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
      </view>
    </scroll-view>
  </div>
</template>

<script>

export default {
  data () {
    return {
      nav: 'a',
      motto: 'Hello World',
      userInfo: {},
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },

  methods: {
    selectTab (e) {
      console.log(e)
      this.nav = e
    },
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style lang="scss">
page{
  font-size: 16px;
}
.h6{
  font-size: 1rem;
}

button::after{
  // content: none;
}
</style>
