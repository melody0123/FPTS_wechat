var util = require('../../utils/util.js');
var app = getApp();
import { btoa } from '../../utils/imageUtils.js';
const arrayBufferToBase64Img = (buffer) => {
  const str = String.fromCharCode(...new Uint8Array(buffer));
  return `data:image/jpeg;base64,${btoa(str)}`;
}

Page({
  data: {
    motto: 'Hello World',
    avatarUrl: '',
    nickName: ''
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
  feedbackFunc: function () {
    if (0) {
      wx.switchTab({
        url: '/pages/feedback/feedback',
      })
    } else {
      wx.navigateTo({
        url: '/pages/feedback/feedback',
      })
    }
  },

  onLoad: function () {
    console.log('onLoad')
    let that = this;

    // 尝试获取用户头像
    wx.request({
      url: 'http://' + app.globalData.serverIP + '/img/profile.jpg',
      method: "GET",
      responseType: 'arraybuffer',
      header: {
        cookie: wx.getStorageSync('sessionId')
      },
      success: function(res) {
        // 获取成功，显示头像图片
        // console.log(res.data);
        let avatar = arrayBufferToBase64Img(res.data);
        that.setData({
          avatarUrl: avatar,
          show: true
        })
        // console.log(that.data.avatarUrl);
      },
      fail: function() {
        // 获取失败，设置成默认的
        app.getUserInfo(function(userInfo){
          that.setData({
            avatarUrl: userInfo.avatarUrl
          })
        });
      }
    });

    // 获取用户loginName
    let loginName = app.globalData.sysUserInfo.userName;
    if (loginName) {
      // 获取成功
      this.setData({
        nickName: loginName
      });
    } else {
      // 获取失败
      this.setData({
        nickName: '请登录'
      });
    }
  }
})