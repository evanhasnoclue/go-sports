// pages/show/show.js
let app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    liked: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let page = this;
    const sport_id = parseInt(options.id);
    const api_url = app.globalData.url;
    wx.request({
      url: `${api_url}/sports/${sport_id}`,
      method: 'GET',
      success: (res) => {
        console.log('data', res);
        page.setData({
          sport: res.data
        });
      }
    })
  },

  bindLike: function(e) {
    let page = this;
    const liked_status = this.data.liked;
    const likes = this.data.sport.like;
    if (liked_status) {
      this.data.sport.like = likes - 1;
    } else {
      this.data.sport.like = likes + 1;
    }
    this.setData({
      liked: !liked_status,
      sport: this.data.sport
    })
    wx.request({
      url: app.globalData.url + '/sports/' + page.data.sport.id,
      method: 'PUT',
      data:  page.data.sport,
      success: (res) => {
        console.log(res);
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