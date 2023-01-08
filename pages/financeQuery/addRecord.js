// pages/financeQuery/addRecord.js
var app = getApp();
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
    balance: null
  },
  accountInput:function(e){
    this.setData({
      accountId:e.detail.value
    })
  },

  amountInput:function(e){
    this.setData({
      productAmount:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('onLoad');
    console.log('pid='+wx.getStorageSync('productId'));
    var app = getApp();
    var that = this;
    that.setData({
      productId: wx.getStorageSync('productId'),
      userId: app.globalData.sysUserInfo.userId
    })
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
          productPrice: res.data.newPrice,
          productType: res.data.type
        })
        console.log('type='+that.data.productType);
      },
      fail: (res) =>{//这里写调用接口失败之后所运行的函数
        console.log('.........fail..........');
      }
    }) 
  },

  save:function(e){
    var that=this;
    
    wx.request({
      url: 'http://' + app.globalData.serverIP + '/assets/account_assets/getAccountBalance',
      method:'POST',
      data:{
        userid: that.data.userId,
        accountid: that.data.accountId,
      },
      header:{
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 请求头
        'cookie': wx.getStorageSync('sessionId')
      },
      success:function(res){ 
        console.log(res.data);
        that.setData({
          balance: res.data
        })
      }
    })
    console.log('accountId='+that.data.accountId);
    console.log('productPrice='+that.data.productPrice);
    console.log('productAmount='+that.data.productAmount);
    console.log('accountBalance='+that.data.balance);
    if(that.data.accountId==null||that.data.productAmount==null||that.data.productAmount<=0){
      wx.showToast({
        title: "请正确填写信息",
        icon:'error',
        duration:2000 
      })
    }
    else if(that.data.balance<0)
    {
      wx.showToast({
        title: "该账户不存在",
        icon:'error',
        duration:2000 
      })
    }
    else if(that.data.balance<that.data.productAmount*that.data.productPrice)
    {
      wx.showToast({
        title: "账户余额不足",
        icon:'error',
        duration:2000 
      })
    }
    else {
      wx.request({
        url: 'http://' + app.globalData.serverIP + '/record/transaction_record/addRecord',
        method:'POST',
        data:{
          userId: that.data.userId,
          accountId: that.data.accountId,
          productId: that.data.productId,
          productPrice: that.data.productPrice,
          productType: that.data.productType,
          productAmount: that.data.productAmount
        },
        header:{
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 请求头
          'cookie': wx.getStorageSync('sessionId')
        },
        success:function(res){ 
          var result=res.data.msg;
          console.log(result); 
          var toastText="操作成功"; 
          if(result!= "操作成功"){
            toastText = "操作失败";
          }else{
            that.onLoad();
          }
          wx.showToast({
            title: toastText,
            icon:'',
            duration:2000 });
          wx.navigateBack();
        }
      })
    }
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