<template>
  <div class="bg-light">
    <!-- 用户信息 -->
    <div class="card justify-content-center align-items-center  m-3">
      <img class="bg-primary rounded-circle mt-3" src="#" alt="Card image" style="width:200rpx; height: 200rpx;">
      <div class="card-body">
        <h6 class="card-title">John Doe</h6>
      </div>
    </div>

    <div class="card m-3 p-0">
      <div class="card-header">近期答复</div>
      <div class="card-body">
        <h6 class="card-title">John Doe</h6>
      </div>
    </div>

    <div class="card m-3 p-0">
      <div class="card-header">近期回复</div>
      <div class="card-body">
        <h6 class="card-title">John Doe</h6>
      </div>
    </div>
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
      logs: []
    }
  },

  created () {
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))
  }
}
</script>

