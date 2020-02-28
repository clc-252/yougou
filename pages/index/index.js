// 导入自己封装的request
import request from '../../utils/request.js'

Page({
  data:{
    // 轮播图数据
    swiperList:[]
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
  }
})
