const app = getApp()
Page({


  data: {
    sports: [],
    inputShowed: false,
    inputVal: "",
    date: "Date",
    region: ["Province","City","District"],
    levels: ["all", "junior", "middle","expert"],
    customRegion: "All",
    customDate: "All",
  },
  setQuery: function () {
    const page = this;
    let title = page.data.inputVal || ''; 
    let level = page.data.levels[page.data.level] || '';
    let start_time = page.data.date || ''; 
    if (page.data.date == "Date" || page.data.date == "ALL" ) {start_time = ""};
    let province = page.data.province || ''; 
    if (page.data.province == "All") { province = "" };
    let city = page.data.city || ''; 
    if (page.data.city == "All") { city = "" };
    let district = page.data.district || ''; 
    if (page.data.district == "All") { district = "" };
    let query = `query[title]=${title}&query[level]=${level}&query[start_time]=${start_time}&query[province]=${province}&query[city]=${city}&query[district]=${district}`;
    page.setData({query})
  },

  getQuery: function () {
    let page = this;
    page.setQuery();
    wx.request({
      url: 'http://localhost:3000/api/v1/query?' + page.data.query,
      success(res) {
        console.log(123, res)
        page.setData({ sports: res.data.sports })
      }
    })
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });

  },
  hideInput: function () {
    let page = this;
    page.setData({
      inputVal: "",
      inputShowed: false
    });
    page.getQuery()
    // wx.request({
    //   // url: app.globalData.url + page.data.inputVal,
    //   url: 'http://localhost:3000/api/v1/query?query=' + page.data.inputVal,
    //   success(res) {
    //     console.log(123, res)
    //     page.setData({ sports: res.data.sports })
    //   }
    // })
  },
  clearInput: function () {
    let page = this;
    page.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    let page = this
    page.setData({
      inputVal: e.detail.value
    });
    page.getQuery();
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

  bindDateChange: function (e) {
    let page = this;
    console.log('picker发送选择改变，携带值为', e.detail.value);
    page.setData({
      date: e.detail.value
    });
    page.getQuery();
    // wx.request({
    //   // url: app.globalData.url + page.data.inputVal,
    //   url: 'http://localhost:3000/api/v1/query?query=' + page.data.date,
    //   success(res) {
    //     console.log(123, res)
    //     page.setData({ sports: res.data.sports })
    //   }
    // })
  },
  bindRegionChange: function (e) {
    let page = this;
    console.log('picker发送选择改变，携带值为', e.detail.value);
    page.setData({
      region: e.detail.value,
      province: e.detail.value[0],
      city: e.detail.value[1],
      district: e.detail.value[2],
    });
    page.getQuery()
  },
  bindPickerChange: function (e) {
    let page = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    page.setData({
      level: e.detail.value
    });
    page.getQuery()
    // page.setQuery()
    // wx.request({
    //   // url: app.globalData.url + page.data.inputVal,
    //   url: 'http://localhost:3000/api/v1/query?' + page.data.query,
    //   // url: 'http://localhost:3000/api/v1/query?query=' + page.data.levels[page.data.level],
    //   success(res) {
    //     console.log(123, res)
    //     page.setData({ sports: res.data.sports })
    //   }
    // })
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