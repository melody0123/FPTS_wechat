// pages/login/login.js
// pages/login/index.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    formData:{
      username:'',
      password:'',
      validateCode:''
    }
  },
  formInputChange(e){
  // console.log(e);
  this.data.formData[e.currentTarget.dataset.field]=e.detail.value
  this.setData({
    formData:this.data.formData
  })
  },
  loginFun(){
    // console.log(this.data.formData);
    if(!this.data.formData.username || !this.data.formData.password || !this.data.formData.validateCode){
      wx.showToast({
        title: '信息不完整',
        icon:'error',
        duration: 2000
      })
    }else {
      let _this=this 
      wx.request({
        url: 'http://localhost/login', //请求地址
        data: "username=" + _this.data.formData.username + "&password=" + _this.data.formData.password +
              "&validateCode=" + _this.data.formData.validateCode + "&rememberMe=false",//请求数据
        method: 'POST',//请求方法
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 请求头
          'cookie': wx.getStorageSync('sessionId')
          // 'content-type': 'x-www-form-urlencoded'
        },
        success (res) {
           wx.setStorageSync('MyToken', res.data.token)
           console.log("打印token:",res.data.token)
              //登录成功
              wx.showModal({
              title: '提示',
              content: '确认登录！',
              showCancel: true,
              success (res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
                } else if (res.cancel) {
                  wx.setStorageSync('MyToken', '')
                }
              }
            })
          }
      })
    }
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: 'http://localhost/login',
      method: 'GET'
    });
   wx.request({
     url: 'http://localhost/captcha/captchaImage?type=math',
     method: 'GET',
     success (res) {
       let sessionId = (res.header['Set-Cookie'].split('; '))[0];
       console.log(sessionId);
       wx.setStorageSync('sessionId', sessionId);
     }
   })
  },
 
 
})