// pages/sys/report/report.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //存储的用户账户状态信息
    report: [
      {
        status: "已处理",
        color: "green",
        reporterId: "",
        suspecterId: "",
        message: "",
        seq: 0,
      },
      {
        status: "待处理",
        color: "blue",
        reporterId: "",
        suspecterId: "",
        message: "",
        seq: 1,
      },
    ],
    //actionsheet内容
    showDialog: false,
    groups: [
      //此处表示actionsheet中的显示信息与value值
      //操作与返回值对应关系为：1：封禁被举报者  2：封禁举报者  0：错误
      { text: '封禁被举报者', type: 'warn', value: 1 },
      { text: '封禁举报者', type: 'warn', value: 2 },
    ],
    //确定对话框
    dialogShow: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    //当前选择的用户索引
    now_seq: 0,
    //当前选择操作
    option: 0,
  },


  //打开确认弹窗
  openDialog() {
    this.setData({
      dialogShow: true
    })
  },
  //关闭确认弹窗 
  closeDialog() {
    this.setData({
      dialogShow: false
    })
  },

  //点击确认弹窗某个选项的响应
  tapDialogButton(e) {
    var that = this;
    const _btn = e.detail.item.text;
    var openid = '';
    if (_btn == '确定') {
      switch (that.data.option) {
        case 1: //封禁被举报者
          openid = that.data.report[that.data.now_seq].suspecterId;
          break;
        case 2: //封禁举报者
          openid = that.data.report[that.data.now_seq].reporterId;
          break;
      }

      if (openid == '')
        return;
      //封禁请求
      wx.request({
        method: 'POST',
        data: {
          'useropenid': openid,
          'status': 0,  //无论如何都是封禁
        },
        url: 'http://124.71.160.151:3006/userban',
        success: function (res) {
          wx.showToast({
            title: '成功',
          })
        }
      });
      //举报事件完成请求
      wx.request({
        method: 'POST',
        data: {
          'report_id': openid = that.data.report[that.data.now_seq].reporterId,
          'suspect_id': that.data.report[that.data.now_seq].suspecterId,
        },
        url: 'http://124.71.160.151:3006/finishreport',
        success: function (res) {
          //刷新一下
          that.onLoad()
        }
      })
    }
    that.closeDialog()
  },



  //关闭actionsheet
  close() {
    this.setData({
      showDialog: false,
    });
  },

  //打开actionsheet
  open(e) {
    var that = this;
    var i = e.currentTarget.dataset.src;
    that.data.now_seq = i;
    if (that.data.report[i].status == '未处理'){
      that.setData({
        groups: [
          { text: '封禁被举报者', type: 'warn', value: 1 },
          { text: '封禁举报者', type: 'warn', value: 2 },
        ]
      });
    }else {
      that.setData({
        groups: [
        ]
      });
    }
    that.setData({
      showDialog: true,
    });
  },

  //按下actionsheet中某个选项的响应
  btnClick(e) {
    var that = this;
    let { value } = e.detail
    that.data.option = value
    //判断值,执行相关操作
    switch (value) {
      case 1: //封禁被举报者
      case 2: //封禁举报者
        that.openDialog() //弹确认对话框
        break;
    }
    that.close();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    //从数据库读取用户的基本信息
    wx.request({
      method: 'POST',
      url: 'http://124.71.160.151:3006/getreport',
      success: function (res) {
        var list = [];
        for (let i = 0; i < res.data.length; i++) {
          var status;
          var color;
          if (res.data[i].status == 0) {
            status = "已处理";
            color = "green";
          } else if (res.data[i].status == 1) {
            status = "未处理";
            color = "blue";
          } else {
            console.error('status not match!')
            return;
          }
          list = list.concat({
            status: status,
            color: color,
            reporterId: res.data[i].reporter_openid,
            suspecterId: res.data[i].suspect_openid,
            message: res.data[i].message,
            seq: i,
          });
        }
        that.setData({
          report: list
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})