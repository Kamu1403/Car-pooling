// 这是队伍创建界面与后端交互的接口

/****************************************
 * Function: 向数据库传送数据
 ****************************************/
function uploadTeamInfo(data){
	wx.request({
		method: 'POST',
		data:{
			'openid': data.openid,
			'teamname': data.teamname,
			'phone': data.phone, 
			'gender': data.gender,
			'start_addr': data.start_addr,
			'start_locationName': data.start_locationName,
			'des_addr': data.des_addr,
			'des_locationName': data.des_locationName,
			'start_date': data.start_date, 
			'start_time': data.start_time+':00',
			'end_date': data.end_date, 
			'end_time': data.end_time+':00',
			'note': data.note,
			'status': 'progress'
		},
		url: 'http://124.71.160.151:3001/teaminfo_insert', 
		success: function(res){ 
			console.log("Successfully created a new team and save its info into database!");
		}
	});
};
function updateTeamInfo(data){
	wx.request(
		{
			method: 'POST',
		data:{
			'seq': data.update_seq,
			'teamname': data.teamname,
			'phone': data.phone, 
			'gender': data.gender,
			'start_addr': data.start_addr,
			'start_locationName': data.start_locationName,
			'des_addr': data.des_addr,
			'des_locationName': data.des_locationName,
			'start_date': data.start_date, 
			'start_time': data.start_time+':00',
			'end_date': data.end_date, 
			'end_time': data.end_time+':00',
			'note': data.note
		},
		url: 'http://124.71.160.151:3001/updateOneTeamInfo', 
		success: function(res){ 
			console.log("成功修改小队信息");
		}
		}
	);
}

module.exports = {
	// 变量名   ： 将方法赋值到变量上面去使用
	uploadTeamInfo: uploadTeamInfo,
	updateTeamInfo: updateTeamInfo
  }

