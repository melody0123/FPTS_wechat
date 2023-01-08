// pages/resetPassword/setNewPassword.js
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    newPassword:'',
    confirmNewPassword:'', 
    validateCode:'',
    imgUrl: ''
  },

  // 提交重置密码申请
  submitResetRequest: function(e) {
    // console.log(e.detail.value);
    // 读取一边用户输入的数据
    this.data.newPassword = e.detail.value.newPassword;
    this.data.confirmNewPassword = e.detail.value.confirmNewPassword;
    this.data.validateCode = e.detail.value.validateCode;
    // 检查所有字段是否填写完毕
    if(!this.data.newPassword || !this.data.confirmNewPassword || !this.data.validateCode) {
      // 没有填写完整
      wx.showToast({
        title: '信息不完整',
        icon:'error',
        duration: 2000
      })
    } else {
      // 填写完整，向服务器发送重置请求
      let that = this;
      wx.request({
        url: 'http://' + app.globalData.serverIP + '/resetPassword', //请求地址
        data: {newPassword: that.data.newPassword, validateCode: that.data.validateCode}, //请求数据
        method: 'POST', //请求方法
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 请求头
          'cookie': wx.getStorageSync('sessionId') // 取 session
        },
        success: function(res) {
          // console.log(res);
          // 判断是否请求是否成功
          if (res.statusCode == 200 && res.data.code == 0 && res.data.msg == "操作成功") {
            // 操作成功
            // console.log("操作成功");
            wx.showModal({
              title: '操作成功',
              content: '即将前往登录页面',
              showCancel: false,
              complete: (res) => {
                wx.switchTab({
                  url: '/pages/login/login',
                })
              }
            });
          } else if (res.statusCode == 200 && res.data.code == 500) {
            // 操作失败
            // console.log("操作失败，" + res.data.msg);
            wx.showModal({
              title: '操作失败',
              content: res.data.msg + '，请重试',
              showCancel: false,
              complete: (res) => {
                wx.reLaunch({
                  url: '/pages/resetPassword/resetPassword',
                })
              }
            })
          }
        },
        fail: function(res) {
          // 网络错误
          // console.log("网络错误");
          wx.showModal({
            title: '操作失败',
            content: '网络错误，请重试',
            showCancel: false,
            complete: (res) => {
              wx.reLaunch({
                url: '/pages/resetPassword/resetPassword',
              })
            }
          })
        }
      })
    }
  }
})