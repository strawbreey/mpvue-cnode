<template>
  <div class="container p-0 bg-light" style="min-height: 100vh;">
    <div :class="{'d-none': !loading}">
      <loading  />
    </div>

    <div class="card border-0 bg-white mb-3 shadow-sm" :class="{ 'd-none': !login }" style="height: 16rem;">
      <div class="position-relative bg-primary w-100 h-50 mb-5">
        <a href="/pages/auth/main?from=auth" class="position-absolute text-center;" style="width: 10rem; left: 50%; bottom: 0; transform: translate(-50%, 50%) ">
          <img class="rounded-circle bg-white shadow-sm img-thumbnail m-2"  :src="userinfo.avatar_url" alt="avatar" style="width: 5rem; height: 5rem; ">
        </a>
      </div>
      <div class="text-center font-weight-bold mt-3">{{userinfo.loginname}}<span class="small" @click="logout">(注销)</span></div>
      <div class="text-center">积分: {{userinfo.score}}</div>
    </div>

    <div :class="{ 'd-none': !login }" class="position-relative">
      <nav class="nav nav-pills bg-white sticky-top shadow-sm">
        <a class="flex-fill nav-link text-center rounded-0" v-bind:class="{ active: current === 0 }" @click="changeCurrent(0)">话题</a>
        <a class="flex-fill nav-link text-center rounded-0" v-bind:class="{ active: current === 1 }" @click="changeCurrent(1)">回复</a>
        <a class="flex-fill nav-link text-center rounded-0" v-bind:class="{ active: current === 2 }" @click="changeCurrent(2)">收藏</a>
      </nav>
      <swiper style="height: calc(100vh - 1.8rem);" :indicator-dots="false" :autoplay="false" @change="bindchange" :current="current">
        <swiper-item>
          <scroll-view scroll-y style="height: calc(100vh - 88rpx);">
            <div v-for="(item, i) in topic" :item="item" :key="i">
              <div class="media border-bottom border-gray p-3 bg-white">
                <img class="mr-3 icon-5 rounded" :src="item.author.avatar_url"  alt="Generic placeholder image">
                <div class="media-body" @click="oneRead(item.id)">
                  <h6 class="mt-0">{{item.author.loginname}} 发布了主题 <a :href="'/pages/details/main?id='+item.id" class="d-inline font-weight-bold"> {{item.title}}</a></h6>
                  <div>{{item.last_reply_at}}</div>
                </div>
              </div>
            </div>
            <div class="text-center p-2 small font-weight-light">没有更多内容</div>    
          </scroll-view>
        </swiper-item>
        <swiper-item>
          <scroll-view scroll-y style="height: calc(100vh - 88rpx);">
            <div v-for="(item, i) in reply" :item="item" :key="i">
              <div class="media border-bottom border-gray p-3 bg-white">
                <img class="mr-3 icon-5 rounded" :src="item.author.avatar_url" alt="Generic placeholder image">
                <div class="media-body" @click="oneRead(item.id)">
                  <h6 class="mt-0">{{item.author.loginname}} 评论了主题 <a :href="'/pages/details/main?id='+item.id" class="d-inline font-weight-bold"> {{item.title}}</a></h6>
                  <div>{{item.last_reply_at}}</div>
                </div>
              </div>
            </div>
            <div class="text-center p-2 small font-weight-light">没有更多内容</div>
          </scroll-view>
        </swiper-item>
        <swiper-item>
          <scroll-view scroll-y style="height: calc(100vh - 88rpx);">
            <div v-for="(item, i) in collect" :item="item" :key="i">
              <div class="media border-bottom border-gray p-3 bg-white">
                <img class="mr-3 icon-5 rounded" :src="item.author.avatar_url" alt="Generic placeholder image">
                <div class="media-body" @click="oneRead(item.id)">
                  <h6 class="mt-0">{{item.author.loginname}} 收藏了主题 <a :href="'/pages/details/main?id='+item.id" class="d-inline font-weight-bold"> {{item.title}}</a></h6>
                  <div>{{item.last_reply_at}}</div>
                </div>
              </div>
            </div>
            <div class="text-center p-2 small font-weight-light">没有更多内容</div>
          </scroll-view>               
        </swiper-item>
      </swiper>
    </div>

    <!-- 未登录 -->

    <div class="card border-0 bg-white shadow-sm" :class="{ 'd-none': login }" style="height: 16rem;">
      <div class="position-relative bg-primary w-100 h-50">
        <a href="/pages/auth/main?from=user" class="position-absolute text-center;" style="width: 10rem; left: 50%; bottom: 0; transform: translate(-50%, 50%) ">
          <img class="rounded-circle bg-white shadow-sm img-thumbnail m-2" src="/static/images/icon/user.png" alt="Card image" style="width: 5rem; height: 5rem; ">
          <p class="card-title text-center">未登录</p>
        </a>
      </div>
    </div>

    <!-- <div  class="position-relative">
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
                <h6 class="mt-0">{{item.author.loginname}} 发布了主题 <a :href="'/pages/details/main?id='+item.id" class="d-inline font-weight-bold"> {{item.title}}</a></h6>
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
                <h6 class="mt-0">{{item.author.loginname}} 评论了主题 <a :href="'/pages/details/main?id='+item.id" class="d-inline font-weight-bold"> {{item.title}}</a></h6>
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
                <h6 class="mt-0">{{item.author.loginname}} 收藏了主题 <a :href="'/pages/details/main?id='+item.id" class="d-inline font-weight-bold"> {{item.title}}</a></h6>
                <div>{{item.create_at}}</div>
              </div>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div> -->
  </div>
</template>

<script>
import api from '@/api/index'
import store from './store'
import auth from '../auth/store'
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
    },
    login () {
      return auth.state.login
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
    },
    logout () {
      console.log('logout')
      auth.commit('logout')
    }
  },

  mounted () {
    auth.commit('getLoginInfoByStore')
    if (this.login) {
      this.getUserInfo()
    }
  },

  onShow () {
    console.log('onShow')
    console.log(this.topic)
    if (this.login && this.topic.length < 1) {
      console.log('2333')
      this.getUserInfo()
    }
  }

}
</script>
