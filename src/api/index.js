// import wx from 'wx'
import Fly from 'flyio/dist/npm/wx.js'
import _ from 'lodash'

const api = new Fly()

api.config.baseURL = 'https://cnodejs.org/api/v1'

api.interceptors.request.use((request) => {
  // 获取小程序自定义参数
  let params = request.body

  // 从缓存中获取token
  try {
    var accesstoken = wx.getStorageSync('accesstoken')

    // 如果参数中存在accesstoken则说明一定要登录, 否则不需要登录
    if (_.has(params, 'accesstoken')) {
      // 判断用户是否登录
      if (accesstoken && params.accesstoken === '') {
        params.accesstoken = accesstoken
      } else if (params.accesstoken === '') {
        wx.showModal({
          title: '提示',
          cancelText: '取消',
          confirmText: '登录',
          content: '该操作需要登录账户, 请问是否现在登录?',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.navigateTo({
                url: '/pages/auth/main'
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        return Promise.resolve(false)
      }
    } else {
      if (accesstoken) {
        params.accesstoken = accesstoken
      }
    }
  } catch (e) {
    // Do something when catch error
  }
  request.headers['Content-Type'] = 'application/json'
  request.body = params
  return request
})

api.interceptors.response.use(
  (response, promise) => {
    wx.hideNavigationBarLoading()
    return promise.resolve(response.data.data ? response.data.data : response.data)
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
