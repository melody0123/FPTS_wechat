// pages/todolist/todolist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that=this;
    wx.request({
      url: 'http://localhost/assets/account_assets/getById',
      method:'POST',
      data:{userId: 1, accountId: null},
      header:{
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 请求头
        'cookie': wx.getStorageSync('sessionId')
      },
      success:function(res){ 
        var list=res.data; 
        if(list==null){ 
          var toastText='该用户未创建账户';
          wx.showToast({
            title: toastText,
            icon:'error',
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

  increase: function(e){
    wx.setStorageSync('flag', true);
    wx.setStorageSync('accountId', e.currentTarget.dataset.accountId);
    wx.setStorageSync('userId', e.currentTarget.dataset.userId);
    wx.navigateTo({
      url: '/pages/assetsEdit/assetsEdit',
    })
  },
  decrease: function(e){
    wx.setStorageSync('flag', false);
    wx.setStorageSync('accountId', e.currentTarget.dataset.accountId);
    wx.setStorageSync('userId', e.currentTarget.dataset.userId);
    wx.navigateTo({
      url: '/pages/assetsEdit/assetsEdit',
    })
  },

  totalAssets: function(){
    var length = this.data.list.length;
    var i = 0;
    var totalAssets = 0;
    for (;i<length;i++){
      totalAssets += this.data.list[i];
    }
    wx.showToast({
      title: '您的账户总资产为'+totalAssets,
      icon: '',
      duration: 2000
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