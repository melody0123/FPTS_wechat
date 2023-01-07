var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice: {},
  },

  onLoad: function (options) {
    this.showNotice();
    console.log(this.notice);
  },

  showNotice: function () {
    var app = getApp();
    var id = app.globalData.noticeId;
    var that = this;
    wx.request({
      url: 'http://' + app.globalData.serverIP + '/system/notice/wxView/' + id,
      method: 'POST',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 请求头
        'cookie': wx.getStorageSync('sessionId')
      },
      success: function (res) {
        var notice = res.data;
        if (notice == null) {
          var toastText = '获取数据失败';
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000 //弹出时间
          })
        } else {
          that.setData({
            notice: notice
          })
        }
      }
    })
  },

})