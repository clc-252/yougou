// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货信息
    address: {},
    // 购物车商品数据
    goods: [],
    // 总价格
    allPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 将收货地址的数据从本地取出来
    this.setData({
      address: wx.getStorageSync('address') || {}
    })
  },
  onShow() {
    // 因为data和onload只会执行一次，所以要在onshow中执行：每一次打开页面的时候获取一次本地数据
    this.setData({
      goods: wx.getStorageSync('goods') || []
    })

    // 计算总价格
    this.handleAllPrice();
  },

  handleGetAddress() {
    // 获取收货地址
    wx.chooseAddress({
      success: (res) => {
        // 把地址信息存到address中
        this.setData({
          address: {
            // 收货人
            userName: res.userName,
            // 手机号码
            telNumber: res.telNumber,
            // 详细地址
            detail: res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        })

        // 将数据保存到本地
        wx.setStorageSync('address', this.data.address)
      }
    })
  },

  // 计算总价格
  handleAllPrice() {
    let price = 0;
    // 循环goods数组，拿到每个商品的价格
    this.data.goods.forEach(v => {
      price += v.goods_price * v.number
    })

    // 修改总价格
    this.setData({
      allPrice: price
    })
  },


  // 方法二：添加或减少商品数量
  handleGoodsNum(e) {
    // number是1 or -1
    const {
      index,
      number
    } = e.currentTarget.dataset
    // 点击当前商品，数量+1
    this.data.goods[index].number += number;

    // 如果商品数量为0 提示用户是否删除商品
    if (this.data.goods[index].number === 0) {
      wx.showModal({
        title: '提示',
        content: '是否删除商品',
        success: (res) => {
          if (res.confirm) {
            // 删除当前商品
            this.data.goods.splice(index, 1)

            // 修改data中goods的数据
            this.setData({
              goods: this.data.goods
            })
          }
        }
      })
    }

    // 修改data中goods的数据
    this.setData({
      goods: this.data.goods
    })
  }

  // 方法一：
  /* 点击+增加商品数量
    handleAdd(e) {
      const { index, number } = e.currentTarget.dataset
      // 点击当前商品，数量+1
      this.data.goods[index].number += number;
      // 修改data中goods的数据
      this.setData({
        goods: this.data.goods
      })
    },

    减少商品数量
    handleReduce(e){
      const { index, number } = e.currentTarget.dataset
      // 点击当前商品，数量-1
      this.data.goods[index].number -= number;
      // 修改data中goods的数据
      this.setData({
        goods: this.data.goods
      })
    } */
})