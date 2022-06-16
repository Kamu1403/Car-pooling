// pages/personalinfo/change.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //输入提示的显示信息
    placeholder: '',
    //根据变量决定提示语
    infoArray: {
      name: '用户名',
      gender: '性别',
      phone: '手机号',
      email: '邮箱'
      //其他信息，可根据需要加
    },
    changeWhat: '', //修改信息的参数
    tmp: ''    //用于存新修改的信息
  },

  //将新输入的值赋给tmp
  valuechange(res) {
    this.setData({
      tmp: res.detail.value
    })
  },

  //提交数据库
  submit: function () {
    //写入数据库，并在下方加入返回前一个页面的函数
    var that = this;
    if (that.data.changeWhat == 'gender') {
      if (that.data.tmp == '男')
        that.data.tmp = 0;
      else if (that.data.tmp == '女')
        that.data.tmp = 1;
      else {
        wx.showToast({
          icon: 'error',
          title: '请输入男或女'
        })
        return;
      }
    }
    else if (that.data.changeWhat == 'phone') {
      if (that.data.tmp.length != 11 || isNaN(Number(that.data.tmp, 10))) {
        wx.showToast({
          icon: 'none',
          title: '请输入11位手机号，不允许有除数字外的字符'
        })
        return;
      }
    }
    else if (that.data.changeWhat == 'email') {
      var email = that.data.tmp;
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (reg.test(email)) {
        console.log("邮箱格式正确");
      } else {
        wx.showToast({
          icon: 'none',
          title: '邮箱格式不正确，请重新输入！'
        })
        return;
      }
    }
    else if(that.data.changeWhat == 'name'){
      if (that.data.tmp.length >= 20) {
        wx.showToast({
          icon: 'none',
          title: '用户名长度不可以超过20！'
        })
        return;
      }
    }

    //修改用户对应信息
    wx.request({
      method: 'POST',
      data: {
        'option': that.data.changeWhat,
        'useropenid': app.globalData.userInfo.useropenid,
        'value': that.data.tmp
      },
      url: 'http://124.71.160.151:3006/modifyuserinfo',
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '修改成功',
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1000)
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      placeholder: '请输入' + this.data.infoArray[options.changeWhat],
      changeWhat: options.changeWhat
    })
    wx.setNavigationBarTitle({
      title: '修改' + this.data.infoArray[options.changeWhat],
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