// 导入自己封装的request
import request from '../../utils/request.js'

// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前tab栏
    current:0,
    // 搜索关键词
    keyword:'',
    // 商品列表数据
    goodsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   * options是url的参数对象
   */
  onLoad: function (options) {
    // keyword是url中的参数
    const {keyword}=options
    this.setData({
      keyword:keyword
    })

    // 请求商品列表的数据
    request({
      url:'/goods/search',
      data:{
        query:this.data.keyword,
        pagenum:1,
        pagesize:10
      }
    }).then(res=>{
      const {message}=res.data
      // 修改价格数据 - 保留小数点后两位
      const goodsList=message.goods.map(v=>{
        v.goods_price = Number(v.goods_price).toFixed(2)
        return v;
      })
      // 把数据存到goodsList中
      this.setData({
        goodsList:message.goods
      })
    })
  },

  // 切换tab栏时触发
  handleClick(e){
    // 获取index
    const { index } = e.currentTarget.dataset
    // 改变current值
    this.setData({
      current: index
    })
  }
})