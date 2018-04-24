import Vue from 'vue'
import App from './App'

import './styles/custom.scss'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      'pages/logs/main',
      '^pages/index/main',
      'pages/details/main',
      'pages/notification/main',
      'pages/me/main',
      'pages/comment/main',
      'pages/user/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#1296db',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    },
    'tabBar': {
      'list': [{
        'pagePath': 'pages/index/main',
        'text': '首页',
        'iconPath': 'static/images/icon/home.png',
        'selectedIconPath': 'static/images/icon/home-fill.png'
      }, {
        'pagePath': 'pages/notification/main',
        'text': '消息',
        'iconPath': 'static/images/icon/message.png',
        'selectedIconPath': 'static/images/icon/message-fill.png'
      }, {
        'pagePath': 'pages/user/main',
        'text': '我的',
        'iconPath': 'static/images/icon/user.png',
        'selectedIconPath': 'static/images/icon/user-fill.png'
      }]
    }
  }
}
