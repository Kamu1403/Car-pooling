Page({
  data: {
    teamName: "嘉定出行",
    theme: "",
    time: Date().split(" ")[4],
    from: "出发地",
    to: "目的地",
    teamNum: 3,
    teamLeader: {
      memberName: "邬嘉晟1",
      avatar: "user-unlogin.png"
    },
    memberInfo: [{
        memberName: "邬嘉晟2",
        avatar: "user-unlogin.png",
        slideviewShow: false
      },
      {
        memberName: "邬嘉晟3",
        avatar: "user-unlogin.png",
        slideviewShow: false
      },
      {
        memberName: "邬嘉晟4",
        avatar: "user-unlogin.png",
        slideviewShow: false
      }
    ],
    slideButtons: [{
      type: 'warn',
      extClass: "my-weui-slidebutton",
      text: '删除'
    }],
    slideviewShowIndex: 0
  },

  // 获取当前用户
  getNowUser() {
    return "邬嘉晟1";
  },
  isTeamLeader() {
    if (this.getNowUser() == this.data.teamLeader.memberName) {
      return true;
    }
    else {
      return false;
    }
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
    let now_user = this.getNowUser();
    console.log("离开队伍");
    if (now_user == this.data.teamLeader.memberName) {
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