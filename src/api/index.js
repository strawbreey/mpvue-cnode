// import wx from 'wx'
import Fly from 'flyio/dist/npm/wx.js'
import _ from 'lodash'

const api = new Fly()

api.config.baseURL = 'https://cnodejs.org/api/v1'

api.interceptors.request.use((request) => {
  // 获取小程序自定义参数
  let params = request.body
  console.log(request)
  console.log()

  // 从缓存中获取token
  try {
    var accesstoken = wx.getStorageSync('accesstoken')

    // 如果参数中存在accesstoken则说明一定要登录
    if (_.has(params, 'accesstoken')) {
      if (accesstoken) {
        params.accesstoken = accesstoken
      } else {
        console.log('请先登录')
        wx.navigateTo({
          url: '/pages/auth/main'
        })
        // return false
      }
    } else {
      if (accesstoken) {
        params.accesstoken = accesstoken
      }
    }
  } catch (e) {
    // Do something when catch error
  }
  console.log('2222')

  request.headers['Content-Type'] = 'application/json'
  request.body = params
  return request
})

api.interceptors.response.use(
  (response, promise) => {
    wx.hideNavigationBarLoading()
    return promise.resolve(response.data.data)
  },
  (err, promise) => {
    wx.hideNavigationBarLoading()
    wx.showToast({
      title: err.message,
      icon: 'none'
    })
    return promise.resolve()
  }
)

export default api
