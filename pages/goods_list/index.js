// 导入自己封装的request
import request from '../../utils/request.js'

// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前tab栏
    current: 0,
    // 搜索关键词
    keyword: '',
    // 商品列表数据
    goodsList: [],
    // 显示哪个提示文字
    hasMore: true,
    // 当前页面
    pageNum: 1,
    // 是否正在加载中
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   * options是url的参数对象
   */
  onLoad: function (options) {
    // keyword是url中的参数
    const { keyword } = options
    this.setData({
      keyword: keyword
    })

    // 请求商品列表的数据
    this.getGoods();
  },

  // 切换tab栏时触发
  handleClick(e) {
    // 获取index
    const { index } = e.currentTarget.dataset
    // 改变current值
    this.setData({
      current: index
    })
  },

  // 将请求商品列表封装起来
  getGoods() {
    // 如果没有数据了就不要发送请求
    if (this.data.hasMore === false) {
      return;
    }
    request({
      url: '/goods/search',
      data: {
        query: this.data.keyword,
        pagenum: this.data.pageNum,
        pagesize: 10
      }
    }).then(res => {
      const { message } = res.data
      // 修改价格数据 - 保留小数点后两位
      const goodsList = message.goods.map(v => {
        v.goods_price = Number(v.goods_price).toFixed(2)
        return v;
      })
      // 把数据存到goodsList中
      this.setData({
        // 合并原来请求的数据和新请求的数据
        goodsList: [...this.data.goodsList, ...goodsList],
        // 当前此次请求完毕
        loading: false
      })

      // 判断是否是最后一页数据
      if (this.data.goodsList.length >= message.total) {
        this.setData({
          hasMore: false
        })
      }
    })
  },

  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    // 需要等到上一次请求完成之后再执行下一页的数据
    if (this.data.loading === false) {
      this.setData({
        // 每次发起请求前重新设置loading的值为true，代表正在加载
        loading: true,
        pageNum: this.data.pageNum + 1
      })
      // 请求商品列表的数据
      this.getGoods();
    }
  }

})