// pages/showinfo/showinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    usergender:0,
    username:"未登录",
    userphoto:"",
    useropenid:"",
    userphone:"",
    userrole:0,
    userintro:"",
    useremail:"",
    userstatus:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      openid: options.openid
    })
    wx.request({
      method:'POST',
      data:{
        'useropenid':options.openid
      },
      url: 'http://124.71.160.151:3000/getuserinfo',
      success:function(res2){
        if(res2.data.length==0)//如果没有资料
        {
          ;
        }
        else//已经有账号
        {
          that.setData({
            usergender:res2.data[0].gender,
            username:res2.data[0].name,
            userphoto:res2.data[0].photo,
            userphone:res2.data[0].phone,
            userrole:res2.data[0].role,
            userintro:res2.data[0].intro,
            useremail:res2.data[0].email,
            userstatus:res2.data[0].status
          })
        }
      }
    })
  },
  jumpReport(e) {
    console.log(e.currentTarget.dataset.src);
    wx.navigateTo({
        url: '/pages/report/report?openid=' + e.currentTarget.dataset.src,
    })
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