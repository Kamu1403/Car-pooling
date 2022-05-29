let disp = require("../../utils/broadcast");

Page({
	data: {
		username: {
			your: "",
    },
    nameList: {},
    photoList: {},
	},

	// options = 系统传入的 url 参数（me、you）（发送信息）
	onLoad(options){
    let that = this;
    /***********************************************************/
    wx.request({
      method: 'GET',
      url: 'http://124.71.160.151:3003/getUserInfo',
      success: function (res2) {
        for (let i = 0; i < res2.data.length; i++) {
          let tem_id = res2.data[i]["openid"].toLowerCase();
          let tem_name = res2.data[i]["name"];
          let tem_photo = res2.data[i]["photo"];
          let temName = that.data.nameList;
          temName[tem_id] = tem_name;
          let temPhoto = that.data.photoList;
          temPhoto[tem_id] = tem_photo;
          that.setData({
            nameList: temName,
            photoList: temPhoto
          })
        }
        wx.setNavigationBarTitle({
          title: that.data.nameList[username.your]
        });
      }
    })
		let me = this
		let username = options && JSON.parse(options.username) || {};
		console.log('username *****',username)
		this.setData({ username: username });
		disp.on('em.megList.refresh', function(){
			const pages = getCurrentPages();
			const currentPage = pages[pages.length - 1];
			if ( currentPage.route == "pages/chatroom/chatroom") {
				me.onLoad()
			}
		})
		if (username.action == 'join') {
			console.log('username', username)
			this.selectComponent('#chat').joinConf(username.data)
		}
		disp.on('emedia.confirmRing', function(event) {
			console.log('event', event)
			me.selectComponent('#chat').joinConf()
		});
		
	},

	onUnload(){
		disp.fire("em.chatroom.leave");
	},

	onPullDownRefresh: function () {
	  	wx.showNavigationBarLoading();
	    this.selectComponent('#chat').getMore()
	    // 停止下拉动作
	    wx.hideNavigationBarLoading();
	    wx.stopPullDownRefresh();
  	},

});
