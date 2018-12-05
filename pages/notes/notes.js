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
        const sort_messages = messages.sort((a,b) => {
          const timeA = new Date(a.create_time);
          const timeB = new Date(b.create_time);
          return timeB - timeA;
        });
        console.log(sort_messages);
        page.setData({
          user_id: user_id,
          user: res.data,
          messages: sort_messages,
          unread: messages.filter(message => message.read_status === false)
        })
      }
    })
  },

  readMessage: function(e) {
    console.log(e);
    if (e.currentTarget.dataset.msg.sport_id) {
      wx.request({
        url: `${app.globalData.url}/messages/${e.currentTarget.dataset.msg.id}`,
        method: 'PUT',
        data: {
          read_status: true
        },
        success: (res) => {
          console.log(res.data);
          wx.redirectTo({
            url: `/pages/show/show?id=${e.currentTarget.dataset.msg.sport_id}`,
          })
        }
      });
    } else if (e.currentTarget.dataset.msg.message) {
      wx.request({
        url: `${app.globalData.url}/replies/${e.currentTarget.dataset.msg.id}`,
        method: 'PUT',
        data: {
          read_status: true
        },
        success: (res) => {
          console.log(res.data);
          wx.redirectTo({
            url: `/pages/show/show?id=${e.currentTarget.dataset.msg.message.sport_id}`,
          })
        }
      });

    }
  },

  readAll: function(e) {
    let page = this;
    wx.showLoading({
      title: 'Reading...',
    })
    page.data.unread.forEach((msg) => {
      if (msg.sport_id) {
        wx.request({
          url: `${app.globalData.url}/messages/${msg.id}`,
          method: 'PUT',
          data: {
            read_status: true
          },
          success: (res) => {

          }
        })
      } else if (msg.message) {
        wx.request({
          url: `${app.globalData.url}/replies/${msg.id}`,
          method: 'PUT',
          data: {
            read_status: true
          },
          success: (res) => {
            page.onLoad({ id: page.data.user_id });
            wx.hideLoading();
            wx.showToast({
              title: 'All read!',
              icon: 'success',
              duration: 1500
            });
          }
        })
      }
    });
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