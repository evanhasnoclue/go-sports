// pages/profile/profile.js
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
    var that = this;
    wx.getStorage({
      key: 'current_user',
      success: (res) => {
        if (res.data.gender == "2") {
          res.data.gender = "女"
        }
        if (res.data.gender == "1") {
          res.data.gender = "男"
        }
        const profile = res.data;
        that.setData({
          profile: profile
        })
      }
    })

    wx.request({
      url: "http://localhost:3000/api/v1/sports",
      method: 'GET',
      success(res) {
        console.log(res);
        const sports = res.data.sports;

        // Update local data
        that.setData({
          sports
        });
        console.log(sports);

        // wx.hideToast();
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