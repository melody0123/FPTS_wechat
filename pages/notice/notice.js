Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    navTab: ["正常", "关闭"],
    currentNavtab: "0",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var currentNavtab = this.data.currentNavtab;
    this.searchData(currentNavtab)
  },

  searchData: function (currentNavtab) {
    var that = this;
    console.log(wx.getStorageSync('sessionId'));
    console.log(currentNavtab);
    wx.request({
      url: 'http://localhost/system/notice/wxGet/' + currentNavtab,
      method: 'POST',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 请求头
        'cookie': wx.getStorageSync('sessionId')
      },
      success: function (res) {
        var list = res.data;
        if (list == null) {
          var toastText = '获取数据失败';
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000 //弹出时间
          })
        } else {
          console.log(res.data);
          that.setData({
            list: list
          })
        }
      }
    })
  },

  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
    var currentNavtab = this.data.currentNavtab;
    console.log("tab是" + currentNavtab)
    var that = this;
    that.searchData(currentNavtab);
  },

  noticeView: function (e) {
    var app = getApp();
    app.globalData.noticeId = e.currentTarget.dataset.id;
    console.log(app.globalData.noticeId);
    wx.navigateTo({
      url: '/pages/notice/noticeView',
    })
  },

  // todolistAdd: function () {
  //   wx.navigateTo({
  //     url: '/pages/todolist/todolistAdd',
  //   })
  // },

  // todolistEdit: function (e) {
  //   var app = getApp();
  //   app.globalData.todolistId = e.currentTarget.dataset.id;
  //   console.log(app.globalData.todolistId);
  //   wx.navigateTo({
  //     url: '/pages/todolist/todolistEdit',
  //   })
  // },

  // todolistDelete: function (e) {
  //   var that = this;
  //   wx.showModal({
  //     title: '提示',
  //     content: '确定要删除[' + e.target.dataset.task + ']吗？',
  //     success: function (sm) {
  //       if (sm.confirm) {
  //         wx.request({
  //           url: 'http://localhost/todo/list/remove',
  //           method: 'POST',
  //           data: {
  //             ids: e.target.dataset.id,
  //           },
  //           header: {
  //             'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 请求头
  //             'cookie': wx.getStorageSync('sessionId')
  //           },
  //           success: function (res) {
  //             var result = res.data.msg;
  //             console.log(result);
  //             var toastText = "删除成功";
  //             if (result != "操作成功") {
  //               toastText = "删除失败";
  //             } else {
  //               that.onLoad();
  //             }
  //             wx.showToast({
  //               title: toastText,
  //               icon: '',
  //               duration: 2000
  //             });
  //           }
  //         })
  //       }
  //     }
  //   })
  // },

})