// pages/teamManage/teamManage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theme: "light",
    TeamList: [{
      name: "队伍一",
      role: "队长",
      color: "red",
      time: "2022/4/12 14:54",
      from: "嘉定校区友园7号楼",
      to: "旋转门",
      phone: "13912345678"
    }, {
      name: "队伍二",
      role: "队员",
      color: "green",
      time: "2022/4/10 09:34",
      from: "嘉定校区接待中心",
      to: "四平",
      phone: "13912345678"
    }, {
      name: "队伍三",
      role: "队长",
      color: "red",
      time: "2022/1/12 10:54",
      from: "嘉定校区马桶楼",
      to: "图书馆",
      phone: "13912345678"
    }],
  },

  jumpDetailInfo() {
    wx.navigateTo({
      url: '/pages/teamManage/singleTeam',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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