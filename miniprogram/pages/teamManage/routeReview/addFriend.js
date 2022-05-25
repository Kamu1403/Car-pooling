var app = getApp();
let WebIM = require("../../../utils/WebIM")["default"];

Page({
  data: {
    checkboxItems: [
      {name: 'standard is dealt for u.', value: '0', checked: true},
      {name: 'standard is dealicient for u.', value: '1'},
      {name: 'standard is dealt for u.', value: '3', checked: true},
      {name: 'standard is dealicient for u.', value: '4'},
      {name: 'standard is dealt for u.', value: '5', checked: true},
      {name: 'standard is dealicient for u.', value: '6'}
    ],
    checksum: [],
  },

  checkboxChange(e) {
    this.setData({
        checksum: e.detail.value
    })
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)

  },
   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('seq:',options.team_seq);
    let that = this;
    new app.ToastPannel.ToastPannel();
    that.setData({
        team_seq: options.team_seq,
        checkboxItems: []
      }
    )
    // 根据team_seq找队员信息（队员的openid找对应的头像信息）
    wx.request({
      method: 'POST',
      data: {
        'team_seq': this.data.team_seq,
      },
      url: 'http://124.71.160.151:3003/getMemberInfo',
      success: function (res) {
        // console.dir(res);
        // 处理队员信息
        let index=0;
        var list=[]
        for(let i = 0; i < res.data.length; ++i) {
          if (res.data[i]["openid"] != app.globalData.userInfo.useropenid) {
            list.push({
                name:res.data[i]['name'],
                value:index,
                id:res.data[i]['openid'],
                photo:res.data[i]['photo'],
                checked:false
            });
            index+=1;
          }
        }
        that.setData({
            checkboxItems: list
        })
      }
    })
    console.log(that.data.checkboxItems);
  },

  submitForm() {
    let that=this;
    for (let index = 0; index < that.data.checksum.length; index++) {
        console.log('check:',that.data.checksum[index]);
        const openid = that.data.checkboxItems[that.data.checksum[index]].id;
        console.log('openid:',openid);
        that.add_friend(openid);
    }
    setTimeout(() => {
        wx.navigateBack();
        wx.navigateBack();
      }, 1000)
  },

  add_friend: function(openid){
		let me = this;
        let myName = wx.getStorageSync("myUsername");
        console.log('my openid:',myName);
        console.log('friend openid:',openid);
		WebIM.conn.subscribe({
			to: openid
		});
        /* roster：翻译为名册，我想就是好友的意思吧
        Subscription：翻译为订阅，在深入了解samck的机制之前，可以理解为添加好友，就是“订阅一个好友”，或者“订阅一个名册”，收到好友申请，可以理解为“收到一个订阅请求”
        */
		// 判断当前是否存在该好友
		let rosters = {
			success: function(roster){
				console.log('success')
				var member = [];
				for(let i = 0; i < roster.length; i++){
					if(roster[i].subscription == "both"){
						member.push(roster[i]);
					}
				}
				if(me.isExistFriend(openid, member)){
					me.toastFilled('已经是你的好友')
				}
				else{
					me.toastSuccess('已经发出好友申请')
				}
				me.setData({isdisable: true})
				// console.log(member)
			}
		};
		WebIM.conn.getRoster(rosters);
	},
    isExistFriend: function(name, list){
        console.log('all:',list);
        console.log('to add:',name);
		for(let index = 0; index < list.length; index++){
			if(name.toLowerCase() == list[index].name.toLowerCase()){
				return true
			}
		}
		return false
	}
})
