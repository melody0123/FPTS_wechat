// pages/register/getRegisterToken.js
// pages/resetPassword/resetPassword.js
var app = getApp();
import { btoa } from '../../utils/imageUtils';
const arrayBufferToBase64Img = (arrayBuffer) => {
  let str = '';
  const chunk = 8 * 1024;
  let typedArray = new Uint8Array(arrayBuffer);
  let i = 0;
  for (; i < typedArray.length / chunk; i++) {
    str += String.fromCharCode(...typedArray.slice(i * chunk, (i + 1) * chunk));
  }
  str += String.fromCharCode(...typedArray.slice(i * chunk));

  return `data:image/jpeg;base64,${btoa(str)}`;
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    mailAddress:'',
    validateCode:'',
    imgUrl: ''
  },

  // 提交注册申请
  submitResetRequest: function(e) {
    // console.log(e.detail.value);
    let that = this;
    // 读取一边用户输入的数据
    this.data.mailAddress = e.detail.value.mailAddress;
    this.data.validateCode = e.detail.value.validateCode;
    // 检查所有字段是否填写完毕
    if(!this.data.mailAddress || !this.data.validateCode) {
      // 没有填写完整
      wx.showToast({
        title: '信息不完整',
        icon:'error',
        duration: 2000
      })
    } else {
      // 填写完整，向服务器发送重置请求
      wx.request({
        url: 'http://' + app.globalData.serverIP + '/getRegisterToken', //请求地址
        data: {email: that.data.mailAddress, validateCode: that.data.validateCode}, //请求数据
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
              content: '令牌已经发往您的邮箱，即将前往信息填写页面',
              showCancel: false,
              complete: (res) => {
                wx.navigateTo({
                  url: '/pages/register/register',
                })
              }
            });
          } else if (res.statusCode == 200 && res.data.code == 500) {
            // 操作失败
            // console.log("登录失败，" + res.data.msg);
            wx.showModal({
              title: '操作失败',
              content: res.data.msg + '，请重试',
              showCancel: false,
              complete: function() {
                that.refreshValidateCode();
                that.setData({
                  validateCode: ''
                });
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
            complete: function() {
              that.refreshValidateCode();
              that.setData({
                validateCode: ''
              });
            }
          })
        }
      })
    }
  },

  // 监听验证码输入框
  getChar: function(e) {
    // console.log(e.detail.value);
    this.setData({
      validateCode:e.detail.value
    });
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
      url: 'http://' + app.globalData.serverIP + '/login',
      method: 'GET'
    });
   wx.request({
     url: 'http://' + app.globalData.serverIP + '/captcha/captchaImage?type=math',
     method: 'GET',
     responseType: 'arraybuffer',
     success: function(res) {
       // 记录 session
       let sessionId = (res.header['Set-Cookie'].split('; '))[0];
       // console.log(sessionId);
       wx.setStorageSync('sessionId', sessionId);

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