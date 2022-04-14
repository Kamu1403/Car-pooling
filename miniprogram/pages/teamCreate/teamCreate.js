// pages/teamCreate.js

let app = getApp();
var chooseStartLocation;
var chooseDesLocation;
Page({
    data: {
        isSubmit: false,
        warn: "",
        phone: "",
        pwd: "",
        isPub: false,
        sex: "男",
        start_date: "",      // 车队出发的日期
        start_time: "",      // 车队出发的时间
        end_date: "",        // 车队到达的日期
        end_time: "",         // 车队到达的时间
        start_addr: "",     //出发地址
        start_locationName: "", //出发地址名称
        des_addr: "", //终点地址
        des_locationName: "" //终点地址名称
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
    // 检查提交的表单的合法性
    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        let { phone, pwd, isPub, sex } = e.detail.value;
        if (!phone || !pwd) {
          this.setData({
            warn: "手机号或密码为空！",
            isSubmit: true
          })
          return;
        }
        this.setData({
          warn: "",
          isSubmit: true,
          phone,
          pwd,
          isPub,
          sex
        })
    },

    // 重置表单的输入
    formReset: function () {
      console.log('form发生了reset事件')
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
    }

})