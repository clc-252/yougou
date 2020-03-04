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
    current:0
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
      this.setData({
        detail:message
      })
    })
  },
  // 切换tab栏时触发
  handleTabClick(e){
    const {index}=e.currentTarget.dataset
    this.setData({
      current:index
    })
  }
})