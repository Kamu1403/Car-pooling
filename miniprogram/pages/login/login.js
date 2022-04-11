// pages/login/login.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logined:false,
    userInfo:{},
    usergender:0,
    username:"未登录",
    userphoto:"",
    useropenid:""
  },
  //登录所用函数
  getUserProfile(e) {
    const that=this;
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    //特别地，getUserProfile不能获得openid，因此额外调用云函数实现
    wx.getUserProfile({
    desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res) => {
      wx.cloud.callFunction(
        {
          name:"login",
          success:(ress)=>{
            console.log(ress);
            that.setData({
              useropenid:ress.result.openid
            })
            app.globalData.userInfo.useropenid=ress.result.openid;
          }        
        }
      );
        this.setData({
        userInfo: res.userInfo,
        usergender:res.userInfo.gender,
        username:res.userInfo.nickName,
        userphoto:res.userInfo.avatarUrl,
        logined: true
        })
        app.globalData.userInfo.usergender=res.userInfo.gender;
        app.globalData.userInfo.username=res.userInfo.nickName;
        app.globalData.userInfo.userphoto=res.userInfo.avatarUrl;
        app.globalData.logined=true;
        console.log(app.globalData.userInfo);
    }
    })
  },
  logout()
  {
    this.setData({
      logined: false,
      useropenid:''
    })
    app.globalData.logined=true;
    app.globalData.userInfo.useropenid='';
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