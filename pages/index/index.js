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
          url: app.globalData.url + '/users',
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
