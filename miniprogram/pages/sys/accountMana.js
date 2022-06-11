// pages/sys/accountMana.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //存储的用户账户状态信息
    userAccount: [
      {
        status: "封禁中",
        color: "red",
        openid: "",
        username: "",
        userphone: "",
        seq: 0,
      },
      {
        status: "申诉中",
        color: "blue",
        openid: "",
        username: "",
        userphone: "",
        seq: 1,
      },
      {
        status: "正常",
        color: "green",
        openid: "",
        username: "",
        userphone: "",
        seq: 2,
      },
      {
        status: "已驳回",
        color: "red",
        openid: "",
        username: "",
        userphone: "",
        seq: 3,
      },
    ],
    //actionsheet内容
    showDialog: false,
    groups: [
      //此处表示actionsheet中的显示信息与value值
      //操作与返回值对应关系为：0：错误  1：封禁  2：解封  3：继续封禁  4：查看申诉
      { text: '加载失败', value: 0 },
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
    //当前选择的操作
    option: 0
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
    var status = -1; //需要传入数据库的状态参数
    if (_btn == '确定') {
      switch(that.data.option){
        case 1: //封禁
          status = 0;
          break;
        case 2: //解除封禁
          status = 1;
          break;
        case 3: //继续封禁
          status = 3;
          break;
        case 4: //申诉
          break;
      }

      if (status == -1)
        return;
      wx.request({
        method: 'POST',
        data: {
          'useropenid': that.data.userAccount[that.data.now_seq].openid,
          'status': status //解除封禁需要设置的标志位
        },
        url: 'http://124.71.160.151:3006/userban',
        success: function (res) {
          wx.showToast({
            title: '成功',
          })
          //刷新一下
          that.onShow()
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
    console.log(i);
    that.data.now_seq = i;
    if (that.data.userAccount[i].status == '封禁中') {
      that.setData({
        groups: [
          { text: '解除封禁', type: 'warn', value: 2 },
        ]
      });
    }
    else if (that.data.userAccount[i].status == '申诉中') {
      that.setData({
        groups: [
          { text: '查看申诉', value: 4 },
          { text: '继续封禁', value: 3 },
          { text: '解除封禁', type: 'warn', value: 2 },
        ]
      });
    }
    else if (that.data.userAccount[i].status == '正常'){
      that.setData({
        groups: [
          { text: '封禁', type: 'warn', value: 1 },
        ]
      });
    }
    else if (that.data.userAccount[i].status == '已驳回'){
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
      case 1: //封禁
      case 2: //解除封禁
      case 3: //继续封禁
        that.openDialog() //弹确认对话框
        break;
      case 4: //申诉
        wx.navigateTo({
          url: './complaint/complaint?openid=' + that.data.userAccount[that.data.now_seq].openid + '&name=' + that.data.userAccount[that.data.now_seq].username,
        });
        break;
    }
    that.close();
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    var that = this;
    //从数据库读取用户的基本信息
    wx.request({
      method: 'POST',
      url: 'http://124.71.160.151:3006/getuserstatus',
      success: function (res) {
        var list = [];
        var seq = 0;
        for (let i = 0; i < res.data.length; i++) {
          var status;
          var color;
          if (res.data[i].openid == app.globalData.userInfo.useropenid)
            continue;
          if (res.data[i].status == 0) {
            status = "封禁中";
            color = "red";
          } else if (res.data[i].status == 2) {
            status = "申诉中";
            color = "blue";
          } else if (res.data[i].status == 1) {
            status = "正常";
            color = "green";
          } else if (res.data[i].status == 3){
            status = "已驳回";
            color = "red";
          } else {
            console.error('status not match!')
            return;
          }
          list = list.concat({
            status: status,
            color: color,
            openid: res.data[i].openid,
            username: res.data[i].name,
            userphone: res.data[i].phone == null ? "未设置" : res.data[i].phone,
            seq: seq,
          });
          seq++;
        }
        that.setData({
          userAccount: list
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
    var that = this;
    //从数据库读取用户的基本信息
    wx.request({
      method: 'POST',
      url: 'http://124.71.160.151:3006/getuserstatus',
      success: function (res) {
        var list = [];
        var seq = 0;
        for (let i = 0; i < res.data.length; i++) {
          var status;
          var color;
          if (res.data[i].openid == app.globalData.userInfo.useropenid)
            continue;
          if (res.data[i].status == 0) {
            status = "封禁中";
            color = "red";
          } else if (res.data[i].status == 2) {
            status = "申诉中";
            color = "blue";
          } else if (res.data[i].status == 1) {
            status = "正常";
            color = "green";
          } else if (res.data[i].status == 3){
            status = "已驳回";
            color = "red";
          } else {
            console.error('status not match!')
            return;
          }
          list = list.concat({
            status: status,
            color: color,
            openid: res.data[i].openid,
            username: res.data[i].name,
            userphone: res.data[i].phone == null ? "未设置" : res.data[i].phone,
            seq: seq,
          });
          seq++;
        }
        that.setData({
          userAccount: list
        });
      }
    })
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