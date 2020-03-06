// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货信息
    address: {},
    // 购物车商品数据
    goods:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 将收货地址的数据从本地取出来
    this.setData({
      address: wx.getStorageSync('address') || {}
    })
  },
  onShow(){
    // 因为data和onload只会执行一次，所以要在onshow中执行：每一次打开页面的时候获取一次本地数据
    this.setData({
      goods: wx.getStorageSync('goods') || []
    })
  },

  handleGetAddress() {
    // 获取收货地址
    wx.chooseAddress({
      success: (res) => {
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

        // 将数据保存到本地
        wx.setStorageSync('address', this.data.address)
      }
    })
  }
})