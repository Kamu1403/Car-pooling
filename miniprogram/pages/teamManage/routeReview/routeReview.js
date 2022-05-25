// pages/teamManage/routeReview/routeReview.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionList: ['punctual'],
    files: [],
    score: 0,
    textLen: 0,
    maxTextLen: 250,
    text: '',
    team_seq: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    that.setData({
      team_seq: options.team_seq,
    })
    // console.log(this.data.team_seq)
  },

  chooseImage() {
    const that = this;
    if (that.data.files.length >= 1) {
      wx.showToast({
        title: '最多只能上传一张图片',
        icon: 'none',
      })
      return;
    }
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths),
        });
      },
    });
  },

  previewImage(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files, // 需要预览的图片http链接列表
    });
  },

  submit: function () {
    //用于测试，后期应当写入数据库，并在下方加入返回前一个页面的函数
    if (this.data.files.length == 0) {
      wx.showToast({
        title: '请上传一张照片',
        icon: 'none'
      })
      return;
    }
    wx.request({
      method: 'POST',
      data: {
        'text': this.data.text,
        'useropenid': app.globalData.userInfo.useropenid,
        'photo': this.data.files[0],
        'team_seq': this.data.team_seq
      },
      url: 'http://124.71.160.151:3004/insertReview',
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '修改成功',
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1000)
      }
    })
  },

  scoring: function (e) {
    //console.log(e.detail.fraction)
    let that = this
    let optionsList = this.data.optionList
    optionsList.map(item => {
      const child = this.selectComponent(`#${item}`);
      // console.log(child.data.number)
      let key = `${item}Fraction`
      this.setData({
        [key]: child.data.number
      })
    })
    that.setData({
      score: e.detail.fraction
    })
  },

  getWords(e) {
    let page = this;
    // 设置最大字符串长度(为-1时,则不限制)
    let maxTextLen = page.data.maxTextLen;
    // 文本长度
    let textLen = e.detail.value.length;

    page.setData({
      maxTextLen: maxTextLen,
      textLen: textLen,
      text: e.detail.value
    });
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