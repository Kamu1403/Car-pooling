// pages/report/report.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:""
  },
  bindFormSubmit: function(e) {
    //console.log(e.detail.value.textarea);
    const that=this;
    wx.request({
      method:'POST',
      data:{
        'reporter_openid':app.globalData.userInfo.useropenid,
        'suspect_openid':that.data.openid,
        'message':e.detail.value.textarea
      },
      url: 'http://124.71.160.151:3000/report',
      success:function(res2){
       console.log('成功');
       wx.showToast({
        title: "举报成功", // 提示的内容
        icon: "success", // 图标，默认success
        duration: 3000, // 提示的延迟时间，默认1500
        success: function () {
          wx.navigateBack();
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
    var that = this
    that.setData({
      openid: options.openid
    })
    console.log(that.data);
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