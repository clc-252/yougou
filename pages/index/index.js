// 导入自己封装的request
import request from '../../utils/request.js'

Page({
  data:{
    // 轮播图数据
    swiperList:[],
    // 分类导航数据
    cateList:[],
    // 楼层数据
    floordata:[],
    // 是否显示返回顶部的按钮
    isShowTop:false
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad() {
    // 请求轮播图数据
    request({
      url:'/home/swiperdata'
    }).then(res=>{
      // console.log(res)
      const {message}=res.data
      this.setData({
        swiperList: message
      })
    })

    // 请求分类导航的数据
    request({
      url:'/home/catitems'
    }).then(res=>{
      const { message } = res.data
      const newData=message.map((v,i)=>{
        if(i===0){
          v.url='/pages/category/index'
        }
        return v
      })
      this.setData({
        cateList: newData
      })
    })

    // 请求楼层的数据
    request({
      url:'/home/floordata'
    }).then(res=>{
      console.log(res)
      const { message } = res.data
      this.setData({
        floordata: message
      })
    })
  },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  // 回到顶部
  handleToTop(){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  // 监听页面的滚动事件
  onPageScroll(e){
    const {scrollTop}=e;
    // 获取当前的状态
    let isShow = this.data.isShowTop;
    // 判断
    if (scrollTop>100){
      isShow=true
    }else{
      isShow = false
    }

    if (isShow === this.data.isShowTop) return;

    this.setData({
      isShowTop:isShow
    })
  }
})
