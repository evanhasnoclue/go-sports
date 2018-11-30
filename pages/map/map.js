// pages/map/map.js
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
    let that = this;
    let markers = [];
    let sportmk = [];
    let pages = getCurrentPages();
    let list = pages[(pages.length-2)];
    let sports = [];
    if (list.data.sports) { sports = list.data.sports } else { sports.push(list.data.sport)};
    that.setData({sports: sports});
    // that.setData({sports: list.data.sports});
    console.log(1,that.data);
    wx.getLocation({
      type: 'GCJ-02', // **1
      success: function (res) {
        that.data.sports.forEach((sport, index) => {
          sportmk.push(sport.id)
          markers.push({
            iconPath: "/images/marker.png", // **1
            id: index,
            latitude: sport.latitude,
            longitude: sport.longitude,
            width: 20,
            height: 20
          })
        });
        console.log(111, markers)
        console.log(112, sportmk)
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        that.setData({
          latitude: latitude,
          longitude: longitude, speed: speed,
          accuracy: accuracy,
          scale: 14,
          mk: markers,
          sportmk: sportmk})
  }

    })
  },

  markertap(e) {
      // console.log(this.data.sportmk)
      // console.log(e.markerId)
      let sportid = this.data.sportmk[e.markerId]
      // console.log(sportid)
      // console.log(116, app.globalData.sports)
      let sport = this.data.sports.find ( e => e.id === sportid )
      console.log(117, sport)
      console.log(118, sport.title)
      wx.showModal({
        title: `${sport.title}`,
        content: `${sport.description}`,
        confirmText: "Details",
        cancelText: "Later",
        success(res) {
          if (res.confirm) {
            console.log('user confirmed')
            wx.navigateTo({
              url: `../show/show?id=${sport.id}`
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },

  showSport: function (e) {
    const data = e.currentTarget.dataset;
    console.log(111,data);
    const sportid = data.id;
    wx.navigateTo({
      url: `../show/show?id=${sportid }`,
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
   * Page sport handler function--Called when user drop down
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
