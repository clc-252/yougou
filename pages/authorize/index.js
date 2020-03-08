// 导入自己封装的request
import request from '../../utils/request.js'

// pages/authorize/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 处理授权
  handleAuthorize(e){
    // 获取需要的数据
    const { encryptedData, iv, rawData, signature}=e.detail

    // 通过wx.login获取code
    wx.login({
      success(res) {
        if (res.code) {
          const data={
            encryptedData,
            iv,
            rawData,
            signature,
            code:res.code
          }
          //发起网络请求
          request({
            url: '/users/wxlogin',
            data,
            method:'POST'
          }).then(res=>{
            console.log(res)
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})