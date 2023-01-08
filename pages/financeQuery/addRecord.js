// pages/financeQuery/addRecord.js
Page({

  /**
   * 页面的初始数据
   */
  data:{
    productId: '',
    userId: null,
    productType: '',
    productAmount: null,
    productPrice: null,
    accountId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('onLoad')
    var that = this
    wx.request({
      url: 'http://' + app.globalData.serverIP + '/finance_query/finance_query/wxEdit/'+wx.getStorageSync('productId'),
      data:{},
      method: 'Post',  //方法分GET和POST，根据需要写
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 请求头
        'cookie': wx.getStorageSync('sessionId')
      },
      success: (res) =>{
        console.log(res);//调出来的数据在控制台显示，方便查看;
        that.setData({
          productId: res.data.productId,
          productPrice: res.data.productPrice,
          productType: res.data.productType,
        })
      },
      fail: (res) =>{//这里写调用接口失败之后所运行的函数
        console.log('.........fail..........');
      }
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