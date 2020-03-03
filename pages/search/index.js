// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 输入框的值
    inputValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 监听用户输入
  handleInput(e){
    const {value}=e.detail;
    this.setData({
      inputValue:value
    })
    console.log(this.data.inputValue)
  }
})