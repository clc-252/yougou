//app.js

// 导入自己封装的request
import request from './utils/request.js'

App({
  onLaunch: function () {
    // 设置基准路径
    request.defaults.baseURL ='https://api-hmugo-web.itheima.net/api/public/v1'
  }
})