Page({

  /**
   * 页面的初始数据
   */
  data: {
    test: {
      item1: {
        'name': '海绵宝宝',
        'dbname': 'db1',
      },
      item2: {
        'name': '派大星',
        'dbname': 'db2',
      }
    },
    showActionsheet: false,//弹窗状态值
    groups: [//弹窗信息
      { text: '操作1', value: 1 },
      { text: '操作2', value: 2 },
      { text: '操作3', value: 3 },
    ],
    nowClickValue: ''//存储当前按下按钮的值
  },

  //组件绑定的事件
  btnClick(e) {
    let { value } = e.detail
    console.log("点击了：", value)

    //判断值,执行相关操作
    switch (value) {
      case 1:
        console.log("点击了1,执行相关操作")
        break
      case 2:
        console.log("点击了2，执行相关操作")
        break
      case 3:
        console.log("点击了3，执行相关操作")
        break
    }
  },

  //按钮绑定的事件
  onclick(e) {
    //取值
    this.data.nowClickValue = e.currentTarget.dataset.value
    console.log("当前点击的按钮数据库名称:", this.data.nowClickValue)

    this.setData({
      
      showActionsheet: true//显示弹窗
    })

  },
})