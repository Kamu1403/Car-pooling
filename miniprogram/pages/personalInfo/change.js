// pages/personalinfo/change.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder: '', //输入提示的显示信息
    //相当于根据变量决定提示语
    infoArray:{
      name:'用户名',
      //其他信息，可根据需要加
    },

    tmp:''    //用于存新修改的信息
  },

  valuechange(res){
    this.setData({
      tmp: res.detail.value
    })
  },

  submit:function(res){
    //用于测试，后期应当写入数据库，并在下方加入返回前一个页面的函数
    wx.setNavigationBarTitle({
      title: this.data.tmp,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      placeholder: '请输入' + this.data.infoArray[options.changeWhat]
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