var app = getApp();

Page({
  data: {
    team_seq: "",
    teamName: "",
    theme: "",
    start_addr: "",
    des_addr: "",
    RouteStatus:'',
    start_time: Date().split(" ")[4],
    end_time: Date().split(" ")[4],
    teamNum: 0,
    teamLeader: {},
    memberInfo: [],
    slideButtons: [{
      type: 'warn',
      extClass: "my-weui-slidebutton",
      text: '删除'
    }],
    slideviewShowIndex: 0,
    
    // 个人信息
    nowUser: {},
    isLeader: "",
    //队长管理
    showDialog: false,
    groups: [
      {text: '编辑小队信息', value: 1},
      {text: '打车', value: 2},
      {text: '一键提醒', value: 3},
      {text: '提醒单个成员', value: 4},
      {text: '行程结束', value: 7},
      {text: '转交权限并退出', type: 'warn',value: 5},
      {text: '解散队伍', type: 'warn', value: 6}
    ],

    //开始打车
    typeF: false,
    buttons: [
      {
        type: 'default',
        className: '',
        text: '辅助操作',
        value: 0
      },
      {
        type: 'primary',
        className: '',
        text: '主操作',
        value: 1
      }
    ],

    //提醒队员
    showSelectDialog: false,
    groupsSelect: [
      {text: '成员1', value: 1, id: '123'},  
      {text: '成员2', value: 2, id: '456'}
    ],
    //转交权限，json与以上groupsSelect共用
    showAuthorityDialog: false,
    //结束行程  
    finishDialogShow: false,  
  },

  	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    let that = this;
    that.setData({
        team_seq: options.team_seq
      }
    )
    // 根据team_seq找小队信息（）
    wx.request({
      method: 'POST',
      data: {
        'team_seq': this.data.team_seq,
      },
      url: 'http://124.71.160.151:3003/getMainInfo',
      success: function (res) {
        // console.dir(res);
        // 处理小队信息
        that.setData({
          teamName: res.data[0].teamname,
          start_addr: res.data[0].start_addr,
          des_addr: res.data[0].des_addr,
          start_time: res.data[0].start_date.substring(0, 10) + "  " + res.data[0].start_time,
          end_time: res.data[0].end_date.substring(0, 10) + "  " + res.data[0].end_time,
          RouteStatus: res.data[0].status
        })
      }
    });
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
        for(let i = 0; i < res.data.length; ++i) {
          if (res.data[i]["openid"] == app.globalData.userInfo.useropenid) {
            that.setData({nowUser: res.data[i]});
            if (res.data[i]["role"] == "leader") {
              that.setData({isLeader: true});
            }
            else {
              that.setData({isLeader: false});
            }
          }
          if (res.data[i]["role"] == "leader") {
            that.setData({teamLeader: res.data[i]});
          }
          else {
            let array0 = that.data.memberInfo; // 先从源数据取出值赋给一个新的数组
            let tem = that.data.teamNum + 1;
            array0.push(res.data[i]);
            that.setData({memberInfo: array0, teamNum: tem});
          }
        }
      }
    })
  },

  //提醒用户  
  sendSubscribe(id){  
    console.log('openid='+id);  
    let that=this;  
    wx.requestSubscribeMessage({
      tmplIds: ['RwrxgRzzQwHi40i9E30pff2IZf3YfsD48ghtvzM9YpY'],
      //获得access_token
      success(res){
        wx.request({
          url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxf8ac3e1fa90e2c8b&secret=82841ca97f7ab3bd8a1e501f0762dae5',
          success(res){
            console.log('access token='+res.data.access_token);
            let dateList=that.data.start_time.split(' ')[0].split('-');
            let date=dateList[0]+'年'+dateList[1]+'月'+dateList[2]+'日';
            
            var data = {
              "touser": id,
              "template_id": "RwrxgRzzQwHi40i9E30pff2IZf3YfsD48ghtvzM9YpY",
              "data": {
                "thing1": {
                  "value": "拼车提醒"
                },
                "name7": {
                  "value": that.data.teamLeader.name
                },
                "date8": {
                  "value": date
                },
                "thing10": {
                  "value": that.data.start_addr
                }
              },
            }

            wx.request({
              method: 'POST',
              url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + res.data.access_token,
              data: data,
              success(res){
                console.log(res);
              }
            }

            )

          }

        })
        
   
      }
    })
  }, 

  //队长管理
  openDialog() {
    this.setData({
      showDialog: true
    })
  },
  closeDialog() {
    this.setData({
      showDialog: false
    })
  },
  btnClick(e) {
    var seq=1; //需要seq中填入小组序号，以进行修改小队消息
    console.error('需要在上一句seq中填入小组序号，以进行修改小队消息');

    console.log('选项'+e.detail.value);
    this.closeDialog();
    switch (e.detail.value) {
      case 1:
        wx.navigateTo({
          url: '/pages/teamCreate/teamCreate?dataList=' + seq,
        })
        break;
      case 2:
        this.openTypeF();
        break;
      case 3:
        console.log('提醒所有成员');
        
        // for (let index = 0; index < this.data.groupsSelect.length; index++) {  
        //   let element = this.data.groupsSelect[index].id;  
        //   this.sendSubscribe(element);  
        // };
        let that=this;
        wx.request(
          {
            method:'POST',
            data: {
              'team_seq': this.data.team_seq,
            },
            url: 'http://124.71.160.151:3003/getMemberInfo',
            success(res){
              for(let i=0;i<res.data.length;i++){
                let element=res.data[i]["openid"];
                that.sendSubscribe(element);
              }
            }
          }
        )
        

        break;
      case 4:
        this.openSelectDialog();
        break;
      case 5:
        this.openAuthorityDialog();
        break;
      case 6:
        this.delTeam(e);
        break;
      case 7:  
        this.setData({  
          finishDialogShow: true  
        })  
        break; 
    
      default:
        console.error('fatal error: actionSheet tap not match!')
        break;
    }
  },

  //开始打车
  openTypeF() {
    this.setData({
      typeF: true
    })
  },
  reserved(){
    console.log('队长已预约车辆');
    this.closeTypeF();
    wx.showToast({
      title: '确认成功！',
      icon: 'success'
  })
  },
  jumpReserve(){
    console.log('自动跳转到合适的打车软件');
    this.closeTypeF();
    wx.navigateTo({  
      url: '/pages/teamManage/redirectWeb',  
    });  
  },
  closeTypeF(){
    this.setData({
      typeF: false
    })
  },

  //提醒单个成员
  openSelectDialog() {
    this.setData({
      showSelectDialog: true
    })
  },
  closeSelectDialog() {
    this.setData({
      showSelectDialog: false
    })
  },
  btnSelect(e) {
    console.log('成员'+e.detail.value);
    this.closeSelectDialog();
    switch (e.detail.value) {
      case 1:
        this.sendSubscribe(this.data.groupsSelect[e.detail.value].id);  
        break;
    
      default:
        console.error('team member not match!')
        break;
    }
  },

  //转交权限
  openAuthorityDialog() {
    this.setData({
      showAuthorityDialog: true
    })
  },
  closeAuthorityDialog() {
    this.setData({
      showAuthorityDialog: false
    })
  },
  btnAuthority(e) {
    console.log('成员'+e.detail.value);
    this.closeAuthorityDialog();
    switch (e.detail.value) {
      case 1:
        
        break;
    
      default:
        console.error('team member not match!')
        break;
    }
  },
  
  // 结束行程  
  finishReturn() {  
    this.setData({  
      finishDialogShow: false  
    })  
  },  
  finishRoute() {  
    let that = this  
    // 结束 team_seq  
    wx.request({  
      method: 'POST',  
      data: {  
        'team_seq': this.data.team_seq,  
      },  
      url: 'http://124.71.160.151:3004/finishRoute',  
      success: function (res) {  
        console.log(res);  
        // 处理小队信息  
        that.setData({  
          finishDialogShow: false  
        })  
        //更新旧页面  
        var pages = getCurrentPages();  
        var prePage = pages[pages.length - 2];  
        // console.log("pages", pages)  
        // console.log("prePage", prePage)  
        // prePage.initRegionInfo();  
        prePage.onLoad();  
        wx.navigateBack()  
      }  
    });  
  },  

  // 结束行程
  finishReturn() {
    this.setData({
      finishDialogShow: false
    })
  },
  finishRoute() {
    let that = this
    // 结束 team_seq
    wx.request({
      method: 'POST',
      data: {
        'team_seq': this.data.team_seq,
      },
      url: 'http://124.71.160.151:3004/finishRoute',
      success: function (res) {
        console.log(res);
        // 处理小队信息
        that.setData({
          finishDialogShow: false
        })
        //更新旧页面
        var pages = getCurrentPages();
        var prePage = pages[pages.length - 2];
        // console.log("pages", pages)
        // console.log("prePage", prePage)
        // prePage.initRegionInfo();
        prePage.onLoad();
        wx.navigateBack()
      }
    });
  },
  addReview(){
    wx.navigateTo({
      url: '/pages/teamManage/routeReview/routeReview'
    })
  },
  // 删除成员
  delMember(e) {
    console.log("删除成员");
  },
  // 添加成员
  addMember(e) {
    console.log("添加成员");
  },
  // 离开队伍
  leaveTeam(e) {
    let now_user = this.data.nowUser.useropenid;
    console.log("离开队伍");
    if (now_user == this.data.teamLeader.useropenid) {
      // 队长离开队伍，需要将权限给别人
    }
    else {
      // 直接退出
    }
  },
  // 解散队伍
  delTeam(e) {
    console.log("解散队伍");
  },

  // 以下两个函数保证slide-view自动收回
  getTap(e) {
    var targetId = e.target.id; //触发点击事件的组件id
    var targetIndex = e.target.dataset.index; //触发点击事件的列表组件的序号
    //console.log(targetId);
    //console.log(targetIndex);
    let slideviewShowIndex = this.data.slideviewShowIndex; //展开slideview的列表序号
    let list = this.data.memberInfo;
    let listSlideView = "memberInfo[" + slideviewShowIndex + "].slideviewShow" //拼贴字符串，为了在setData里动态改变这一项的数据，减少setData传输的值
    // console.log(list[slideviewShowIndex].slideviewShow); //打印确认一下已经展开的列表项的确是true
    if (targetId !== "listItem") //点击的不是列表项
    {
      this.setData({
        [listSlideView]: false
      });
    } else if (targetIndex !== slideviewShowIndex) //点击的不是slideview展开的列表项
    {
      this.setData({
        [listSlideView]: false
      });
    }
  },
  getAccessToken(success) {
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxf8ac3e1fa90e2c8b&secret=82841ca97f7ab3bd8a1e501f0762dae5',
      success: success
    })
  },

  showSlideview(e) {
    let Index = e.currentTarget.dataset.index;
    //console.log('slideview is showing', Index);//打印当前展开的序号
    let list = this.data.memberInfo;
    let listSlideView = "memberInfo[" + Index + "].slideviewShow"
    let i;
    this.setData({
      slideviewShowIndex: Index
    });
    this.setData({
      [listSlideView]: true
    });
    //for循环是为了保证其他的列表slideview收拢 删掉这个for循环就能同时展开几个列表（如果操作一个展开之后拖动别的展开）
    for (i = 0; i < list.length; ++i) {
      let checkSlideView = "memberInfo[" + i + "].slideviewShow"
      if (i != Index)
        this.setData({
          [checkSlideView]: false
        });
    }
  }
})