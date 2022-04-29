// 这是队伍创建界面与后端交互的接口

/****************************************
 * Function: 向数据库传送数据
 ****************************************/
function uploadTeamInfo(data){
	wx.request({
		method: 'POST',
		data:{
			'name': 'idk',
			'phone': data.phone,
			'sex': data.sex,
			'start_addr': data.start_addr,
			'start_locationName': data.start_locationName,
			'des_addr': data.des_addr,
			'des_locationName': data.des_locationName,
			'start_date': data.start_date,
			'start_time': data.start_time,
			'end_date': data.end_date,
			'end_time': data.end_time,
			'note': data.note
		},
		url: '',
		success: function(res){
			console.log("Successfully created a new team and save its info into database!");
		}
	});
};


module.exports = {
	// 变量名   ： 将方法赋值到变量上面去使用
	uploadTeamInfo: uploadTeamInfo
  }

