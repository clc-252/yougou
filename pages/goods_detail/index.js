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
  },

  // 添加到购物车
  handleAddCart(){
    // 判断本地中有没有数据，没有就等于一个空数据
    const goods=wx.getStorageSync('goods')||[];

    // 判断本地数据中有没有该商品，如果有数量+1
    // some循环数组，return的结果“只要有一个是true就返回true，反之就返回false”
    const exit=goods.some(v=>{
      // 存在数量+1
      if (v.goods_id === this.data.detail.goods_id){
        v.number+=1;
        // 提示用户
        wx.showToast({
          title: '数量+1',
          icon:'success'
        })
      }
      return v.goods_id === this.data.detail.goods_id
    })

    if(!exit){
      // 把当前商品添加到本地中
      goods.unshift({
        goods_id:this.data.detail.goods_id,
        goods_name: this.data.detail.goods_name,
        goods_price: this.data.detail.goods_price,
        goods_small_logo: this.data.detail.goods_small_logo,
        number:1
      })
    }
    wx.setStorageSync('goods', goods)
  }
})