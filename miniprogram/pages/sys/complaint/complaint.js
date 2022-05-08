// pages/sys/complaint/complaint.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '未知',
    username: '',
    content: '未加载',
    option: 0,
    //确定对话框
    dialogShow: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
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

  goBan() {
    this.showDialog();
    this.data.option = 3;
  },

  release() {
    this.showDialog();
    this.data.option = 2;
  },


  tapDialogButton(e) {
    var that = this;
    const _btn = e.detail.item.text;
    var status = -1; //需要传入数据库的状态参数
    if (_btn == '确定') {
      switch (that.data.option) {
        case 1: //封禁
          status = 0;
          break;
        case 2: //解除封禁
          status = 1;
          break;
        case 3: //继续封禁
          status = 3;
          break;
        case 4: //申诉
          break;
      }

      if (status == -1)
        return;
      wx.request({
        method: 'POST',
        data: {
          'useropenid': that.data.openid,
          'status': status //解除封禁需要设置的标志位
        },
        url: 'http://124.71.160.151:3006/userban',
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


  goBack() {
    wx.navigateBack();
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    that.data.openid = options.openid;
    wx.request({
      method: 'POST',
      data:{
        'useropenid': that.data.openid,
      },
      url: 'http://124.71.160.151:3006/getusercomplaint',
      success: function (res) {
        that.setData({
          openid: options.openid,
          username: options.name,
          content: res.data[0].message,
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