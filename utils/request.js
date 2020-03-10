/**
 * 封装一个异步请求的工具库
 * 基于wx.request来实现axios的部分功能
 * 
 * 1.调用返回一个promise
 * 例如：
 * axios({
 *    相关配置
 * }).then(res=>{}).catch(err=>{})
 * 
 * 2.配置基准路径
 * axios.defaults.baseURL=''
 * 
 * 3.错误拦截
 * axios.onError=()=>{}
 */


/**
 * 主函数
 * 
 * @params
 *   参数 |  类型  | 默认值
 * config | Object | {}
 */
const request =(config={})=>{

  // 判断url是否有基准路径
  // search：字符串正则方法
  if(config.url.search(/^http/)===-1){
    // 如果没有，再添加基准路径
    config.url = request.defaults.baseURL + config.url
  }

  // 函数应该返回一个promise对象
  // resolve：一般是请求成功后执行，相当于.then
  // reject：一般是请求失败后执行，相当于.catch
  return new Promise((resolve,reject)=>{
    // 只要进入到请求就显示加载中的提示框
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    // 发起请求
    wx.request({
      ...config,
      success(res){
        resolve(res)
      },
      fail(res){
        reject(res)
      },
      complete(res){
        // 执行错误的拦截器
        request.error(res)
        // 请求结束后隐藏提示框
        wx.hideLoading()
      }
    })
  })
}

/**
 * 设置基准路径
 */
request.defaults={
  baseURL:""
}

// 存储错误的回调函数，默认是一个空的函数
request.error=()=>{}
/**
 * request的错误拦截
 * 
 * @params
 * callback | 函数
 */
request.onError = (callback)=>{
  // 判断callback必须是一个函数
  if (typeof callback==="function"){
    request.error = callback
  }
}

// 暴露
export default request