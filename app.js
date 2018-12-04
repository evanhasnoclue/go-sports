//app.js
const AV = require('./utils/av-weapp-min.js')
const config = require('./key')
AV.init({
  appId: config.appId,
  appKey: config.appSecret,
});

App({
  onLaunch: function () { 
    console.log('processing to login')
    const page = this;
    wx.login({
      success: (res) => {
        console.log(res)
        wx.request({
          url: page.globalData.url + "/login",
          method: 'post',
          data: {
            code: res.code
          },
          success: (res) => {
            // console.log(res)
            // app.globalData.userId=res.data.userId
            // console.log(app.globalData.userId)
            let user_id = res.data.userId
            wx.setStorage({
              key: 'open_id',
              data: user_id
            })
          }
        })
      }
    })
    
    
  },
  globalData: {
    url:'https://gosports.wogengapp.cn/api/v1',
    // url:'http://localhost:3000/api/v1',
    sports: [ ]

  }
})
