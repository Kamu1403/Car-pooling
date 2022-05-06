// pages/personalInfo/history/historyInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        theme: "light",
        time:"2022/4/12 14:54",
        from:"嘉定校区友园7号楼",
        to:"旋转门",
        group_leader:{name:"leader",openid:""},
        group_member:[{name:"mem1",openid:""},{name:"mem2",openid:""},{name:"mem3",openid:""}]
    },
    jumpShowInfo(e) {
        console.log(e.currentTarget.dataset.src);
        wx.navigateTo({
            url: '/pages/showinfo/showinfo?openid=' + e.currentTarget.dataset.src,
        })
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let seq = JSON.parse(options.dataList);
        console.log('group seq:'+seq);
        var that=this;
        //从数据库读取用户的基本信息
        wx.request({
            method:'POST',
            data:{
                'seq': seq
            },
            url: 'http://124.71.160.151:3002/getHistoryInfo',
            success:function(res){
                console.log(res.data.length)
                var list =[];
                for (let i = 0; i < res.data.length; i++) {
                    if(res.data[i].team_role=='leader'){
                        that.setData({
                            group_leader:{
                                name:res.data[i].name,
                                openid:res.data[i].member_openid
                            }
                        });
                    }else if(res.data[i].team_role=='member'){
                        list = list.concat({name:res.data[i].name,openid:res.data[i].member_openid});
                    }else{
                        console.log('role not match!');
                        return;
                    }
                }
                console.log(list);
                that.setData({
                    time:res.data[0].start_date+'  '+res.data[0].start_time,
                    from:res.data[0].start_locationName,
                    to:res.data[0].des_locationName,
                    group_member:list,
                });
                console.log(res.data);
            }
        })
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