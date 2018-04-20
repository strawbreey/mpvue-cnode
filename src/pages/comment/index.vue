<template>
  <div class="container p-0">
    <!-- 用户信息 -->
    <scroll-view scroll-y style="height: 100vh;">
      <view v-for="(item, i) in list" :item="item" :key="i">
        <div class="media">
          <img class="mr-3" src="#" alt="Generic placeholder image bg-primary" style="width: 100rpx; height: 100rpx">
          <div class="media-body">
            <h5 class="mt-0">Media heading</h5>
            <p>strawbreey</p>
            <time>一个小时前</time>        
          </div>
        </div>
      </view>
    </scroll-view>
  </div>
</template>

<script>
// Use Vuex
import store from './store'

export default {
  data () {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
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
