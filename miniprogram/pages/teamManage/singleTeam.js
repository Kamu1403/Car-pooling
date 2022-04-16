// pages/teamManage/singleTeam.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [{
        "name": "邬嘉晟",
        "id": "1953000",
      },
      {
        "name": "邬嘉晟",
        "id": "1953000",
      }, {
        "name": "邬嘉晟",
        "id": "1953000",
      }, {
        "name": "邬嘉晟",
        "id": "1953000",
      }, {
        "name": "邬嘉晟",
        "id": "1953000",
      }
    ],
    teamInfo: {
      name : "队伍一",
      phonenumber : "139000000",
      start_date: "2022-2-15", // 车队出发的日期
      start_time: "9:18", // 车队出发的时间
      end_date: "2022-2-15", // 车队到达的日期
      end_time: "12:30", // 车队到达的时间
      start_addr: "曹安公路4800号", //出发地址
      start_locationName: "同济大学嘉定校区", //出发地址名称
      des_addr: "四平1235号", //终点地址
      des_locationName: "同济大学四平校区", //终点地址名称
      note: "暂无备注" // 备注信息
    }
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