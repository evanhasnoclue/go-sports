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
    const user_id = options.id;
    let page = this;
    wx.request({
      url: `${app.globalData.url}/users/${user_id}`,
      method: 'GET',
      success: (res) => {
        let messages = [];
        res.data.sports.forEach((sport) => {
          messages = messages.concat(sport.messages);
        });
        res.data.messages.forEach((message) => {
          messages = messages.concat(message.replies);
        });
        page.setData({
          user_id: user_id,
          user: res.data,
          messages: messages,
          unread: messages.filter(message => message.read_status === false)
        })
      }
    })
  },

  readMessage: function(e) {
    console.log(e);
    if (e.currentTarget.dataset.msg.sport_id) {
      wx.redirectTo({
        url: `/pages/show/show?id=${e.currentTarget.dataset.msg.sport_id}`,
      })
    } else if (e.currentTarget.dataset.message_id) {
      wx.redirectTo({
        url: `/pages/show/show?id=${e.currentTarget.dataset.message.sport_id}`,
      })
    }
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