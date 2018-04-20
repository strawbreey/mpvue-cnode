<template>
  <div>
    <!-- 标题 -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light clearfix p-2">
        <span class="navbar-brand" href="#">通知列表</span>
        <dev class="navbar-brand float-right" href="#">全部标记为已读<switch checked bindchange="switch1Change"/></dev>				
    </nav>

    <!-- 列表 -->
    <scroll-view scroll-y style="height: calc(100vh - 96rpx);">
      <view v-for="(item, i) in list" :item="item" :key="i">
        <div class="media border-bottom p-3">
          <img class="mr-3 bg-light" src="#" style="width: 100rpx; height: 100rpx; background-color: red" alt="Generic placeholder image">
          <div class="media-body">
            <!-- <h5 class="mt-0">Media heading</h5> -->
            <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
            <div>一个小时前</div>
          </div>
        </div>
      </view>
    </scroll-view>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
import card from '@/components/card'

export default {
  components: {
    card
  },

  data () {
    return {
      list: [1, 2, 3, 4, 5, 6]
    }
  },

  created () {
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>
