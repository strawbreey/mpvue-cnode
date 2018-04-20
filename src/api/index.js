import wx from 'wx'
import Fly from 'flyio'

const api = new Fly()

api.interceptors.request.use((request) => {
  // 获取小程序自定义参数
  let extConfig = wx.getExtConfigSync()
  extConfig = {
    name: 'wechat',
    apiHost: 'api.tk.welianjie.com',
    apiVersion: 'v1',
    appKey: 'b348cef0-3c12-11e8-b867-057985c56d40',
    appSecret: 'b348d250-3c12-11e8-869e-95bf5fbaca8b'
  }

  let params = request.body
  wx.showNavigationBarLoading()
  let data = params || {}
  let timestamp = new Date().valueOf()
//   let nonce = util.randomString()
  let secret = extConfig.appSecret
  let objData = {
    app_key: extConfig.appKey,
    timestamp: timestamp
    // nonce: nonce
  }
  params = Object.assign(objData, data)
  try {
    var value = wx.getStorageSync('session_id')
    if (value) {
      request.headers['session_id'] = value
      params = Object.assign(params, {session_id: value})
    }
  } catch (e) {
    // Do something when catch error
  }
//   params.sign = sign(params, secret)
  request.headers['Content-Type'] = 'application/json'
  request.body = params
  return request
})

api.interceptors.response.use(
  (response, promise) => {
    wx.hideNavigationBarLoading()
    return promise.resolve(response.data)
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
