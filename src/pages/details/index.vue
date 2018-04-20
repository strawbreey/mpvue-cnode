<template>
  <div class="container">
    <!-- 用户信息 -->
    <div class="media">
      <img class="mr-3" src="#" alt="Generic placeholder image" style="width: 100rpx; height: 100rpx">
      <div class="media-body">
        <div>strawbreey</div>
        <div>一个小时前</div>        
      </div>
    </div>

    <!-- 内容 -->
    <div class="card p-0 m-0" style="width: 18rem;">
      <div class="card-body">
        pssd
      </div>
    </div>

    <!-- 底部菜单栏 -->
    <div class="fixed-bottom d-flex w-100 p-2">
      <div class="flex-fill">收藏</div>
      <div class="flex-fill">评论</div>
    </div>
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
    decrement () {
      store.commit('decrement')
    }
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
