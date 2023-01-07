// pages/financeWarehouse/financeWarehouse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    navTab: ["A股", "B股","债券","基金"], //
    currentNavtab: "0",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var currentNavtab = this.data.currentNavtab;
    this.searchData(currentNavtab)
    
  },
  searchData: function(currentNavtab){
    var that=this;
    console.log(wx.getStorageSync('sessionId'));
    console.log(currentNavtab);
    wx.request({
      url: 'http://localhost/finance_warehouse/finance_warehouse/wxGet/' + currentNavtab,
      method:'POST',
      data:{},
      header:{
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 请求头
        'cookie': wx.getStorageSync('sessionId')
      },
      success:function(res){ 
        var list=res.data; 
        if(list==null){ 
          var toastText='获取数据失败';
          wx.showToast({
            title: toastText,
            icon:'',
            duration:2000 //弹出时间
          })
        }else{
          console.log(res.data);
          that.setData({
            list:list
          })
        }
      }
    })
  },

  switchTab: function(e){
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
    var currentNavtab = this.data.currentNavtab;
    console.log("tab是" + currentNavtab)
    var that = this;
    that.searchData(currentNavtab);
    
  },

  warehouseEdit: function(e){
    var app = getApp();
    app.globalData.financelistId = e.currentTarget.dataset.id;
    console.log(app.globalData.financelistId);
    wx.navigateTo({
      url: '/pages/financeWarehouse/warehosueEdit',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})