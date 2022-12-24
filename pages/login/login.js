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
    },
    img:'http://47.108.114.204:8888/captcha/captchaImage?type=math&s=' + Math.random()
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
        url: 'http://47.108.114.204:8888/login', //请求地址
        data: "username=" + _this.data.formData.username + "&password=" + _this.data.formData.password +
              "&validateCode=" + _this.data.formData.validateCode + "&rememberMe=false",//请求数据
        method: 'POST',//请求方法
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' // 请求头
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
      url: 'http://47.108.114.204:8888/login',
      method: 'GET'
    })
  },
 
 
})