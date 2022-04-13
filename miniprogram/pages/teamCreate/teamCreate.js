// pages/teamCreate.js

let app = getApp();
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
        end_time: ""         // 车队到达的时间
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