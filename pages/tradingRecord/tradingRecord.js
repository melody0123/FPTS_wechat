//discovery.js
//answer.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    orderId: wx.getStorageSync('orderId'),
    productId: '',
    productType: '',
    productAmount: null,
    productPrice: '',
    orderDirection: '',
    accountId: '',
    orderTime: null
  },
  //事件处理函数
  toQuestion: function() {
    wx.navigateTo({
      url: '../discovery/discovery'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    wx.request({
      url: 'http://localhost/record/transaction_record/getById',
      data:{orderId: wx.getStorageSync('orderId')},
      method: 'Post',  //方法分GET和POST，根据需要写
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 请求头
        'cookie': wx.getStorageSync('sessionId')
      },
      success: (res) =>{
        console.log(res);//调出来的数据在控制台显示，方便查看;
        that.setData({
          
          accountId: res.data[0].accountId,
          productId: res.data[0].productId,
          productPrice: res.data[0].productPrice,
          productAmount: res.data[0].productAmount,
          productType: res.data[0].productType,
          orderTime: res.data[0].orderTime,
          orderDirection: res.data[0].orderDirection
        })
      },
      fail: (res) =>{//这里写调用接口失败之后所运行的函数
        console.log('.........fail..........');
      }
    }) 
  },
  tapName: function(event){
    console.log(event)
  }
})


