// pages/sys/accountMana.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theme: "light",
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
    ],
    //下弹菜单表
    showDialog: false,
    groups: [
      { text: 'aaa', type: 'warn', value: 0 },
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


  openDialog() {
    this.setData({
      dialogShow: true
    })
  },

  closeDialog() {
    this.setData({
      dialogShow: false
    })
  },

  tapDialogButton(e) {
    var that = this;
    const _btn = e.detail.item.text;
    var status = -1;
    if (_btn == '确定') {
      if (that.data.option == 1)
        status = 1;
      else if (that.data.option == 3)
        status = 0;
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
          that.onShow()
        }
      })
    }
    that.closeDialog()
  },

  close() {
    this.setData({
      showDialog: false,
    });
  },

  open(e) {
    var i = e.currentTarget.dataset.src;
    this.data.now_seq = i;
    if (this.data.userAccount[i].status == '封禁中') {
      this.setData({
        groups: [
          { text: '解除封禁', type: 'warn', value: 1 },
        ]
      });
    }
    else if (this.data.userAccount[i].status == '申诉中') {
      this.setData({
        groups: [
          { text: '查看申诉', value: 2 },
          { text: '解除封禁', type: 'warn', value: 1 },
        ]
      });
    }
    else {
      this.setData({
        groups: [
          { text: '封禁', type: 'warn', value: 3 },
        ]
      });
    }
    this.setData({
      showDialog: true,
    });
  },

  btnClick(e) {
    let { value } = e.detail
    this.data.option = value

    //判断值,执行相关操作
    switch (value) {
      case 1: //解除封禁
        this.openDialog() //弹确认对话框
        break;
      case 2: //查看申诉
        //直接弹出一个文本框内容
        break;
      case 3: //封禁
        this.openDialog() //弹确认对话框
        break;
    }
    this.close();
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
        console.log(res.data)
        var list = [];
        for (let i = 0; i < res.data.length; i++) {
          var status;
          var color;
          if (res.data[i].status == 0) {
            status = "封禁中";
            color = "red";
          } else if (res.data[i].status == 2) {
            status = "申诉中";
            color = "blue";
          } else if (res.data[i].status == 1) {
            status = "正常";
            color = "green";
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
            seq: i,
          });
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
        console.log(res.data)
        var list = [];
        for (let i = 0; i < res.data.length; i++) {
          var status;
          var color;
          if (res.data[i].status == 0) {
            status = "封禁中";
            color = "red";
          } else if (res.data[i].status == 2) {
            status = "申诉中";
            color = "blue";
          } else if (res.data[i].status == 1) {
            status = "正常";
            color = "green";
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
            seq: i,
          });
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