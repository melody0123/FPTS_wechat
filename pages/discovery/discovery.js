//discovery.js
var app = getApp();
var util = require('../../utils/util.js')
Page({
  data: {
    userId: '',
    aStock: [],
    bStock: [],
    bond: [],
    fund: [],
    
    navTab: ["A股", "B股", "债券", "基金"],
    currentNavtab: "0",
    imgUrls: [
      '../../images/24213.jpg',
      '../../images/24280.jpg',
      '../../images/1444983318907-_DSC1826.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    feed: [],
    feed_length: 0
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this;
    wx.request({
      url: 'http://' + app.globalData.serverIP + '/record/transaction_record/searchTradingRecord',
      data:{userId: "1", productType: "0"},
      method: 'Post',  //方法分GET和POST，根据需要写
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 请求头
        'cookie': wx.getStorageSync('sessionId')
      },
      success: (res) =>{
        console.log(res)//调出来的数据在控制台显示，方便查看
        if (that.data.currentNavtab=="0"){
          that.setData({
            aStock: res.data
          })
        }
        else if (that.data.currentNavtab=="1"){
          that.setData({
            bStock: res.data
          })
        }
        else if (that.data.currentNavtab=="2"){
          that.setData({
            bond: res.data
          })
        }
        else if (that.data.currentNavtab=="3"){
          that.setData({
            fund: res.data
          })
        }
        console.log(that.data.aStock);
      },
      fail: (res) =>{//这里写调用接口失败之后所运行的函数
        console.log('.........fail..........');
      }
    }) 
  },

  switchTab: function(e){
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
    var currentNavtab = this.data.currentNavtab;
    var that = this;
    wx.request({
      url: 'http://' + app.globalData.serverIP + '/record/transaction_record/searchTradingRecord',
      data:{userId: "1", productType: currentNavtab},
      method: 'Post',  //方法分GET和POST，根据需要写
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 请求头
        // 'content-type': 'x-www-form-urlencoded'
        'cookie': wx.getStorageSync('sessionId')
      },
      success: (res) =>{
        console.log("请求成功")//调出来的数据在控制台显示，方便查看
        if (that.data.currentNavtab=="0"){
          that.setData({
            aStock: res.data
          })
        }
        else if (that.data.currentNavtab=="1"){
          that.setData({
            bStock: res.data
          })
        }
        else if (that.data.currentNavtab=="2"){
          that.setData({
            bond: res.data
          })
        }
        else if (that.data.currentNavtab=="3"){
          that.setData({
            fund: res.data
          })
        }
      },
      fail: (res) =>{//这里写调用接口失败之后所运行的函数
        console.log('.........fail..........');
      }
    }) 
  },

  bindItemTap: function(e) {
    console.log(e.currentTarget.dataset);
    wx.setStorageSync('orderId', e.currentTarget.dataset.orderid);
    wx.setStorageSync('name', e.currentTarget.dataset.name);
    wx.navigateTo({
      url: '../tradingRecord/tradingRecord'
    })
  },
 
  upper: function () {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function(){
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();}, 2000);
  },

  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function(){wx.hideNavigationBarLoading();that.nextLoad();}, 1000);
    console.log("lower")
  },
  //scroll: function (e) {
  //  console.log("scroll")
  //},

  //网络请求数据, 实现刷新
  refresh0: function(){
    var index_api = '';
    util.getData(index_api)
        .then(function(data){
          //this.setData({
          //
          //});
          console.log(data);
        });
  },

  //使用本地 fake 数据实现刷新效果
  refresh: function(){
    var feed = util.getDiscovery();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed:feed_data,
      feed_length: feed_data.length
    });
  },

  //使用本地 fake 数据实现继续加载效果
  nextLoad: function(){
    var next = util.discoveryNext();
    console.log("continueload");
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    });
  }
});
