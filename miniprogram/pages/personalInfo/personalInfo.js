// pages/personalinfo/personalinfo.js
var app=getApp();
Page({
  /**
   * 页面的初始数据
   */

  data:{
    //页面的5个数据
    userphoto: '',
    username: '',
    usergender: '',
    userphone: '',
    useremail: '',

    //性别映射列表
    sex_array: ['男', '女']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that=this;
    //从数据库读取用户的基本信息
    wx.request({
      method:'POST',
      data:{
        'useropenid': app.globalData.userInfo.useropenid
      },
      url: 'http://124.71.160.151:3006/getuserinfo',
      success:function(res){
        that.setData({
          username: res.data[0].name,
          usergender: res.data[0].gender,
          userphoto: res.data[0].photo,
          userphone: res.data[0].phone == null? '' : res.data[0].phone,
          useremail: res.data[0].email == null? '' : res.data[0].email,
        })
        console.log(res.data)
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
    var that=this;
    //从数据库读取用户的基本信息
    wx.request({
      method:'POST',
      data:{
        'useropenid': app.globalData.userInfo.useropenid
      },
      url: 'http://124.71.160.151:3006/getuserinfo',
      success:function(res){
        that.setData({
          username: res.data[0].name,
          usergender: res.data[0].gender,
          userphoto: res.data[0].photo,
          userphone: res.data[0].phone == null? '未设置' : res.data[0].phone,
          useremail: res.data[0].email == null? '未设置' : res.data[0].email,
        })
        console.log(res.data)
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