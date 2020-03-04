// 导入自己封装的request
import request from '../../utils/request.js'

// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    // 当前tab栏的索引
    current:0,
    // 图片预览
    picUrls:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    // 请求商品详情数据
    request({
      url:'/goods/detail',
      data:{
        goods_id: options.id
      }
    }).then(res=>{
      // console.log(res)
      const {message}=res.data
      // 获取图片的连接
      const picUrls=message.pics.map(v=>{
        return v.pics_big
      })
      // 存储到data
      this.setData({
        detail:message,
        picUrls
      })
    })
  },
  // 切换tab栏时触发
  handleTabClick(e){
    const {index}=e.currentTarget.dataset
    this.setData({
      current:index
    })
  },

  // 图片预览
  handlePreview(e){
    // 获取当前图片的索引值
    const { index } = e.currentTarget.dataset

    wx.previewImage({
      current: this.data.picUrls[index], // 当前显示图片的http链接
      urls: this.data.picUrls // 需要预览的图片http链接列表
    })
  },

  // 跳转到购物车页面
  handleToCart(){
    // wx.switchTab()：可跳转到tabtar页面
    wx.switchTab({
      url:'/pages/cart/index'
    })
  }
})