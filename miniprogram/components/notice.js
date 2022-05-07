function onSubscribe(e) {
    let page = '/pages/login/login'
    let noticeData = {
        "thing1": {"value": '行程提醒'},
        "name7": {"value": '队长'},
        "date8": {"value": '开始时间'},
        "thing10": {"value": '地址'}
    }
    let templateId = 'RwrxgRzzQwHi40i9E30pff2IZf3YfsD48ghtvzM9YpY' // 敏感信息省略，请用自己的模板ID

    // remind.js
    // 调起客户端小程序订阅消息界面
    wx.requestSubscribeMessage({
        // 需要订阅的消息模板的id的集合，一次调用最多可订阅3条消息
        tmplIds: [templateId],
        success (res) { 
            console.log(res[templateId])
            if (res[templateId] == 'accept') {
                console.log('用户点击允许')
                console.log('请参考 https://www.jianshu.com/p/493de887b5a1 修改后端');
                // 调用云函数subscribe，向云数据库插入一条记录，具体参考 https://www.jianshu.com/p/493de887b5a1
                wx.cloud.callFunction({
                    name: 'addBookingMsg',
                    page: page,
                    data: noticeData
                })
                .then(() => {
                    wx.showToast({
                        title: '订阅成功！',
                        icon: 'success'
                    })
                })
                .catch((e) => {
                    // dothing...
                    console.log(e)
                    wx.showToast({
                        title: '订阅失败！',
                        icon: 'error'
                    });
                })
            }
            if (res[tmplId] == 'reject') {
                console.log('用户点击取消')
            }
        }
    })
}

module.exports = { //必须在这里暴露接口，以便被外界访问，不然就不能访问
    onSubscribe:onSubscribe
 }