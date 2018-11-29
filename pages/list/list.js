const app = getApp()
Page({


  data: {
    sports: [],
    inputShowed: false,
    inputVal: "",
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const page = this
    console.log(111,page)
    wx.request({
      url: app.globalData.url + '/sports',
    success(res){
      console.log(122,res)
      page.setData({sports: res.data.sports})
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
  showSport: function (e) {
    wx.navigateTo({
      url: `../show/show?id=${e.target.dataset.id}`,
    });
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