<template>
  <div class="bg-light" style="min-height: 100vh;">
    <div :class="{'d-none': !loading}">
      <loading  />
    </div>
    <!-- 用户信息 -->
    <div class="card justify-content-center align-items-center border-0 bg-white mb-3 shadow-sm">
      <img class="bg-primary rounded-circle mt-3" :src="userinfo.avatar_url" alt="Card image" style="width:200rpx; height: 200rpx;">
      <div class="card-body">
        <h6 class="card-title font-weight-bold">{{userinfo.loginname}}</h6>
        <p class="text-center">积分: {{userinfo.score}}</p>
      </div>
    </div>

    <div  class="position-relative">
      <nav class="nav nav-pills bg-white sticky-top shadow-sm">
        <a class="flex-fill nav-link text-center rounded-0" v-bind:class="{ active: current === 0 }" @click="changeCurrent(0)">话题</a>
        <a class="flex-fill nav-link text-center rounded-0" v-bind:class="{ active: current === 1 }" @click="changeCurrent(1)">回复</a>
        <a class="flex-fill nav-link text-center rounded-0" v-bind:class="{ active: current === 2 }" @click="changeCurrent(2)">收藏</a>
      </nav>
      <swiper style="height: 100vh;" :indicator-dots="false" :autoplay="false" @change="bindchange" :current="current">
        <swiper-item>
          <div v-for="(item, i) in topic" :item="item" :key="i">
            <div class="media border-bottom p-3 bg-light">
              <img class="mr-3 bg-light" :src="item.author.avatar_url" style="width: 100rpx; height: 100rpx; background-color: red" alt="Generic placeholder image">
              <div class="media-body" @click="oneRead(item.id)">
                <h6 class="mt-0">{{item.author.loginname}} 发布了 <a :href="'/pages/details/main?id='+item.id" class="d-inline font-weight-bold"> {{item.title}}</a> 主题</h6>
                <div>{{item.create_at}}</div>
              </div>
            </div>
          </div>
        </swiper-item>
        <swiper-item>
          <div v-for="(item, i) in reply" :item="item" :key="i">
            <div class="media border-bottom p-3 bg-light">
              <img class="mr-3 bg-light" :src="item.author.avatar_url" style="width: 100rpx; height: 100rpx; background-color: red" alt="Generic placeholder image">
              <div class="media-body" @click="oneRead(item.id)">
                <h6 class="mt-0">{{item.author.loginname}} 发布了 <a :href="'/pages/details/main?id='+item.id" class="d-inline font-weight-bold"> {{item.title}}</a> 主题</h6>
                <div>{{item.create_at}}</div>
              </div>
            </div>
          </div>
        </swiper-item>
        <swiper-item>
          <div v-for="(item, i) in collect" :item="item" :key="i">
            <div class="media border-bottom p-3 bg-light">
              <img class="mr-3 bg-light" :src="item.author.avatar_url" style="width: 100rpx; height: 100rpx; background-color: red" alt="Generic placeholder image">
              <div class="media-body" @click="oneRead(item.id)">
                <h6 class="mt-0">{{item.author.loginname}} 发布了 <a :href="'/pages/details/main?id='+item.id" class="d-inline font-weight-bold"> {{item.title}}</a> 主题</h6>
                <div>{{item.create_at}}</div>
              </div>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import api from '@/api/index'
import store from './store'
import loading from '@/components/loading'

export default {
  data () {
    return {
      current: 0,
      loading: false
    }
  },

  components: {
    loading
  },

  computed: {
    userinfo () {
      return store.state.userinfo
    },
    topic () {
      return store.state.topic
    },
    reply () {
      return store.state.reply
    },
    collect () {
      return store.state.collect
    }
  },

  methods: {
    getUserInfo () {
      // console.log(this.$root.$mp)
      this.loading = true
      if (this.$root.$mp.query.name) {
        api.get('/user/' + this.$root.$mp.query.name).then(response => {
          console.log(response)
          store.commit('getUserInfo', response)
          this.loading = false
        }).catch(error => {
          console.log(error)
        })

        api.get('/topic_collect/' + this.$root.$mp.query.name).then(response => {
          console.log(response)
          store.commit('getCollectList', response)
          this.loading = false
        }).catch(error => {
          console.log(error)
        })
      } else {
        try {
          var loginname = wx.getStorageSync('loginname')
          if (loginname) {
            api.get('/user/' + loginname).then(response => {
              store.commit('getUserInfo', response)
              this.loading = false
            }).catch(error => {
              console.log(error)
            })

            api.get('/topic_collect/' + loginname).then(response => {
              store.commit('getCollectList', response)
              this.loading = false
            }).catch(error => {
              console.log(error)
            })
          }
        } catch (e) {
          // Do something when catch error
        }
      }
    },
    bindchange (e) {
      this.current = e.mp.detail.current
    },
    changeCurrent (e) {
      this.current = e
    }
  },

  mounted () {
    this.getUserInfo()
  }

}
</script>
