// pages/showinfo/showinfo.js
let WebIM = require("../../utils/WebIM")["default"];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    usergender:0,
    username:"未登录",
    userphoto:"",
    useropenid:"",
    userphone:"",
    userrole:0,
    userintro:"",
    useremail:"",
    userstatus:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let app = getApp();
		new app.ToastPannel.ToastPannel();
    that.setData({
      openid: options.openid
    })
    wx.request({
      method:'POST',
      data:{
        'useropenid':options.openid
      },
      url: 'http://124.71.160.151:3000/getuserinfo',
      success:function(res2){
        if(res2.data.length==0)//如果没有资料
        {
          ;
        }
        else//已经有账号
        {
          that.setData({
            usergender:res2.data[0].gender,
            username:res2.data[0].name,
            userphoto:res2.data[0].photo,
            userphone:res2.data[0].phone,
            userrole:res2.data[0].role,
            userintro:res2.data[0].intro,
            useremail:res2.data[0].email,
            userstatus:res2.data[0].status
          })
        }
      }
    });
  },
  jumpReport(e) {
    console.log(e.currentTarget.dataset.src);
    wx.navigateTo({
        url: '/pages/report/report?openid=' + e.currentTarget.dataset.src,
    })
  },

  jumpAddFriend(e) {
    console.log(e.currentTarget.dataset.src);
    this.add_friend(e.currentTarget.dataset.src);
  },

  add_friend: function(openid){
		let me = this;
    let myName = wx.getStorageSync("myUsername");
    console.log('my openid:',myName);
    console.log('friend openid:',openid);
		if(myName.toLowerCase() == openid.toLowerCase()){
			me.toastFilled('不能添加自己为好友');
			return;
    }
		WebIM.conn.subscribe({
			to: openid
		});
    /* roster：翻译为名册，我想就是好友的意思吧
       Subscription：翻译为订阅，在深入了解samck的机制之前，可以理解为添加好友，就是“订阅一个好友”，或者“订阅一个名册”，收到好友申请，可以理解为“收到一个订阅请求”
     */
		// 判断当前是否存在该好友
		let rosters = {
			success: function(roster){
				console.log('success')
				var member = [];
				for(let i = 0; i < roster.length; i++){
					if(roster[i].subscription == "both"){
						member.push(roster[i]);
					}
				}
				if(me.isExistFriend(openid, member)){
					me.toastFilled('已经是你的好友')
				}
				else{
					me.toastSuccess('已经发出好友申请')
				}
				me.setData({isdisable: true})
				// console.log(member)
			}
		};
		WebIM.conn.getRoster(rosters);
	},
  isExistFriend: function(name, list){
    console.log('all:',list);
    console.log('to add:',name);
		for(let index = 0; index < list.length; index++){
			if(name.toLowerCase() == list[index].name.toLowerCase()){
				return true
			}
		}
		return false
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