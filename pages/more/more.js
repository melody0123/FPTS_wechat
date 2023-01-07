var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: ''
    })
  },
  loginFunc: function () {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  /* 当功能已在底边栏应用时，标记为1，使用switchTab切换页面，
  当功能不在底边栏应用时，标记为0，使用navigateTo新开页面 */
  newsFunc: function () {
    if (1) {
      wx.switchTab({
        url: '/pages/news/news',
      })
    } else {
      wx.navigateTo({
        url: '/pages/news/news',
      })
    }
  },
  financeWarehouseFunc: function () {
    if (0) {
      wx.switchTab({
        url: '/pages/financeWarehouse/financeWarehouse',
      })
    } else {
      wx.navigateTo({
        url: '/pages/financeWarehouse/financeWarehouse',
      })
    }
  },
  financeQueryFunc: function () {
    if (1) {
      wx.switchTab({
        url: '/pages/financeQuery/financeQuery',
      })
    } else {
      wx.navigateTo({
        url: '/pages/financeQuery/financeQuery',
      })
    }
  },
  recordFunc: function () {
    if (1) {
      wx.switchTab({
        url: '/pages/discovery/discovery',
      })
    } else {
      wx.navigateTo({
        url: '/pages/discovery/discovery',
      })
    }
  },
  todolistFunc: function () {
    if (0) {
      wx.switchTab({
        url: '/pages/todolist/todolist',
      })
    } else {
      wx.navigateTo({
        url: '/pages/todolist/todolist',
      })
    }
  },
  noticeFunc: function () {
    if (1) {
      wx.switchTab({
        url: '/pages/notice/notice',
      })
    } else {
      wx.navigateTo({
        url: '/pages/notice/notice',
      })
    }
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})