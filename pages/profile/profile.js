// pages/profile/profile.js
let app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const {
  $Message
} = require('../../dist/base/index');
var wxCharts = require('../../utils/wxcharts.js');
var radarChart = null;
Page({

  /**
   * Page initial data
   */
  data: {

    visible2: false,
    toggle: false,
    toggle2: false,
    actions2: [{
      name: '删除',
      color: '#ed3f14'
    }],
    actions: [{
      name: '删除',
      color: '#fff',
      fontsize: '20',
      width: 100,
      icon: 'like',
      background: '#ed3f14'
    }
      ,
    {
      name: '编辑',
      width: 100,
      color: '#80848f',
      fontsize: '20',
      icon: 'undo'
    }
    ],
    actions2: [{
      name: '取消',
      color: '#fff',
      fontsize: '20',
      width: 100,
      icon: 'like',
      background: '#0099ff'
    }
    ],
    tabs: ["Joined", "Hosted", "My data",],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,

  },
  touchHandler: function (e) {
    console.log(radarChart.getCurrentDataIndex(e));

  },

  handleCancel2() {
    this.setData({
      visible2: false,
      toggle: this.data.toggle ? false : true
    });
    console.log(this.data.toggle, 111111111)
  },
  handleClickItem2() {
    console.log("2222")
    const action = [...this.data.actions2];
    action[0].loading = true;

    this.setData({
      actions2: action
    });

    setTimeout(() => {
      action[0].loading = false;
      this.setData({
        visible2: false,
        actions2: action,
        toggle: this.data.toggle ? false : true
      });

    }, 2000);
  },
  handlerCloseButton() {
    this.setData({
      toggle2: this.data.toggle2 ? false : true
    });
  },
  actionsTap() {
    this.setData({
      visible2: true
    });
  },

  /**
   * Lifecycle function--Called when page load
   */

  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'current_user',
      success: (res) => {

        const profile = res.data;
        wx.request({
          url: app.globalData.url + "/users/" + profile.id,
          method: 'GET',
          success(res) {
            if (res.data.gender == "2") {
              res.data.gender = "woman"
            }
            if (res.data.gender == "1") {
              res.data.gender = "man"
            }
            // Update local data
            that.setData({
              profile: res.data
            });
        console.log(that.data )
        let result = 0
        for (let i=0;i<res.data.sports.length; i++){
          result = result + res.data.sports[i].like
        }       
        let sportsIndicator = new Array(res.data.bookings.length*10,res.data.fav_sports.length*10,res.data.replies.length*10,res.data.sports.length*10,result*10)
        that.setData({
          sportsIndicator: sportsIndicator
        })

            

            // wx.hideToast();
          }
        });
      }
    })




    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });


  },
  
onCreate: function(e) {
wx.navigateTo({ 
  url: `/pages/create/create`,
})
},

  createChart: function(sportsIndicator) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    radarChart = new wxCharts({
      canvasId: 'radarCanvas',
      type: 'radar',
      categories: ['P', 'F', 'R', 'D', 'L'],
      // P:participation,
      // F:favorite
      // R:replies
      // S:sports
      // L:like

      series: [{
        name: 'SPORTS INDICATORS',
        // data: [90, 110, 125, 95, 87, 122]
        data: sportsIndicator
      }],
      // width: windowWidth,
      width: 300,
      // height: 200,
      height: 300,
      extra: {
        radar: {
          max: 150
        }
      }
    });
  },

  showMessages: function(e) {
    const user_id = this.data.profile.id;
    wx.redirectTo({
      url: `/pages/notes/notes?id=${user_id}`,
    })
  },

  onReady: function(e) {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    this.onLoad();
  },
  
  tabClick: function (e) {
    console.log("tab clicked")
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    if (e.currentTarget.id=="2"){
      console.log(this.data.sportsIndicator)
      // let sportsIndicator = [56, 30, 30, 40, 87, 122]
      this.createChart(this.data.sportsIndicator)
    }
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