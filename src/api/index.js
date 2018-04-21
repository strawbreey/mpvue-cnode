// import wx from 'wx'
import Fly from 'flyio/dist/npm/wx.js'

const api = new Fly()

api.config.baseURL = 'https://cnodejs.org/api/v1'

api.interceptors.request.use((request) => {
  // 获取小程序自定义参数
  let params = request.body
  console.log(request)
  try {
    var token = wx.getStorageSync('token')
    if (token) {
      request.headers['session_id'] = token
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
