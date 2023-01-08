// pages/register/register.js
var app = getApp();
import { btoa } from '../../utils/imageUtils';
const arrayBufferToBase64Img = (buffer) => {
  const str = String.fromCharCode(...new Uint8Array(buffer));
  return `data:image/jpeg;base64,${btoa(str)}`;
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    loginName:'',
    password:'', 
    validateCode:'',
    isChecked: false,
    imgUrl: ''
  },

  // 监听 checkbox
  checkBoxChange: function(e) {
    // console.log(e.detail)
    if (e.detail.value.length > 0) {
      this.setData({
        isChecked: true
      });
    } else {
      this.setData({
        isChecked: false
      });
    }
  },

  // 登录函数
  registerFun: function(e) {
    // console.log(e.detail.value);
    // 读取一边用户输入的数据
    this.data.loginName = e.detail.value.loginName;
    this.data.password = e.detail.value.password;
    this.data.validateCode = e.detail.value.validateCode;
    // 检查所有登录用的字段是否填写完毕
    if(!this.data.loginName || !this.data.password || !this.data.validateCode) {
      // 没有填写完整
      wx.showToast({
        title: '信息不完整',
        icon:'error',
        duration: 2000
      })
      return;
    } else if (!this.data.isChecked) {
      // 请勾选阅读并同意使用条款
      wx.showToast({
        title: '请阅读并同意使用条款',
        icon:'none',
        duration: 2000
      })
      return;
    } else if (this.data.password.length < 5) {
      // 密码长度不够
      wx.showToast({
        title: '密码至少5位',
        icon:'error',
        duration: 2000
      })
      return;
    } else {
      // 填写完整，向服务器发送登录请求
      let that = this;
      wx.request({
        url: 'http://' + app.globalData.serverIP + '/register', //请求地址
        data: {loginName: that.data.loginName, password: that.data.password, validateCode: that.data.validateCode}, //请求数据
        method: 'POST', //请求方法
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 请求头
          'cookie': wx.getStorageSync('sessionId') // 取 session
        },
        success: function(res) {
          // console.log(res);
          // 判断是否注册成功
          if (res.statusCode == 200 && res.data.code == 0 && res.data.msg == "操作成功") {
            // 注册成功
            // console.log("注册成功");
            wx.showModal({
              title: '注册成功',
              content: '即将前往登录页',
              showCancel: false,
              complete: (res) => {
                wx.navigateTo({
                  url: '/pages/login/login'
                })
              }
            });
          } else if (res.statusCode == 200 && res.data.code == 500) {
            // 注册失败
            // console.log("注册失败，" + res.data.msg);
            wx.showModal({
              title: '注册失败',
              content: res.data.msg + '，请重试',
              showCancel: false,
              complete: (res) => {
                wx.reLaunch({
                  url: '/pages/register/register',
                })
              }
            })
          }
        },
        fail: function(res) {
          // 网络错误
          // console.log("网络错误");
          wx.showModal({
            title: '登录失败',
            content: '网络错误，请重试',
            showCancel: false,
            complete: (res) => {
              wx.reLaunch({
                url: '/pages/register/register',
              })
            }
          })
        }
      })
    }
  },

  // 刷新验证码
  refreshValidateCode: function() {
    let that = this;
    wx.request({
      url: 'http://' + app.globalData.serverIP + '/captcha/captchaImage?type=math&s=' + Math.random(),
      method: 'GET',
      responseType: 'arraybuffer',
      header: {
        'cookie': wx.getStorageSync('sessionId') // 取 session
      },
      success: function(res) {
        // 显示验证码图片
       let url = arrayBufferToBase64Img(res.data);
       that.setData({
        imgUrl : url,     //设置data里面的图片url
        show:true
       })
      }
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.request({
      url: 'http://' + app.globalData.serverIP + '/register',
      method: 'GET'
    });
   wx.request({
     url: 'http://' + app.globalData.serverIP + '/captcha/captchaImage?type=math',
     method: 'GET',
     responseType: 'arraybuffer',
     header: {
      'cookie': wx.getStorageSync('sessionId')
     },
     success: function(res) {
       // console.log(sessionId);
       // 显示验证码图片
       let url = arrayBufferToBase64Img(res.data);
       that.setData({
        imgUrl : url,     //设置data里面的图片url
        show:true
       })
     }
   })
  }
})