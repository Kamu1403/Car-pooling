let WebIM = require("../../utils/WebIM")["default"];

Page({
	data: {
		username: "",
		password: ""
	},
	onLoad: function(){
		let app = getApp();
		new app.ToastPannel.ToastPannel();
  },
  
  // 获取数据
	bindUsername: function(e){
		this.setData({
			username: e.detail.value
		});
	},
	bindPassword: function(e){
		this.setData({
			password: e.detail.value
		});
	},
  
  // 注册函数
	register: function(){
		const that = this;
		if(that.data.username == ""){
			return this.toastFilled('请输入用户名！')
		}
		else if(that.data.password == ""){
			return this.toastFilled('请输入密码！')
		}
		else{
      // 注册的信息
			var options = {
				apiUrl: WebIM.config.apiURL,
				username: that.data.username.toLowerCase(),
				password: that.data.password,
				nickname: "",
				appKey: WebIM.config.appkey,
				success: function(res){
					console.log('注册成功', res)	
					that.toastSuccess('注册成功');  // toast（吐司）：就是提示成功失败的小提示框
					var data = {
						apiUrl: WebIM.config.apiURL,
						user: that.data.username.toLowerCase(),
						pwd: that.data.password,
						grant_type: "password",
						appKey: WebIM.config.appkey
          };
          // 储存
					wx.setStorage({
						key: "myUsername",
						data: that.data.username
					});
					wx.redirectTo({
						url: "../login/login?username="+that.data.username+"&password="+that.data.password
					});
				},
				error: function(res){
          // 注册失败问题，注意别犯
					console.log('注册失败', res)
					if (res.statusCode == '400' && res.data.error == 'illegal_argument') {
						if (res.data.error_description === 'USERNAME_TOO_LONG') {
                            return that.toastFilled('用户名超过64个字节！')
                        }
						return that.toastFilled('用户名非法!')
					}else if (res.data.error === 'duplicate_unique_property_exists') {
                        return that.toastFilled('用户名已被占用!')
                    }else if (res.data.error === 'unauthorized') {
                        return that.toastFilled('注册失败，无权限！')
                    } else if (res.data.error === 'resource_limited') {
                        return that.toastFilled('您的App用户注册数量已达上限,请升级至企业版！')
                    }else{
                    	return that.toastFilled('注册失败')
                    }
					
				}
      };
      // 调用该函数
			WebIM.conn.registerUser(options);
		}
	}
});
