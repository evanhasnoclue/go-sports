//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    const host = 'http://localhost:3000/'
    console.log('processing to login')
    const page = this;
    wx.login({
      success: (res) => {
        console.log(res)
        wx.request({
          url: "http://localhost:3000/api/v1/login",
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
  getUserInfo: function(e) {
    console.log(e)
    wx.getStorage({
      key: 'open_id',
      success: (res) => {
        const user_data = {
          nickname: e.detail.userInfo.nickName,
          avatarUrl: e.detail.userInfo.avatarUrl,
          gender: e.detail.userInfo.gender,
          city: e.detail.userInfo.city,
          province: e.detail.userInfo.province,
          country: e.detail.userInfo.country,
          open_id: res.data
        };
        wx.request({
          url: 'http://localhost:3000/api/v1/users',
          method: 'POST',
          data: { user_data: user_data },
          success: (res) => {
            console.log(res);
            wx.setStorage({
              key: 'current_user',
              data: res.data,
            });
            wx.switchTab({
              url: '/pages/list/list',
            })
          }
        })
      }
      }) 
  },
  toList: function(e) {
    wx.switchTab({
      url: '/pages/list/list',
    })
  }
})
