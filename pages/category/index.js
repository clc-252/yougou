// pages/category/index.js

// 导入自己封装的request
import request from '../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    // 分类页面数据列表
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求分类页面的数据
    request({
      url:'/categories'
    }).then(res=>{
      console.log(res)
      const {message}=res.data
      this.setData({
        list:message
      })
    })
  },
  // 切换左边分类菜单栏时触发
  handleClick(e){
    // 获取index
    const {index}=e.currentTarget.dataset
    // 改变current值
    this.setData({
      current:index
    })
  }
})