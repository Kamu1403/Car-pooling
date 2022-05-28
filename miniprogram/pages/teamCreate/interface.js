// 这是队伍创建界面与后端交互的接口

/****************************************
 * Function: 向数据库传送数据
 ****************************************/
function uploadTeamInfo(data){
  var group_id;
  var tem_seq;
  // 队伍本身信息
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
			'status': 'progress',
			'role': 'leader'
		},
		url: 'http://124.71.160.151:3001/teaminfo_insert', 
		success: function(res){ 
      // console.log("Successfully created a new team and save its info into database!");
      /**********************************************************/
      wx.request({
        method: 'GET',
        url: 'http://124.71.160.151:3003/findSeq',
        success: function(res) {
          tem_seq = res.data[0].seq;
        }
      })
      /**********************************************************/
		}
  });
  /******************************************************/
  let options = {
    // 创建群聊：群名称、群为公开，不需要审核即可加入，允许邀请好友，群主为own
    data: {
      groupname: data.teamname,
      desc: '',
      members: [],
      "public": true,
      'approval': false,
      'allowinvites': true,
      'owner': data.openid
    },
    success: function(respData){
      console.log("创建群聊成功");
      wx.WebIM.conn.getGroup({
        limit: 50,
        success: function(res){
          for (let i = 0; i < res.data.length; ++i) {
            if (res.data[i].groupname == data.teamname) {
              group_id = res.data[i].groupid;
            }
          }
          wx.request({
            method: 'POST',
            data: {
              'tem_seq': tem_seq,
              'tem_name': data.teamname,
              'group_id': group_id
            },
            url: 'http://124.71.160.151:3003/createGroup',
            success: function() {
              console.log("向数据库添加群聊信息成功");
            },
            error: function() {
              console.log("向数据库添加群聊信息失败");
            }
          })
        },
        error: function(){
        }
      });
    },
    error: function(err){
      console.log("创建群聊失败");
    },
  };
  wx.WebIM.conn.createGroupNew(options);
  /******************************************************/
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

