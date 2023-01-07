//logs.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: ''
    })
  },
  loginFunc:function(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  todolistFunc:function(){
    wx.navigateTo({
      url: '/pages/todolist/todolist',
    })
  },
  financeWarehouseFunc:function(){
    wx.navigateTo({
      url: '/pages/financeWarehouse/financeWarehouse',
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})