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
    recommend:[],
    // 等待上一次请求返回再修改
    loading:false,
    // 记录文本框上一次的值
    lastValue:''
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
   this.getRecommend();
  },
  // 请求输入建议列表
  getRecommend(){
    // 保证一开始灯是关着的
    if(this.data.loading===false){
      // 进门之后开灯
      this.setData({
        loading:true,
        lastValue:this.data.inputValue
      })
      request({
        url: '/goods/qsearch',
        data: {
          query: this.data.inputValue
        }
      }).then(res => {
        const { message } = res.data;
        // 保存到搜索建议的数组
        this.setData({
          recommend: message,
          loading:false  // 完成之后离开关灯
        })

        // 判断上一次输入框的值是否当前输入框的值相同，如果不同，就要再次发起请求
        if (this.data.lastValue !== this.data.inputValue) {
          this.getRecommend();
        }
      })
    }

  },
  // 点击取消按钮时触发
  handleCancel(){
    this.setData({
      inputValue:'',
      recommend: []
    })
  },
  // 点击完成(回车)按钮时触发
  handleEnter(){
    wx.redirectTo({
      url:'/pages/goods_list/index?keyword='+this.data.inputValue
    })
  }
})