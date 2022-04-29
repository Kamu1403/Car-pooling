// pages/teamCreate.js

let app = getApp();
var chooseStartLocation;
var chooseDesLocation;
Page({
    data: {
        isSubmit: false,
        teamname: "",           // 队伍名
        phone: "",
        gender: "",
        start_date: "",      // 车队出发的日期
        start_time: "",      // 车队出发的时间
        end_date: "",        // 车队到达的日期
        end_time: "",         // 车队到达的时间
        start_addr: "",       //出发地址
        start_locationName: "", //出发地址名称
        des_addr: "", //终点地址
        des_locationName: "",    //终点地址名称
        note: ""            // 备注信息
    },
    
    onShow: function () {
        // 从地图选点插件返回后，在页面的onShow生命周期函数中能够调用插件接口，取得选点结果对象
        // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
        var startlocation;
        var deslocation;
        if(chooseStartLocation)
        {
            startlocation = chooseStartLocation.getLocation();
        }
        if(chooseDesLocation)
        {
            deslocation=chooseDesLocation.getLocation();
        }
        // const deslocation=chooseDesLocation.getLocation();
        if(startlocation){
            this.setData({
                start_addr: startlocation.address?startlocation.address : "",
                start_locationName: startlocation.name?startlocation.name : ""
            });
        }

        if(deslocation){
            this.setData(
                {
                    des_addr:deslocation.address?deslocation.address : "",
                    des_locationName:deslocation.name?deslocation.name : ""
                }
            )
        }
    },

    //展现地图
    showStartMap() {
        //使用在腾讯位置服务申请的key（必填）
        const key = "I5OBZ-GGG6U-YY2VL-2MX37-5ADG3-7QFJZ"; 
        //调用插件的app的名称（必填）
        const referer = "嘉定拼车系统"; 
        wx.navigateTo({
            url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer
        });
        chooseDesLocation=null;
        chooseStartLocation=requirePlugin('chooseLocation');
    },

    // 
    showDesMap() {
        //使用在腾讯位置服务申请的key（必填）
        const key = "I5OBZ-GGG6U-YY2VL-2MX37-5ADG3-7QFJZ"; 
        //调用插件的app的名称（必填）
        const referer = "嘉定拼车系统"; 
        wx.navigateTo({
            url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer
        });
        chooseStartLocation=null;
        chooseDesLocation=requirePlugin('chooseLocation');
    },

    // 选择出发\到达的时间\日期的变化
    bindDatetimeChange: function(e) {
            /******
             * 函数功能：选择出发\到达的时间\日期的变化
             * 函数参数：e.target.dataset.op_type取自[start_date, start_time, end_date, end_time]
             *****/
            switch(e.target.dataset.op_type) {
                case "start_date":
                    this.setData({
                        start_date: e.detail.value
                    })
                    break;
                case "start_time":
                    this.setData({
                        start_time: e.detail.value
                    })
                    break;
                case "end_date":
                    this.setData({
                        end_date: e.detail.value
                    })
                    break;
                case "end_time":
                    this.setData({
                        end_time: e.detail.value
                    })
                    break;
                default:
                    console.log("Wrong Operation! Please make sure that the parameter is among [start_date, start_time, end_date, end_time]");
                    break;
           };
    },

    // 获取文本框输入
    bindTextAreaBlur: function(e) {
    	this.setData({
    	  note: e.detail.value
    	}) 
    },    


    /******************************
    * Function: 检查提交的表单的合法性
    * Return: true：合法，并且已经设置了；false，不合法
    * Notice: 会有弹窗
    *****************************/
    _formCheker: function(e){
        // 获得结果
        let { teamname, phone, gender } = e.detail.value;  
        // 提示信息
        var error_info = "";
        error_info = !teamname ? error_info + "队伍名字为空 " : error_info;  // 没有填写队名
        error_info = phone.length!=11 ? error_info + "手机号码不规范 " : error_info; // 手机号码位数不对
        error_info = !gender ? error_info + "未选择性别 " : error_info; 
        error_info = this.data.start_date == "" ? error_info + "未选择出发日期 " : error_info;
        error_info = this.data.start_time == "" ? error_info + "未选择出发时间 " : error_info;
        error_info = this.data.end_date == "" ? error_info + "未选择到达日期 " : error_info;
        error_info = this.data.end_time == "" ? error_info + "未选择到达时间 " : error_info;
        error_info = this.data.start_addr == "" ? error_info + "未选择出发地 " : error_info;
        error_info = this.data.des_addr == "" ? error_info + "未选择目的地 " : error_info;

        // 检查是否有错误信息
        // 有报错信息
        if (error_info != ""){
            this.setData({
                isSubmit: error_info=="" ? true : false,
                teamname: teamname,
                phone: "",
                gender: ""
            });
            // 弹窗提示错误信息
            wx.showToast({
                title: error_info,
                icon: 'none',
                duration: 2000  // 持续的时间
            });
            return false;
        }
        // 没有报错信息
        else{
            this.setData({
                isSubmit: error_info=="" ? true : false,
                teamname: teamname,
                phone: phone,
                gender: gender
            });
            // 弹窗提示成功
            wx.showToast({
                title: '创建成功',
                icon: 'none',
                duration: 1500
            });
            return true;
        }
    },


    /******************************
    * Function: 提交结果
    * Return: 
    * Notice: 
    *****************************/
    formSubmit: function (e) {
        console.log(e);
        // 检查结果
        var res = this._formCheker(e);
        if (res == true){
            // 跳转到行程详细界面
            wx.redirectTo({
                url: "/pages/personalInfo/history/historyInfo",
            });

            // 提交数据到数据库
            var db = require("interface.js");
            db.uploadTeamInfo(this.data);
        }
    },

    // 重置表单的输入
    formReset: function () {
        this.setData({
            isSubmit: false,
            teamname: "",
            phone: "",
            gender: "",
            start_date: "",      // 车队出发的日期
            start_time: "",      // 车队出发的时间
            end_date: "",        // 车队到达的日期
            end_time: "",         // 车队到达的时间
            start_addr: "",       //出发地址
            start_locationName: "", //出发地址名称
            des_addr: "",           //终点地址
            des_locationName: "",    //终点地址名称
            note: ""                // 备注信息
        });
        this.onReady();
    }
})

