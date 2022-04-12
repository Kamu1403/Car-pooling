Page({

  /**
   * 页面的初始数据
   */
  data: {
    theme: "light",
    history:[
      {
        status:"正在进行",
        color:"red",
        time:"2022/4/12 14:54",
        from:"嘉定校区友园7号楼",
        to:"旋转门"
      },{
        status:"已完成",
        color:"green",
        time:"2022/4/10 09:34",
        from:"嘉定校区接待中心",
        to:"四平"
      },{
        status:"已取消",
        color:"gray",
        time:"2022/1/12 10:54",
        from:"嘉定校区马桶楼",
        to:"图书馆"
      }
    ],
  },

  jumpHistoryInfo() {
    wx.navigateTo({
      url: '/pages/personalInfo/history/historyInfo',
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

