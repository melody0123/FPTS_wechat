// pages/accountAssets/assetsEdit.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    userId: wx.getStorageSync('userId'),
    accountId: wx.getStorageSync('accountId'),
    flag: wx.getStorageSync('flag'),
    modalHidden: true,
    balance: null,
    changeBalance: null
  },

  //表单提交
  formSubmit(e){
    var information= e.detail.value;

    this.setData({
      information: e.detail.value,
      modalHidden:false
    });
  },
 
  //模态框取消
  modalCancel(){
    wx.showToast({
      title: '取消提交',
      icon:'none'
    })
    this.setData({
      modalHidden:true,
    })
  },
  //模态框确定
  modalConfirm() {
    this.saveEdit();
    wx.showToast({
      title: '提交成功',
      icon:'success'
    })
    this.setData({
      modalHidden: true
    })
    wx.navigateTo({
      url: '/pages/accountAssets/accountAssets',
    })
  },
  onLoad: function (options) {
    this.showAssets();
  },

  showAssets: function(){
    var that=this;
    var userId =  wx.getStorageSync('userId');
    var accountId = wx.getStorageSync('accontId');
    var flag = wx.getStorageSync('flag');
    wx.request({
      url: 'http://localhost/assets/account_assets/getById',
      method:'POST',
      data:{userId: userId, accountId: accountId},
      header:{
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 请求头
        'cookie': wx.getStorageSync('sessionId')
      },
      success:function(res){ 
        that.setData({
          balance: res.data[0].accountBalance
        })
      }
    })
  },

  saveEdit: function(){
    var that=this;
    if (that.data.flag){
      wx.request({
        url: 'http://localhost/assets/account_assets/increase',
        method:'POST',
        data:{
          userId: that.data.userId,
          accountId: that.data.accountId,
          assets: that.data.changeBalance
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
        }
      })
    }
    else{
      if (that.data.balance >= that.data.changeBalance){
        wx.request({
          url: 'http://localhost/assets/account_assets/decrease',
          method:'POST',
          data:{
            userId: that.data.userId,
            accountId: that.data.accountId,
            assets: that.data.changeBalance
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
          }
        })
      }
      else{
        wx.showToast({
          title: '账户余额不足',
          icon:'error',
          duration:2000 });
      }
    }
  }

})