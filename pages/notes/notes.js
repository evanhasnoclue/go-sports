// pages/notes/notes.js
let app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const user_id = 5;
    let page = this;
    wx.request({
      url: `${app.globalData.url}/users/${user_id}`,
      method: 'GET',
      success: (res) => {
        let messages = [];
        res.data.sports.forEach((sport) => {
          sport.messages.forEach((message) => {
            messages.push(message);
          })
        });
        res.data.messages.forEach((message) => {
          message.replies.forEach((reply) => {
            messages.push(reply);
          })
        });
        page.setData({
          user_id: user_id,
          user: res.data,
          messages: messages
        })
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})