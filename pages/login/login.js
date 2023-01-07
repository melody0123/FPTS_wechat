// pages/login/login.js
// pages/login/index.js
import { btoa } from './loginUtils';
const arrayBufferToBase64Img = (buffer) => {
  const str = String.fromCharCode(...new Uint8Array(buffer));
  return `data:image/jpeg;base64,${btoa(str)}`;
}

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:'',
    validateCode:'',
    imgUrl: ''
  },
  setUsername(e) {
    this.setData({
      username: e.detail.value
    })
  },
  setPassword(e) {
    this.setData({
      password: e.detail.value
    })
  },
  setValidateCode(e) {
    this.setData({
      validateCode:e.detail.value
    })
  },
  loginFun(){
    // console.log(this.data.formData);
    // 检查所有登录用的字段是否填写完毕
    if(!this.data.username || !this.data.password || !this.data.validateCode) {
      // 没有填写完整
      wx.showToast({
        title: '信息不完整',
        icon:'error',
        duration: 2000
      })
    } else {
      // 填写完整，向服务器发送登录请求
      let that = this;
      wx.request({
        url: 'http://localhost/login', //请求地址
        data: {username: that.data.username, password: that.data.password, validateCode: that.data.validateCode, rememberMe: "false"}, //请求数据
        method: 'POST', //请求方法
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 请求头
          'cookie': wx.getStorageSync('sessionId') // 取 session
        },
        success (res) {
          // console.log(res);
          // 判断是否登录成功
          if (res.statusCode == 200 && res.data.code == 0 && res.data.msg == "操作成功") {
            // 登录成功
            console.log("登录成功");
          } else if (res.statusCode == 200 && res.data.code == 500 && res.data.msg == "用户不存在/密码错误") {
            // 登录失败，用户不存在/密码错误
            console.log("登录失败，用户不存在/密码错误");
          } else if (res.statusCode == 200 && res.data.code == 500 && res.data.msg == "验证码错误") {
            // 登录失败，验证码错误
            console.log("验证码错误");
          } else {
            // 网络错误
            console.log("网络错误");
          }
          // wx.showModal({
          //   title: '提示',
          //   content: '确认登录！',
          //   showCancel: true,
          //   success (res) {
          //     if (res.confirm) {
          //       wx.switchTab({
          //         url: '/pages/index/index',
          //       })
          //     }
          //   }
          // })
        }
      })
    }
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    wx.request({
      url: 'http://localhost/login',
      method: 'GET'
    });
   wx.request({
     url: 'http://localhost/captcha/captchaImage?type=math',
     method: 'GET',
     responseType: 'arraybuffer',
     success (res) {
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