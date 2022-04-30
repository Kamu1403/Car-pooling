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
        to:"旋转门",
        seq:0,
      },{
        status:"已完成",
        color:"green",
        time:"2022/4/10 09:34",
        from:"嘉定校区接待中心",
        to:"四平",
        seq:1,
      },{
        status:"已取消",
        color:"gray",
        time:"2022/1/12 10:54",
        from:"嘉定校区马桶楼",
        to:"图书馆",
        seq:2,
      }
    ],
  },

  jumpHistoryInfo(e) {
    // console.log('group seq:'+e.currentTarget.dataset.src);
    wx.navigateTo({
      url: '/pages/personalInfo/history/historyInfo?dataList=' + e.currentTarget.dataset.src,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var app=getApp();
    //从数据库读取用户的基本信息
    wx.request({
      method:'POST',
      data:{
        'useropenid': app.globalData.userInfo.useropenid
      },
      url: 'http://124.71.160.151:3002/getHistory',
      success:function(res){
        console.log(res.data.length)
        var list =[];
        for (let i = 0; i < res.data.length; i++) {
          var status;
          var color;
          if(res.data[i].status=='progress') {
            status="正在进行";
            color="red";
          }else if(res.data[i].status=='finish') {
            status="已完成";
            color="green";
          }else if(res.data[i].status=='cancel') {
            status="已取消";
            color="gray";
          }else {
            console.error('status not match!')
            return;
          }
          list = list.concat({
            status:status,
            color:color,
            time:res.data[i].start_date+'  '+res.data[i].start_time,
            from:res.data[i].start_locationName,
            to:res.data[i].des_locationName,
            seq:res.data[i].seq,
          });
        }
        console.log(list);
        that.setData({
          history:list
        });
        console.log(res.data);
      }
    })
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

