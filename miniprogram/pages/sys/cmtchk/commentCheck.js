// pages/sys/cmtchk/commentCheck.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //存储的评论信息
    comment: [
      {
        status: "未通过",
        color: "red",
        teamid: "",
        openid: "",
        seq: 0,
      },
      {
        status: "待审核",
        color: "blue",
        openid: "",
        teamid: "",
        seq: 1,
      },
      {
        status: "正常",
        color: "green",
        openid: "",
        teamid: "",
        seq: 2,
      },
    ],
  },

  jumpDetail(e){
    var cmtid = e.currentTarget.dataset.src;
    wx.navigateTo({
      url: './cmt/commentDetail?cmtid=' + cmtid,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    //从数据库读取用户的基本信息
    wx.request({
      method: 'POST',
      url: 'http://124.71.160.151:3006/getcomments',
      success: function (res) {
        var list = [];
        for (let i = 0; i < res.data.length; i++) {
          var status;
          var color;
          if (res.data[i].status == 0) {
            status = "待审核";
            color = "blue";
          } else if (res.data[i].status == 1) {
            status = "通过";
            color = "green";
          } else if (res.data[i].status == 2) {
            status = "未通过";
            color = "red";
          } else {
            console.error('status not match!')
            return;
          }
          list = list.concat({
            status: status,
            color: color,
            teamid: res.data[i].team_seq,
            openid: res.data[i].openid,
            seq: res.data[i].id,
          });
        }
        that.setData({
          comment: list
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
      url: 'http://124.71.160.151:3006/getcomments',
      success: function (res) {
        var list = [];
        for (let i = 0; i < res.data.length; i++) {
          var status;
          var color;
          if (res.data[i].status == 0) {
            status = "待审核";
            color = "blue";
          } else if (res.data[i].status == 1) {
            status = "通过";
            color = "green";
          } else if (res.data[i].status == 2) {
            status = "未通过";
            color = "red";
          } else {
            console.error('status not match!')
            return;
          }
          list = list.concat({
            status: status,
            color: color,
            teamid: res.data[i].team_seq,
            openid: res.data[i].openid,
            seq: res.data[i].id,
          });
        }
        that.setData({
          comment: list
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