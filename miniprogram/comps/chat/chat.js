let msgStorage = require("msgstorage");
let msgType = require("msgtype");
let WebIM = require("../../utils/WebIM")["default"];
let disp = require("../../utils/broadcast");
let emediaState = require("./multiEmedia/emediaState");
Component({
	properties: {
		username: {
			type: Object,
			value: {},
		},
		chatType: {
			type: String,
			value: msgType.chatType.SINGLE_CHAT,
    },
	},
	data: {
		__comps__: {
			msglist: null,
			inputbar: null,
			audio: null,
		},
		pubUrl: '',
		subUrl: '',
		showEmedia: false,
		showmultiEmedia: false,
		showSingleEmedia: false,
		showEmediaInvite: false,
		// showEmedia: true,
		// showmultiEmedia: true,
		// showSingleEmedia: true,
		// showEmediaInvite: true,
		action: null,
		emediaAction: null,
		multiEmediaVisible: 'block',
		inputbarVisible: 'block',
		confrId: '',
		groupId: '',
    singleEmediaType: 1,
    nameList: {},
    photoList: {},
	},
	methods: {
		toggleRecordModal(){
			this.data.__comps__.audio.toggleRecordModal();
		},

		normalScroll(){
			this.data.__comps__.msglist.normalScroll();
			this.data.__comps__.inputbar.cancelEmoji();
		},

		shortScroll(){
			this.data.__comps__.msglist.shortScroll();
		},

		saveSendMsg(evt){
			msgStorage.saveMsg(evt.detail.msg, evt.detail.type);
			this.data.__comps__.inputbar.cancelEmoji();
		},

		getMore(){
			this.selectComponent('#chat-msglist').getHistoryMsg()
		},

		callVideo(callType, type){
	        if (emediaState.callStatus > 0) {
	            console.log('正在通话中')
	        }
	        const value = '邀请您进行视频通话'
	        const callId = wx.WebIM.conn.getUniqueId().toString();
	        const channelName = emediaState.confr.channelName || Math.uuid(8)
	        let username = this.data.username.your;

	        if (callType === 'contact') {
	            this.sendInviteMsg([username], channelName, callId, type)
	            emediaState.setConf({
	            	channel: channelName,
			    	token: '',
			    	type: type,
			    	callId: callId,
			    	callerDevId: wx.WebIM.conn.context.jid.clientResource,
			    	calleeDevId: null,
			    	confrName: '',
			    	callerIMName: this.data.username.myName,
			    	calleeIMName: username
	            })
	        }else if (selectTab === 'group'){
	            this.props.showInviteModal()
	            this.props.setGid(selectItem)
	            // this.props.updateConfrInfo(selectItem, false, false)
	        }

	        const inviteStatus = 1
	        emediaState.callStatus = inviteStatus

	        wx.WebIM.rtc.timer = setTimeout(() => {
	            if (callType === 'contact') {
	            	emediaState.cancelCall(username)
	            	wx.WebIM.client && wx.WebIM.client.leave()
	            	emediaState.hangup()
	                this.onHangup()
	            }else{
	                // 多人不做超时
	            }
	        }, 30000)
	    },
	    // 点击发起视频的回调
		onMakeVideoCall(evt){
			if (evt.detail == "group") {
				this.setData({
					showEmediaInvite: true,
					inputbarVisible: 'none',
					action: 'create'
					//showEmedia: true
				})
			}else{
				this.callVideo('contact', 1)
				this.setData({
					showSingleEmedia: true,
					inputbarVisible: 'none'
				})
			}
		},

		// 群组发起视频邀请的回调
		onStartConfr(data){
			console.log('发起邀请的回调', data.detail)
			const channel = emediaState.confr.channel || Math.uuid(8)
			let callId = emediaState.confr.callId || WebIM.conn.getUniqueId().toString();
			let username = this.data.username.your;
			getApp().globalData.channel = channel
			
			emediaState.setConf('callId', callId)
			// if(data.detail.action == 'invite'){
			this.sendInviteMsg(data.detail.confrMember, channel, callId, 2)
			// }
			if (!emediaState.confr.channel) {
					emediaState.setConf({
	            	channel: channel,
			    	token: '',
			    	type: 2,
			    	callId: callId,
			    	callerDevId: wx.WebIM.conn.context.jid.clientResource,
			    	calleeDevId: null,
			    	confrName: '',
			    	callerIMName: wx.WebIM.conn.context.userId,
			    	calleeIMName: username
	            })
			}

			this.setData({
				showEmediaInvite: false,
				showmultiEmedia: true,
				multiEmediaVisible: 'block',
				inputbarVisible: 'none',
				confrMember: data.detail.confrMember,
				emediaAction:{
					action: 'create'
				}
			})
		},

		joinConf(data){
			console.log('data ---', data)
			console.log('emediaState', emediaState)
			if(emediaState.confr.type == 1 || emediaState.confr.type == 0){
				this.setData({
					showSingleEmedia: true,
					inputbarVisible: 'none',
					emediaAction:{
						action: 'join'
					}
				})
			}else {
				this.setData({
					showEmediaInvite: false,
					showmultiEmedia: true,
					multiEmediaVisible: 'block',
					inputbarVisible: 'none',
					confrMember: 'confrMember',
					emediaAction:{
						action: 'join'
					}
				})
			}
		},

		onGoBack(){
			this.setData({
				showEmediaInvite: false,
				showmultiEmedia: true,
				multiEmediaVisible: 'block',
				inputbarVisible: 'none',
				confrMember: []
			})
		},

		onInviteMember(e){
			let username = this.data.username;
			if(!this.data.username.groupId){
				username.groupId = e.detail
			}
			
			this.setData({
				action: 'invite',
				showEmediaInvite: true,
				inputbarVisible: 'none',
				//showmultiEmedia: false
				multiEmediaVisible: 'none',
				username
			})
		},

		onMakeAudioCall(){
			this.callVideo('contact', 0)
			this.setData({
				showSingleEmedia: true,
				inputbarVisible: 'none',
				singleEmediaType: 0,
				emediaAction:{
					action: 'create'
				}
			})
		},

		onCreateConfrSuccess(data){
			console.log('创建会议回调', data)
			this.setData({
				confrId: data.detail.confrId
			})
			const channel = Math.uuid(8)
			getApp().globalData.channel = channel
			getApp().globalData.confrId = data.detail.confrId
   			this.sendInviteMsg(this.data.confrMember, channel, data)
		},

		sendInviteMsg(members, channel, callId, type){
			console.log("%c members","background: green")
			console.log(members)
			members&&members.forEach((value) => {
				let id = wx.WebIM.conn.getUniqueId();
				let msg = new wx.WebIM.message('txt', id);
				msg.set({
					msg: wx.WebIM.conn.context.userId + ' invite you to video call',
					from: wx.WebIM.conn.context.userId,
					to: value,
					chatType: 'singleChat',
					ext: {
						action: 'invite',
	                    channelName: channel,
	                    type: type, //0为1v1音频，1为1v1视频，2为多人通话
	                    callerDevId: wx.WebIM.conn.context.jid.clientResource, // 主叫方设备Id
	                    callId: callId, // 随机uuid，每次呼叫都不同，代表一次呼叫
	                    ts: Date.now(),
	                    msgType: 'rtcCallWithAgora'
					},
					success(id, serverMsgId){
						console.log('发送邀请消息成功 to: '+value)
					},
					fail(id, serverMsgId){
						console.log('发送邀请消息失败了')
					}
				});
				console.log('发送邀请')
				wx.WebIM.conn.send(msg.body);
			})
		},

		onClickInviteMsg(data){
			// old fun
			return
		},
		onHangup(){
			this.setData({
				showEmediaInvite: false,
				showmultiEmedia: false,
				showSingleEmedia: false,
				inputbarVisible: 'block'
			})
			getApp().globalData.confrId = ''
		},
		onRender(){
			wx.pageScrollTo({
				scrollTop: 5000,
				duration: 300,
				success: function(){console.log('滚动成功')},
				fail: function(){console.log('滚动失败')}
			})
		}
  	},

	// lifetimes
	created(){
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
  },
	attached(){},
	ready(){
		console.log('this data >> ',this.data)
		this.data.__comps__.inputbar = this.selectComponent("#chat-inputbar");
		this.data.__comps__.msglist = this.selectComponent("#chat-msglist");
		this.data.__comps__.audio = this.selectComponent("#chat-suit-audio");

		disp.on('em.message.fullscreenchange', (detail) => {
			if (detail.fullscreen) {
				this.setData({
					inputbarVisible: 'none'
				})
			}else{
				this.setData({
					inputbarVisible: 'block'
				})
			}
		})
	},
	moved(){},
	detached(){
	},
});
