// pages/create/create.js
const app = getApp()
const AV = require('../../utils/av-weapp-min.js');
Page({

  /**
   * Page initial data
   */
  data: {
    region: ["Province", "City", "District"]

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  takePhoto: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let tempFilePath = res.tempFilePaths[0];
        new AV.File('file-name', {
          blob: {
            uri: tempFilePath,
          },
        }).save().then(
          file => console.log(101, file.url())
        ).catch(console.error);
      }
    });
  },

  previewMyImage: function (files) {
    console.log(files.currentTarget)
    console.log(this.data.imageData)
    wx.previewImage({
      current: files.currentTarget.id,  // number of index or file path
      urls: this.data.imageData  // Array of temp files
    })
  },

  selectLocation: function(options) {
    let page = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        page.setData(
          {
            address: res.address,
            latitude: res.latitude,
            longtitude: res.longitude
          }
        )
      }
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      region: e.detail.value
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