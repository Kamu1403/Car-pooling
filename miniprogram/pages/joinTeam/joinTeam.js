Page({
	data: {
		teamList: [], 			// 队伍的总列表
		teamList_filter: [],	// 筛选后的队伍		
		i: 0
	},

	onLoad() {
		// 绑定search函数
		this.setData({
			search: this.search.bind(this)
		});

		this._getTeamInfo("progress", "20"); // 获取数据
	},

	onShow() {
		this._getTeamInfo("progress", "20"); 	// 获取数据
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
				that.setData({ 
					teamList: res.data,
					teamList_filter: res.data
				});
			}
		})
	},

	/****************************************
	 * Function: 搜索框搜索
	 * Return: 返回一个Promise
	 ****************************************/
	search(content) {
		content = content.trim();		// 去除搜索内容两边的空格
		if (content == ""){
			this.setData({
				teamList_filter: this.data.teamList
			});

			return new Promise((resolve) => {
			});
		}
		else{
			this.setData({
				teamList_filter: []
			});
		}

		// 遍历每一支队伍
		var len = this.data.teamList.length;
		for (var i_item = 0; i_item < len; ++i_item){

			// 判断某支队伍的所有信息
			var one_team = this.data.teamList[i_item];
			for (var key in one_team) {
				// 这一项符合搜索条件
				if (key.toString().indexOf(content) != -1 || one_team[key].toString().indexOf(content) != -1){
					this.setData({
						teamList_filter: this.data.teamList_filter.concat(one_team)
					});
					break;					
				}
			}
		}

		return new Promise((resolve) => {
		  })
	}
});
