// pages/joinTeam/teamDetail.js
Page({
    data: {
		seq: "",
        teamname: "",           // 队伍名
        phone: "",
        gender: "",
        start_date: "",      // 车队出发的日期
        start_time: "",      // 车队出发的时间
        end_date: "",        // 车队到达的日期
        end_time: "",         // 车队到达的时间
        start_locationName: "", //出发地址名称
        des_locationName: "",    //终点地址名称
        note: ""            	// 备注信息
    },

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let that = this;
		wx.request({
			method: 'POST',
			data: {
				seq: options.team_seq
			},
			url: 'http://124.71.160.151:3001/getOneTeamInfo',
			success: function (res) {
				that.setData({
					seq: res.data[0].seq,
					teamname: res.data[0].teamname,           // 队伍名
					phone: res.data[0].phone,
					gender: res.data[0].gender,
					start_date: res.data[0].start_date,      	// 车队出发的日期
					start_time: res.data[0].start_time,      	// 车队出发的时间
					end_date: res.data[0].end_date,        		// 车队到达的日期
					end_time: res.data[0].end_time,         	// 车队到达的时间
					start_locationName: res.data[0].start_locationName, // 出发地址名称
					des_locationName: res.data[0].des_locationName,    	// 终点地址名称
					note: res.data[0].note           			// 备注信息
				});
			}
		})
	},

	// 加入队伍
	joinTeam: function(){
		
	}
})

