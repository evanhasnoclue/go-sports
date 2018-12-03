// pages/show/show.js
let app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    liked: false,
    new_message: false,
    replies_show:false,
    show: false
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
        wx.getStorage({
          key: 'current_user',
          success: function(user) {
            page.setData({
              current_user_id: user.data.id
            });
            page.data.sport.bookings.forEach((booking) => {
              console.log(111,booking);
              if (booking.user.id===user.data.id) {
                page.setData({
                  booking: booking
                })
              }
            })
          },
        })
      }
    })
  },

  bindHome: function(e) {
    wx.switchTab({
      url: '/pages/list/list',
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
    });
    wx.request({
      url: app.globalData.url + '/sports/' + page.data.sport.id,
      method: 'PUT',
      data:  page.data.sport,
      success: (res) => {
        console.log(res);
      }
    })
  },

  onShareAppMessage: function (res) {
    console.log('share');
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  bookSports: function(e) {
    let page = this;
    wx.getStorage({
      key: 'current_user',
      success: function (user) {
        console.log(111, "success")
        page.setData({
          current_user_id: user.data.id
        })
        wx.request({
          url: `${app.globalData.url}/sports/${page.data.sport.id}/bookings`,
          method: 'POST',
          data: {
            user_id: page.data.current_user_id
          },
          success: (res) => {
            page.setData({
              booking: res.data
            });
            page.onLoad({ id: page.data.sport.id })
          }
        })
      },
      fail: function (e) {
        console.log("fail")
        let user_data = {}
        wx.getStorage({
          key: 'open_id',
          success: (res) => {
            wx.getUserInfo({
              success: function (res) {
                const userInfo = res.userInfo
                  user_data = {
                  nickname: userInfo.nickName,
                  avatarUrl: userInfo.avatarUrl,
                  gender: userInfo.gender,
                  city: userInfo.city,
                  province: userInfo.province,
                  country: userInfo.country,
                  open_id: res.data
                };
                wx.request({
                  url: app.globalData.url + '/users',
                  method: 'POST',
                  data: { user_data: user_data },
                  success: (res) => {
                    wx.setStorage({
                      key: 'current_user',
                      data: res.data
                    });
                    page.bookSports()
                  }
                })
              }
            })
          }
        })
      }
    })
  },

  cancelBooking: function(e) {
    let page=this;
    wx.request({
      url: `${app.globalData.url}/sports/${page.data.sport.id}/bookings/${page.data.booking.id}`,
      method: 'DELETE',
      success: (res) => {
        console.log(222,res);
        page.setData({
          booking:false
        });
        page.onLoad({ id: page.data.sport.id })
      }
    })
  },

  deleteSports: function(e) {
    let page = this;
    wx.request({
      url: `${app.globalData.url}/sports/${page.data.sport.id}`,
      method: 'DELETE',
      success: (res) =>{
        console.log(333,res);
        wx.switchTab({
          url: '/pages/profile/profile',
        })
      }
    })
  },

  newMessage: function(e) {
    console.log(e.currentTarget);
    const status = this.data.new_message;
    this.setData({
      new_message: !status,
      message_tag: e.currentTarget.dataset
    })
  },

  submitMessage: function(e) {
    console.log(e);
    wx.showLoading({
      title: 'Loading...',
    })
    let page = this;
    const message_tag = this.data.message_tag;
    if (message_tag.tag==='message') {
      wx.request({
        url: `${app.globalData.url}/sports/${page.data.sport.id}/messages`,
        method: 'POST',
        data: {
          user_id: page.data.current_user_id,
          content:e.detail.value.content,
          sport_id: page.data.sport.id
        },
        success: (res) => {
          page.setData({
            new_message:false
          });
          page.onLoad({id: page.data.sport.id});
          wx.hideLoading();
          wx.showToast({
            title: 'Success!',
            icon: 'success',
            duration: 2000
          });
        }
      })
    } else if (message_tag.tag === 'reply') {
      wx.request({
        url: `${app.globalData.url}/messages/${message_tag.id}/replies`,
        method: 'POST',
        data: {
          user_id: page.data.current_user_id,
          content: e.detail.value.content
        },
        success: (res) => {
          page.setData({
            new_message: false
          });
          page.onLoad({ id: page.data.sport.id });
          wx.hideLoading();
          wx.showToast({
            title: 'Success!',
            icon: 'success',
            duration: 2000
          });
        }
      })
    }
  },

  showMore: function(e) {
    const more = this.data.replies_show;
    this.setData({
      replies_show: !more
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

  },
  showMap: function () {
    wx.navigateTo({
      url: '/pages/map/map'
    });
  },
  goDecat: function(){
    wx.navigateTo({
      url: '/pages/ad/ad'
    });
  },
  showBtn: function () {
    let status = !this.data.show
    this.setData({
      show: status
    })
  }
})
