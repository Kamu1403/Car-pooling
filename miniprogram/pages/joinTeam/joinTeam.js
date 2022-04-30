const base64 = require('../../images/base64');

Page({
	data: {
		teamList: [] // 队伍的列表
	},

	onLoad() {
		this.setData({
			icon: base64.icon20
		});
		this._getTeamInfo("progress", "20");		// 设置数据
	},

	onShow(){
		this.setData({ 
			icon: base64.icon20
		});
		this._getTeamInfo("progress", "20");		// 设置数据
	},


	/****************************************
	 * Function: 向数据库要队伍的数据
	 * Parameter: 如果num=0，说明取全部的；
	 ****************************************/
	_getTeamInfo: function (status, num) {
		let that = this;

		wx.request({
			method: 'POST',
			data: {
				'status': status,
				'num': num
			},
			url: 'http://124.71.160.151:3001/getTeamInfo',
			success: function (res) {
				console.log("实际打印", res.data);
				that.setData({
					teamList: res.data
				});
			}
		})
	}

});