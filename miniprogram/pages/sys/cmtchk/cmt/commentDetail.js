// pages/sys/cmtchk/cmt/commentDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamid: '未知',
    openid: '未知',
    photo: '',
    content: '未加载',
    option: 0,
    //确定对话框
    dialogShow: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    //评论id
    cmtid: '',
  },

  showDialog() {
    this.setData({
      dialogShow: true,
    })
  },

  closeDialog() {
    this.setData({
      dialogShow: false,
    })
  },

  checkSuccess() {
    this.showDialog();
    this.data.option = 1;
  },

  checkfailure() {
    this.showDialog();
    this.data.option = 2;
  },

  goBack() {
    wx.navigateBack();
  },

  tapDialogButton(e){
    var that = this;
    const _btn = e.detail.item.text;
    var status = -1; //需要传入数据库的状态参数
    if (_btn == '确定') {
      switch (that.data.option) {
        case 1: //通过
          status = 1;
          break;
        case 2: //驳回
          status = 2;
          break;
      }
      if (status == -1)
        return;
      wx.request({
        method: 'POST',
        data: {
          'cmtid': that.data.cmtid,
          'status': status //解除封禁需要设置的标志位
        },
        url: 'http://124.71.160.151:3006/checkcomment',
        success: function (res) {
          wx.showToast({
            title: '成功',
          });
          setTimeout(()=>{
            wx.navigateBack()
          }, 1000);
        }
      })
    }
    that.closeDialog()
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    that.data.cmtid = options.cmtid;
    wx.request({
      method: 'POST',
      data:{
        'cmtid': options.cmtid,
      },
      url: 'http://124.71.160.151:3006/getcommentdetail',
      success: function (res) {
        that.setData({
          teamid: res.data[0].team_seq,
          openid: res.data[0].openid,
          content: res.data[0].text,
          photo: res.data[0].photo,
        })
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