// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货信息
    address: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  handleGetAddress() {
    // 获取收货地址
    wx.chooseAddress({
      success: (res) => {
        // console.log(res.postalCode)
        // console.log(res.provinceName)
        // console.log(res.cityName)
        // console.log(res.countyName)
        // console.log(res.detailInfo)
        // console.log(res.nationalCode)
        // 把地址信息存到address中
        this.setData({
          address: {
            // 收货人
            userName: res.userName,
            // 手机号码
            telNumber: res.telNumber,
            // 详细地址
            detail: res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        })
      }
    })
  }
})