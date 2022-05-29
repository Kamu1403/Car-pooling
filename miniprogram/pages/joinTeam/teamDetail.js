// pages/joinTeam/teamDetail.js
const subscribe = require('../../components/notice.js'); 
var app=getApp();

Page({
	data: {
		seq: "",
		teamname: "", // 队伍名
		phone: "",
		gender: "",
		start_date: "", // 车队出发的日期
		start_time: "", // 车队出发的时间
		end_date: "", // 车队到达的日期
		end_time: "", // 车队到达的时间
		start_locationName: "", //出发地址名称
		des_locationName: "", //终点地址名称
		note: "" // 备注信息
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
					teamname: res.data[0].teamname, // 队伍名
					phone: res.data[0].phone,
					gender: res.data[0].gender,
					start_date: res.data[0].start_date, // 车队出发的日期
					start_time: res.data[0].start_time, // 车队出发的时间
					end_date: res.data[0].end_date, // 车队到达的日期
					end_time: res.data[0].end_time, // 车队到达的时间
					start_locationName: res.data[0].start_locationName, // 出发地址名称
					des_locationName: res.data[0].des_locationName, // 终点地址名称
					note: res.data[0].note // 备注信息
				});
			}
		})
	},

	// 加入队伍
	joinTeam: function (e) {
    // 判断是否已经登陆
    let that = this;
		if (app.globalData.userInfo.useropenid==""){
			wx.showModal({
				title: "请先登陆",
				cancelColor: 'cancelColor',
				icon: 'none',
				duration: 2000,  // 持续的时间
				confirmText: "登陆",
				success: function(res){
					if (res.confirm) {
						wx.switchTab({
							url: '/pages/login/login',
						});
					} 

			}
			})
			return;
		}
		// 判断账号是不是被封禁
		if (app.globalData.userInfo.userstatus!=1){
			wx.showModal({
				title: "账号被封禁",
				cancelColor: 'cancelColor',
				icon: 'none',
				duration: 2000,  // 持续的时间
				confirmText: "解禁",
				success: function(res){
					if (res.confirm) {
						wx.switchTab({
							url: '/pages/login/login',
						});
					} 

			}
			})

			return;
		}
	
		// 申请加入队伍
		wx.request({
			method: 'POST',
			data: {
				seq: this.data.seq,
				openid: app.globalData.userInfo.useropenid,
				role: 'member'
			},
			url: 'http://124.71.160.151:3001/joinTeam',
			success: function (res) {
				var info = "";		// 加入队伍的提示信息
				if (res.data.isIn == true)
					info = "您已加入队伍，无需重复加入";
				else if (res.data.joinSuccess == true) {
          info = "加入队伍成功";
          /********************************************/
          wx.request({
            method: "POST",
            data: {
              'tem_seq': that.data.seq,
              'tem_name': that.data.tem_name
            },
            url: 'http://124.71.160.151:3003/findGroup',
            success: function(res) {
              console.log(res.data);
              let option = {
                'groupId': res.data[0].group_id,
                success: function() {
                  console.log("加入群聊成功");
                },
                error: function(e) {
                  console.log(e);
                }
              }
              wx.WebIM.joinGroup(option);
            }
          })
          /*************************************************/
        }
				else
					info = "加入队伍失败";

				wx.showToast({
					title: info,
					icon: 'none',
					duration: 2000,  // 持续的时间
				});
			}
		});

		subscribe.onSubscribe(e); 
	}
})