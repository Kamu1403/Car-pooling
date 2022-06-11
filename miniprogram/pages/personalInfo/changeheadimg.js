// pages/personalinfo/changeheadimg.js
var app = getApp();
Page({

  data: {
    files: [],
    imgSrc: ''
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
      success: res => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths),
        });
        //上传云存储
        let cloudPath = "userPhoto/" + app.globalData.userInfo.useropenid + Date.now() + ".jpg";
        wx.showLoading({
          title: '上传云中',
        })
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath,
          // 指定要上传的文件的小程序临时文件路径
          filePath: res.tempFilePaths[0],
        }).then(res => {
          console.log('云存储上传成功', res);
          that.setData({
            imgSrc: res.fileID
          });
          wx.hideLoading();
        }).catch((e) => {
          console.log(e);
          wx.hideLoading();
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
        'option': 'photo',
        'useropenid': app.globalData.userInfo.useropenid,
        'value': this.data.imgSrc,
      },
      url: 'http://124.71.160.151:3006/modifyuserinfo',
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