<template>
  <div class="container p-0">
    <!-- 用户信息 -->
    <scroll-view scroll-y style="height: calc(100vh - 100rpx);">
      <view v-for="(item, i) in replies" :item="item" :key="i">
        <div class="media border-bottom p-3">
          <img class="mr-3" :src="item.author.avatar_url" alt="Generic placeholder image bg-primary" style="width: 100rpx; height: 100rpx">
          <div class="media-body">
            <!-- <h5 class="mt-0">{{item.content}}</h5> -->
            <p>{{item.author.loginname}}</p>
            <time>{{item.create_at}}</time>   
            <wxParse :content="item.content"/>    
          </div>
        </div>
      </view>
    </scroll-view>
    <div class="fixed-bottom d-flex w-100 p-2 bg-white border-top">
      <input class="form-control w-100" aria-describedby="emailHelp" placeholder="Enter email" />
    </div>
  </div>
</template>

<script>
// Use Vuex
import store from '../details/store'
import wxParse from 'mpvue-wxparse'

export default {
  data () {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  components: {
    wxParse
  },
  computed: {
    replies () {
      return store.getters.replies
    }
  },
  methods: {
    increment () {
      // store.commit('increment')
      console.log('333')
      console.log(store)
    },
    decrement () {
      store.commit('decrement')
    }
  },
  mounted () {
    this.increment()
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
