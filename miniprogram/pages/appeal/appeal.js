// pages/appeal/appeal.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  bindFormSubmit: function(e) {
    //console.log(e.detail.value.textarea);
    wx.request({
      method:'POST',
      data:{
        'useropenid':app.globalData.userInfo.useropenid,
        'userrole':app.globalData.userInfo.userrole,
        'usermessage':e.detail.value.textarea
      },
      url: 'http://124.71.160.151:3000/appeal',
      success:function(res2){
       console.log('成功');
       wx.showToast({
        title: "提交成功", // 提示的内容
        icon: "success", // 图标，默认success
        duration: 3000, // 提示的延迟时间，默认1500
        success: function () {
          wx.switchTab({
            url: '/pages/login/login',
          })
        }
      })
      },
      fail:function () {
        console.log("接口调用失败的回调函数");
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})