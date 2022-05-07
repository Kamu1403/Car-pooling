// pages/teamManage/teamManage.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theme: "light",
    TeamList: [],
  },

  jumpDetailInfo(team_seq) {
    wx.navigateTo({
      url: '/pages/teamManage/singleTeam?team_seq=' + team_seq,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 绑定search函数
    this.setData({
      search: this.search.bind(this)
    });

    this._getTeamInfo(app.globalData.userInfo.useropenid); // 获取数据
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this._getTeamInfo(app.globalData.userInfo.useropenid); // 获取数据
  },

  /****************************************
   * Function: 向数据库要队伍的数据
   * Parameter: 如果num=0，说明取全部的；
   ****************************************/
  _getTeamInfo: function (useropenid) {
    let that = this;

    wx.request({
      method: 'POST',
      data: {
        'useropenid': useropenid,
      },
      url: 'http://124.71.160.151:3004/getTeamInfo',
      success: function (res) {
        console.log(res)
        that.setData({
          TeamList: res.data
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