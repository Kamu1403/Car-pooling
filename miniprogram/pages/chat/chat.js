let disp = require("../../utils/broadcast");
var WebIM = require("../../utils/WebIM")["default"];
let isfirstTime = true
Page({
	data: {
		search_btn: true, // 未搜索时展示按钮
		search_chats: false,  // 具体搜索时
		show_mask: false, // 遮挡的黑布？不明白...没找到是在哪里设置为true的
		yourname: "",
		unReadSpotNum: 0, // 未读消息（聊天）
		unReadNoticeNum: 0,
		messageNum: 0,
		unReadTotalNotNum: 0, // 未读通知（通知）
		arr: [], // 消息列表
		show_clear: false,
    groupName: {},
    nameList: {},
    photoList: {},
	},

	onLoad(options){ // 各种监听（隐藏home键？）
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
      }
    })
    let me = this;
		//监听加好友申请
		disp.on("em.xmpp.subscribe", function(){
			me.setData({
				messageNum: getApp().globalData.saveFriendList.length,
				unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
			});
		});

		//监听解散群
		disp.on("em.xmpp.invite.deleteGroup", function(){
			me.listGroups();
			me.getRoster();
			me.getChatList()
			me.setData({
				// arr: me.getChatList(),
				messageNum: getApp().globalData.saveFriendList.length
			});
		});

		//监听未读消息数
		disp.on("em.xmpp.unreadspot", function(message){
			me.getChatList()
			me.setData({
				// arr: me.getChatList(),
				unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
			});
		});

		//监听未读加群“通知”
		disp.on("em.xmpp.invite.joingroup", function(){
			me.setData({
				unReadNoticeNum: getApp().globalData.saveGroupInvitedList.length,
				unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
			});
		});

		disp.on("em.xmpp.contacts.remove", function(){
			me.getChatList()
			me.getRoster();
			// me.setData({
			// 	arr: me.getChatList(),
			// 	unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
			// });
		});

		// 监听被移出群
		disp.on("em.xmpp.group.leaveGroup", function(msg){
			console.log('msg ++++', msg)
			let key = msg.gid + msg.to
			wx.removeStorageSync(key)
			wx.removeStorageSync('rendered_'+key)
			me.getChatList()
			disp.fire("em.chat.session.remove");
		});

		// 监听加群成
		disp.on("em.xmpp.group.joingroup", function(msg){
			me.listGroups();
			me.getChatList()
		});


		this.getRoster();

	},

	listGroups(){ // 列出组
		var me = this;
		return WebIM.conn.getGroup({
			limit: 50,
			success: function(res){
				let groupName = {}
				let listGroup = res.data || []
				listGroup.forEach((item) => {
					groupName[item.groupid] = item.groupname
				})

				me.setData({
					groupName
				})
				wx.setStorage({
					key: "listGroup",
					data: res.data
				});
				me.getChatList()
			},
			error: function(err){
				console.log(err)
			}
		});
	},

	getRoster(){ // 名册
		let me = this;
		let rosters = {
			success(roster){
				var member = [];
				for(let i = 0; i < roster.length; i++){
					if(roster[i].subscription == "both"){
						member.push(roster[i]);
					}
				}
				wx.setStorage({
					key: "member",
					data: member
				});
				me.setData({member: member});
				me.listGroups()
				//if(!systemReady){
					disp.fire("em.main.ready");
					//systemReady = true;
				//}
				me.setData({
					arr: me.getChatList(),
					unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
				});
			},
			error(err){
				console.log(err);
			}
		};
		WebIM.conn.getRoster(rosters);
	},
	// 包含陌生人版本
	getChatList(){
		var myName = wx.getStorageSync("myUsername");
		var array = [];
		const me = this
		wx.getStorageInfo({
			success: function(res){
				let storageKeys = res.keys
				// console.log('res.keys +++ ', res.keys)
				let newChatMsgKeys = [];
				let historyChatMsgKeys = [];
				let len = myName.length
				storageKeys.forEach((item) => {
					if (item.slice(-len) == myName && item.indexOf('rendered_') == -1) {
						newChatMsgKeys.push(item)
					}else if(item.slice(-len) == myName && item.indexOf('rendered_') > -1){
						historyChatMsgKeys.push(item)
					}
				})

				cul.call(me, newChatMsgKeys, historyChatMsgKeys)
			}
		})

		function cul(newChatMsgKeys, historyChatMsgKeys){
			let array = []
			let lastChatMsg;
			for(let i = 0; i < historyChatMsgKeys.length; i++){
				let index = newChatMsgKeys.indexOf(historyChatMsgKeys[i].slice(9))
				if ( index > -1 ) {
					let newChatMsgs = wx.getStorageSync(newChatMsgKeys[index]) || [];
					if (newChatMsgKeys.includes()) {}
					if(newChatMsgs.length){
						lastChatMsg = newChatMsgs[newChatMsgs.length - 1];
						lastChatMsg.unReadCount = newChatMsgs.length;
						if(lastChatMsg.unReadCount > 99) {
							lastChatMsg.unReadCount = "99+";
						}
						let dateArr = lastChatMsg.time.split(' ')[0].split('-')
						let timeArr = lastChatMsg.time.split(' ')[1].split(':')
						let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2]
						lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
						lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
						newChatMsgKeys.splice(index, 1)
					}else{
						let historyChatMsgs = wx.getStorageSync(historyChatMsgKeys[i]);
						if (historyChatMsgs.length) {
							lastChatMsg = historyChatMsgs[historyChatMsgs.length - 1];
							let dateArr = lastChatMsg.time.split(' ')[0].split('-')
							let timeArr = lastChatMsg.time.split(' ')[1].split(':')
							let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2]
							lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
							lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
						}
					}
				}else{
					let historyChatMsgs = wx.getStorageSync(historyChatMsgKeys[i]);
					if (historyChatMsgs.length) {
						lastChatMsg = historyChatMsgs[historyChatMsgs.length - 1];
						let dateArr = lastChatMsg.time.split(' ')[0].split('-')
						let timeArr = lastChatMsg.time.split(' ')[1].split(':')
						let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2]
						lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
						lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
					}
					
				}
				if (lastChatMsg.chatType == 'groupchat' || lastChatMsg.chatType == 'chatRoom') {
					lastChatMsg.groupName = me.data.groupName[lastChatMsg.info.to]
				}
				lastChatMsg && lastChatMsg.username != myName && array.push(lastChatMsg)
			}

			for(let i = 0; i < newChatMsgKeys.length; i++){
				let newChatMsgs = wx.getStorageSync(newChatMsgKeys[i]) || [];
				if(newChatMsgs.length){
					lastChatMsg = newChatMsgs[newChatMsgs.length - 1];
					lastChatMsg.unReadCount = newChatMsgs.length;
					if(lastChatMsg.unReadCount > 99) {
						lastChatMsg.unReadCount = "99+";
					}
					let dateArr = lastChatMsg.time.split(' ')[0].split('-')
					let timeArr = lastChatMsg.time.split(' ')[1].split(':')
					let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2]
					lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
					lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
					if (lastChatMsg.chatType == 'groupchat' || lastChatMsg.chatType == 'chatRoom') {
						lastChatMsg.groupName = me.data.groupName[lastChatMsg.info.to]
					}
					lastChatMsg.username != myName && array.push(lastChatMsg)
				}
			}

			array.sort((a, b) => {
				return b.dateTimeNum - a.dateTimeNum
			})
			this.setData({
				arr: array
			})
		}
	},
	
	onShow: function(){
		this.getChatList()
		this.setData({
			//arr: this.getChatList(),
			unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
			messageNum: getApp().globalData.saveFriendList.length,
			unReadNoticeNum: getApp().globalData.saveGroupInvitedList.length,
			unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
		});

		if (getApp().globalData.isIPX) {
			this.setData({
				isIPX: true
			})
		}
	},

  // 搜索相关
	openSearch: function(){
		this.setData({
			search_btn: false,
			search_chats: true,
			gotop: true
		});
	},
	onSearch: function(val){
		var myName = wx.getStorageSync("myUsername");
		const me = this
		let searchValue = val.detail.value
		let chartList = this.data.arr;
		let serchList = [];
		console.log('arr',me.data.arr)
		chartList.forEach((item, index)=>{
			if(String(item.username).indexOf(searchValue) != -1 || (item.groupName && item.groupName.indexOf(searchValue) != -1)){
				serchList.push(item)
			}
		})
		this.setData({
			arr: serchList,
		})
	},
	cancel: function(){
		this.getChatList()
		this.setData({
			search_btn: true,
			search_chats: false,
			//arr: this.getChatList(),
			unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
			gotop: false
		});
	},
	clearInput: function(){
		this.setData({
			input_code: '',
			show_clear: false
		})
	},
	onInput: function(e){
		let inputValue = e.detail.value
		if (inputValue) {
			this.setData({
				show_clear: true
			})
		} else {
			this.setData({
				show_clear: false
			})
		}
	},

  // 底部的tab点击时
	close_mask: function(){
		this.setData({
			search_btn: true,
			search_chats: false,
			show_mask: false
		});
	},

  // 判断是单聊还是群聊，选择下列两个函数执行
	into_chatRoom: function(event){
		let detail = event.currentTarget.dataset.item;
		//群聊的chatType居然是singlechat？脏数据？ 等sdk重写后整理一下字段
		if (detail.chatType == 'groupchat' || detail.chatType == 'chatRoom' || detail.groupName) {
			this.into_groupChatRoom(detail)
		} else {
			this.into_singleChatRoom(detail)
		}
	},

	//	单聊
	into_singleChatRoom: function(detail){
		var my = wx.getStorageSync("myUsername");
		var nameList = {
			myName: my,
			your: detail.username
		};
		wx.navigateTo({
			url: "../chatroom/chatroom?username=" + JSON.stringify(nameList)
		});
	},

	//	群聊 和 聊天室 （两个概念）
	into_groupChatRoom: function(detail){
		var my = wx.getStorageSync("myUsername");
		var nameList = {
			myName: my,
			your: detail.groupName,
			groupId: detail.info.to
    };
    console.log(nameList);
		wx.navigateTo({
			url: "../groupChatRoom/groupChatRoom?username=" + JSON.stringify(nameList)
		});
	},

  // 删除聊天记录
	del_chat: function(event){
		let detail = event.currentTarget.dataset.item;
		let nameList;
		let me = this;
		if (detail.chatType == 'groupchat' || detail.chatType == 'chatRoom') {
			nameList = {
				your: detail.info.to
			};
		} else {
			nameList = {
				your: detail.username
			};
		}

		var myName = wx.getStorageSync("myUsername");
		var currentPage = getCurrentPages();
		
		wx.showModal({
			title: "删除该聊天记录",
			confirmText: "删除",
			success: function(res){
				if(res.confirm){
					wx.removeStorageSync(nameList.your + myName);
					wx.removeStorageSync("rendered_" + nameList.your + myName);
					if(currentPage[0]){
						currentPage[0].onShow();
					}
					me.getChatList()
					disp.fire("em.chat.session.remove");
				}
			},
			fail: function(err){
			}
		});
	},

});
