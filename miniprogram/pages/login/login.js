// pages/login/login.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logined:false,
    userInfo:{},
    usergender:0,
    username:"未登录",
    userphoto:"",
    useropenid:"",
    userphone:"",
    userrole:0,
    userintro:"",
    useremail:"",
    userstatus:1
  },
  //注册所用函数
  userregister(e){
    const that=this;
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        wx.cloud.callFunction({
            name:"login",
            success:(ress)=>{
              console.log(ress);
              that.setData({
                useropenid:ress.result.openid
              })
              app.globalData.userInfo.useropenid=ress.result.openid;

              //先查数据库里有没有
              wx.request({
                method:'POST',
                data:{
                  'useropenid':ress.result.openid
                },
                url: 'http://124.71.160.151:3000/getuserinfo',
                success:function(res2){
                  console.log(res2.data);
                  console.log(res2.data.length);
                  if(res2.data.length==0)//如果没有资料
                  {
                    that.setData({
                      userInfo: res.userInfo,
                      usergender:res.userInfo.gender,
                      username:res.userInfo.nickName,
                      userphoto:res.userInfo.avatarUrl,
                      logined: true,
                      userrole:0,
                      userstatus:1
                      })
                      app.globalData.userInfo.usergender=res.userInfo.gender;
                      app.globalData.userInfo.username=res.userInfo.nickName;
                      app.globalData.userInfo.userphoto=res.userInfo.avatarUrl;
                      app.globalData.logined=true;
                      app.globalData.userInfo.role=0;
                      app.globalData.userInfo.status=1;
                      console.log(app.globalData.userInfo);
                      wx.request({
                        method:'POST',
                        data:{
                          'useropenid':ress.result.openid,
                          'username':res.userInfo.nickName,
                          'usergender': res.userInfo.gender,
                          'userphoto':res.userInfo.avatarUrl,
                          'userrole':0,
                          'userstatus':1
                        },
                        url: 'http://124.71.160.151:3000/basicuser',
                        success:function(res){
                          console.log(res.data)
                        }
                      })  
                  }
                  else//已经有账号
                  {
                    app.globalData.userInfo.usergender=res2.data[0].gender;
                    app.globalData.userInfo.username=res2.data[0].name;
                    app.globalData.userInfo.userphoto=res2.data[0].photo;
                    app.globalData.logined=true;
                    app.globalData.userInfo.userphone=res2.data[0].phone;
                    app.globalData.userInfo.userrole=res2.data[0].role;
                    app.globalData.userInfo.userintro=res2.data[0].intro;
                    app.globalData.userInfo.useremail=res2.data[0].email;
                    app.globalData.userInfo.userstatus=res2.data[0].status;
                    that.setData({
                      usergender:res2.data[0].gender,
                      username:res2.data[0].name,
                      userphoto:res2.data[0].photo,
                      logined: true,
                      userphone:res2.data[0].phone,
                      userrole:res2.data[0].role,
                      userintro:res2.data[0].intro,
                      useremail:res2.data[0].email,
                      userstatus:res2.data[0].status
                    })
                  }                     
                }        
              })
            }
        
        })
      }
    })
  },
  //登录所用函数
  userlogin(e) {
    const that=this;
    wx.cloud.callFunction(
      {
        name:"login",
        success:(ress)=>{
          console.log(ress);
          that.setData({
            useropenid:ress.result.openid
          })
          app.globalData.userInfo.useropenid=ress.result.openid;
          console.log(ress.result.openid);
          wx.request({
            method:'POST',
            data:{
              'useropenid':ress.result.openid
            },
            url: 'http://124.71.160.151:3000/getuserinfo',
            success:function(res2){
              if(res2.data.length==0)//如果没有资料
              {
                wx.showModal({
                  title: '登录失败',
                  content: '您还没有账号,请返回注册',
                  success: function (res) {
                    if (res.confirm) {//这里是点击了确定以后
                      console.log('用户点击确定')
                    } else {//这里是点击了取消以后
                      console.log('用户点击取消')
                    }
                  }
                })
              }
              else//已经有账号
              {
                app.globalData.userInfo.usergender=res2.data[0].gender;
                app.globalData.userInfo.username=res2.data[0].name;
                app.globalData.userInfo.userphoto=res2.data[0].photo;
                app.globalData.logined=true;
                app.globalData.userInfo.userphone=res2.data[0].phone;
                app.globalData.userInfo.userrole=res2.data[0].role;
                app.globalData.userInfo.userintro=res2.data[0].intro;
                app.globalData.userInfo.useremail=res2.data[0].email;
                app.globalData.userInfo.userstatus=res2.data[0].status;
                that.setData({
                  usergender:res2.data[0].gender,
                  username:res2.data[0].name,
                  userphoto:res2.data[0].photo,
                  logined: true,
                  userphone:res2.data[0].phone,
                  userrole:res2.data[0].role,
                  userintro:res2.data[0].intro,
                  useremail:res2.data[0].email,
                  userstatus:res2.data[0].status
                })
              }
            }
          })
        }
      })
  },
  logout()
  {
    this.setData({
      logined: false,
      useropenid:''
    })
    app.globalData.logined=true;
    app.globalData.userInfo.useropenid='';
  },
  jumpPersonalInfo() {
    wx.navigateTo({
      url: '/pages/personalInfo/personalInfo',
    })
  },
  jumpHistory() {
    wx.navigateTo({
      url: '/pages/personalInfo/history/history',
    })
  },
  jumpApeal() {
    wx.navigateTo({
      url:  "/pages/appeal/appeal",
    })
  },
  jumpAccountMana() {
    wx.navigateTo({
      url:  "/pages/sys/accountMana",
    })
  },
  jumpCommentCheck(){
    wx.navigateTo({
      url: '/pages/sys/cmtchk/commentCheck',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(this.data.logined==1)
    {
      console.log('test');
      const that=this;
          wx.request({
            method:'POST',
            data:{
              'useropenid':app.globalData.userInfo.useropenid
            },
            url: 'http://124.71.160.151:3000/getuserinfo',
            success:function(res2){
              if(res2.data.length==0)//如果没有资料
              {
                ;
              }
              else//已经有账号
              {
                that.setData({
                  usergender:res2.data[0].gender,
                  username:res2.data[0].name,
                  userphoto:res2.data[0].photo,
                  logined: true,
                  userphone:res2.data[0].phone,
                  userrole:res2.data[0].role,
                  userintro:res2.data[0].intro,
                  useremail:res2.data[0].email,
                  userstatus:res2.data[0].status
                })
              }
            }
          })
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})