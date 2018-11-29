// pages/profile/profile.js
let app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const {
  $Message
} = require('../../dist/base/index');
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
    tabs: ["参加活动", "创建活动", "我的记录",],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,

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
        if (res.data.gender == "2") {
          res.data.gender = "女"
        }
        if (res.data.gender == "1") {
          res.data.gender = "男"
        }
        const profile = res.data;
        wx.request({
          url: app.globalData.url + "/users/" + profile.id,
          method: 'GET',
          success(res) {
            // Update local data
            that.setData({
              profile: res.data
            });

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
    wx.redirectTo({
      url: `/pages/create/create`,
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
    this.onLoad();
  },
  
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
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