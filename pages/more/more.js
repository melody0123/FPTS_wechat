var util = require('../../utils/util.js')
var app = getApp()
import { btoa } from '../../utils/imageUtils';
const arrayBufferToBase64Img = (buffer) => {
  const str = String.fromCharCode(...new Uint8Array(buffer));
  return `data:image/jpeg;base64,${btoa(str)}`;
}

Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: "",
      nickName: ""
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: ''
    })
  },
  loginFunc: function () {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  /* 当功能已在底边栏应用时，标记为1，使用switchTab切换页面，
  当功能不在底边栏应用时，标记为0，使用navigateTo新开页面 */
  newsFunc: function () {
    if (1) {
      wx.switchTab({
        url: '/pages/news/news',
      })
    } else {
      wx.navigateTo({
        url: '/pages/news/news',
      })
    }
  },
  financeWarehouseFunc: function () {
    if (0) {
      wx.switchTab({
        url: '/pages/financeWarehouse/financeWarehouse',
      })
    } else {
      wx.navigateTo({
        url: '/pages/financeWarehouse/financeWarehouse',
      })
    }
  },
  financeQueryFunc: function () {
    if (1) {
      wx.switchTab({
        url: '/pages/financeQuery/financeQuery',
      })
    } else {
      wx.navigateTo({
        url: '/pages/financeQuery/financeQuery',
      })
    }
  },
  recordFunc: function () {
    if (0) {
      wx.switchTab({
        url: '/pages/accountAssets/accountAssets',
      })
    } else {
      wx.navigateTo({
        url: '/pages/accountAssets/accountAssets',
      })
    }
  },
  todolistFunc: function () {
    if (0) {
      wx.switchTab({
        url: '/pages/todolist/todolist',
      })
    } else {
      wx.navigateTo({
        url: '/pages/todolist/todolist',
      })
    }
  },
  noticeFunc: function () {
    if (1) {
      wx.switchTab({
        url: '/pages/notice/notice',
      })
    } else {
      wx.navigateTo({
        url: '/pages/notice/notice',
      })
    }
  },

  onLoad: function () {
    console.log('onLoad')
    let that = this;
    // 尝试获取用户头像和昵称
    wx.request({
      url: 'http://localhost/img/profile.jpg',
      method: "GET",
      responseType: 'arraybuffer',
      header: {
        cookie: wx.getStorageSync('sessionId')
      },
      success: function(res) {
        // 显示验证码图片
       let url = arrayBufferToBase64Img(res.data);
       that.setData({
        userInfo: {
          avatarUrl: url,
          show:true,
          nickName: ""
        }
       })
      }
    })
  }
})