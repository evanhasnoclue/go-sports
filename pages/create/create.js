// pages/create/create.js
const app = getApp()
const AV = require('../../utils/av-weapp-min.js');
const dateTimePicker = require('../../utils/dateTimePicker.js');
Page({

  /**
   * Page initial data
   */
  data: {
    levels: ['junior', 'middle', 'expert'],
    region: ["Province", "City", "District"],
     array: ['健身', '跑步', '登山', '游泳','篮球','足球','乒乓球'],
    index: 0,

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime,
      dateTimeArray2: obj1.dateTimeArray,
      dateTime2: obj1.dateTime
    });
    wx.getStorage({
      key: 'current_user',
      success: (res) => {
        console.log(res),
          this.setData({
            user_id: res.data.id
          })
      }
    })

  },
  changeDateTime1(e) {
    console.log(11, e);
    this.setData({ dateTime1: e.detail.value });
  },
  changeDateTime2(e) {
    console.log(11, e);
    this.setData({ dateTime2: e.detail.value });
  },
  changeDateTimeColumn1(e) {
    console.log(12,e);
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },

  changeDateTimeColumn2(e) {
    console.log(12, e);
    var arr = this.data.dateTime2, dateArr = this.data.dateTimeArray2;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      dateTimeArray2: dateArr,
      dateTime2: arr
    });
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      level: e.detail.value
    })
  },

  takePhoto: function () {
    let photo_url = '';
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(111, res)
        let tempFilePath = res.tempFilePaths[0];
        that.data.imageData = tempFilePath;
        that.setData(that.data);

        new AV.File('file-name', {
          blob: {
            uri: tempFilePath,
          },
        }).save().then(
          file => {console.log(101, file.url());
          photo_url = file.url();
          that.setData({photo_url: photo_url})}
        ).catch(console.error);
      }
    });
  },

  previewMyImage: function (files) {
    console.log(103, files.currentTarget)
    console.log(this.data.imageData)
    wx.previewImage({
      // current: files.currentTarget.id,  // number of index or file path
      current: this.data.imageData,
      urls: [this.data.imageData]  // Array of temp files
    })
  },

  selectLocation: function(options) {
    let page = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        page.setData(
          {
            address: res.address,
            latitude: res.latitude,
            longitude: res.longitude
          }
        );
        var regex = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/;
        var REGION_PROVINCE = [];
        var addressBean = {
          REGION_PROVINCE: null,
          REGION_COUNTRY: null,
          REGION_CITY: null,
          ADDRESS: null
        };
        function regexAddressBean(address, addressBean) {
          regex = /^(.*?[市州]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;
          var addxress = regex.exec(address);
          addressBean.REGION_CITY = addxress[1];
          addressBean.REGION_COUNTRY = addxress[2];
          addressBean.ADDRESS = addxress[3] + "(" + res.name + ")";
          console.log(addxress);
        }
        if (!(REGION_PROVINCE = regex.exec(res.address))) {
          regex = /^(.*?(省|自治区))(.*?)$/;
          REGION_PROVINCE = regex.exec(res.address);
          addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
          regexAddressBean(REGION_PROVINCE[3], addressBean);
        } else {
          addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
          regexAddressBean(res.address, addressBean);
        }
        page.setData({
          ADDRESS_1_STR:
            addressBean.REGION_PROVINCE + " "
            + addressBean.REGION_CITY + ""
            + addressBean.REGION_COUNTRY
        });
        page.setData(addressBean);
      }
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      region: e.detail.value
    });
  },

  bindSubmit: function(e){
    let page = this;
    wx.request({
      // url: 'http://localhost:3000/api/v1/sports',
      url: app.globalData.url + '/sports',
      method: 'POST',
      data: {
        user_id: page.data.user_id,
        // page.data.user_id,
        title: e.detail.value.title,
        description: e.detail.value.description,
        category: e.detail.value.category,
        start_time: e.detail.value.start_time,
        end_time: e.detail.value.end_time,
        price: e.detail.value.price,
        level: e.detail.value.level,
        capacity: e.detail.value.capacity,
        address: page.data.address,    
        photo: page.data.photo_url,
        province: page.data.REGION_PROVINCE,
        city: page.data.REGION_CITY,
        district: page.data.REGION_COUNTRY,
        latitude: page.data.latitude,
        longitude: page.data.longitude
      },
      success: (res) => {
        console.log(res)
        // wx.switchTab({
        //   url: '/pages/profile/profile',
        // })
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