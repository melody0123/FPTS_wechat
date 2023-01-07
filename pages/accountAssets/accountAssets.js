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
      url: 'http://localhost/assets/account_assets/getByNo',
      method:'POST',
      data:{userId: '', accountId: ''},
      header:{
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 请求头
        'cookie': wx.getStorageSync('sessionId')
      },
      success:function(res){ 
        var list = res.data;
        that.setData({
          list: res.data
        })
        if(list.length==0){ 
          var toastText='用户未创建账户';
          wx.showToast({
            title: toastText,
            icon:'error',
            duration:2000 //弹出时间
          })
        }else{
          console.log(res.data);
        }
      }
    })
  },

  increase: function(e){
    wx.setStorageSync('flag', true);
    wx.setStorageSync('accountId', e.currentTarget.dataset.accountid);
    wx.setStorageSync('userId', e.currentTarget.dataset.userid);
    wx.navigateTo({
      url: '../accountAssets/assetsEdit',
    })
  },
  decrease: function(e){
    wx.setStorageSync('flag', false);
    wx.setStorageSync('accountId', e.currentTarget.dataset.accountid);
    wx.setStorageSync('userId', e.currentTarget.dataset.userid);
    wx.navigateTo({
      url: '../accountAssets/assetsEdit',
    })
  },

  totalAssets: function(){
    var length = this.data.list.length;
    var i = 0;
    var totalAssets = 0;
    for (;i<length;i++){
      totalAssets += this.data.list[i].totalAssets;
      console.log(totalAssets);
    }
    
    
    wx.showToast({
      title: '总资产'+totalAssets+'元',
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