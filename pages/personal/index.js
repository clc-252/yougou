// pages/personal/index.js
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

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
  },
  // 收货地址
  handleAddress(){
    wx.chooseAddress()
  },

  // 联系客服
  handleContact(){
    wx.makePhoneCall({
      phoneNumber: '400-618-4000'  // 假的
    })
  }
})