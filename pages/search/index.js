// 导入自己封装的request
import request from '../../utils/request.js'

// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 输入框的值
    inputValue:'',
    // 搜索关键列表
    recommend:[]
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

    // 如果有value值才发起请求
    if(!value) {
      // 把搜索列表清空
      this.setData({
        recommend: []
      })
      return;
    };

    // 请求输入建议列表
    request({
      url:'/goods/qsearch',
      data:{
        query:value
      }
    }).then(res=>{
      const {message}=res.data;
      // 保存到搜索建议的数组
      this.setData({
        recommend:message
      })
    })
  },
  // 点击取消按钮时触发
  handleCancel(){
    this.setData({
      inputValue:'',
      recommend: []
    })
  }
})