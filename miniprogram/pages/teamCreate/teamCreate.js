// pages/teamCreate.js

let app = getApp();
var chooseStartLocation;
var chooseDesLocation;
Page({
    data: {
        isSubmit: false,
        warn: "",
        phone: "",
        sex: "",
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


    // 检查提交的表单的合法性
    formSubmit: function (e) {
        // 获得结果
        let { teamname, phone, sex } = e.detail.value;  
        // 提示信息
        var checker = "";
        checker = !teamname ? checker + "队伍名字为空 " : checker;  // 没有填写队名
        checker = phone.length!=11 ? checker + "手机号码不规范 " : checker; // 手机号码位数不对
        checker = !sex ? checker + "未选择性别 " : checker; 
        checker = this.data.start_date == "" ? checker + "未选择出发日期 " : checker;
        checker = this.data.start_time == "" ? checker + "未选择出发时间 " : checker;
        checker = this.data.end_date == "" ? checker + "未选择到达日期 " : checker;
        checker = this.data.end_time == "" ? checker + "未选择到达时间 " : checker;
        checker = this.data.start_addr == "" ? checker + "未选择出发地 " : checker;
        checker = this.data.des_addr == "" ? checker + "未选择目的地 " : checker;

        // 检查是否有错误信息
        // 有报错信息
        if (checker != ""){
            this.setData({
                warn: checker,
                isSubmit: checker=="" ? true : false,
                phone: "",
                sex: ""
            });
            // 弹窗提示
            wx.showToast({
                title: checker,
                icon: 'none',
                duration: 2000  // 持续的时间
            });
        }
        // 没有报错信息
        else{
            this.setData({
                warn: checker,
                isSubmit: checker=="" ? true : false,
                phone: phone,
                sex: sex
            });
            // 弹窗提示成功
            wx.showToast({
                title: '创建成功',
                icon: 'none',
                duration: 1500,
                success: function () {
                    // 弹窗后执行，可以省略
                    setTimeout(function () {
                        // 跳转到行程详细界面
                        wx.navigateTo({
                            url: "/pages/personalInfo/history/historyInfo",
                        })
                    }, 1500);
                }
            });
        }
    },

    // 重置表单的输入
    formReset: function () {
        this.setData({
            isSubmit: false,
            warn: "",
            phone: "",
            sex: "",
            start_date: "",      // 车队出发的日期
            start_time: "",      // 车队出发的时间
            end_date: "",        // 车队到达的日期
            end_time: "",         // 车队到达的时间
            start_addr: "",       //出发地址
            start_locationName: "", //出发地址名称
            des_addr: "", //终点地址
            des_locationName: "",    //终点地址名称
            note: ""            // 备注信息
        });
        this.onReady();
    }
})