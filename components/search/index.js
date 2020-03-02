// components/search/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 组件传值
    keyword: {
      type: String,
      value: "搜索"   // 默认值
    },
    // 方法二：通过这个属性来控制文本的对齐方式
    align:{
      type:String,
      value:"center"
    }
  },

  // 声明外部扩展的样式
  // bgc：背景颜色    align：对齐方式
  externalClasses: ['bgc','align'],
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
