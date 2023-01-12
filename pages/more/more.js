var util = require('../../utils/util.js');
var app = getApp();
import { btoa } from '../../utils/imageUtils.js';
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
  assetsFunc: function () {
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
  recordFunc: function () {
    if (1) {
      wx.switchTab({
        url: '/pages/discovery/discovery',
      })
    } else {
      wx.navigateTo({
        url: '/pages/discovery/discovery',
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
  forumFunc: function () {
    if (0) {
      wx.switchTab({
        url: '/pages/forum/forum',
      })
    } else {
      wx.navigateTo({
        url: '/pages/forum/forum',
      })
    }
  },

  onLoad: function () {
    console.log('onLoad')
    let that = this;
    // 尝试获取用户头像
    console.log(app.globalData.sysUserInfo);
    if (app.globalData.sysUserInfo != null && app.globalData.sysUserInfo.avatar != "") {
      wx.request({
        url: 'http://' + app.globalData.serverIP + app.globalData.sysUserInfo.avatar,
        method: "GET",
        responseType: 'arraybuffer',
        header: {
          cookie: wx.getStorageSync('sessionId')
        },
        success: function(res) {
          // 获取成功，显示头像图片
          // console.log(res);
          if(res.statusCode == 404) {
            // 图片不在服务器上
            wx.request({
              url: 'http://' + app.globalData.serverIP + '/img/profile.jpg',
              method: "GET",
              responseType: 'arraybuffer',
              header: {
                cookie: wx.getStorageSync('sessionId')
              },
              success: function(res) {
                // 显示默认头像图片
                // console.log(res.data);
                let avatar = arrayBufferToBase64Img(res.data);
                that.setData({
                  avatarUrl: avatar,
                  show: true
                })
                // console.log(that.data.avatarUrl);
              }
            })
          } else {
            // 图片在服务器上
            let avatar = arrayBufferToBase64Img(res.data);
            that.setData({
              avatarUrl: avatar,
              show: true
            })
          }
          // console.log(that.data.avatarUrl);
        }
      });
    } else if (app.globalData.sysUserInfo != null && app.globalData.sysUserInfo.avatar == "") {
      console.log("here!")
      // 信息获取成功但是用户没有设置头像
      wx.request({
        url: 'http://' + app.globalData.serverIP + '/img/profile.jpg',
        method: "GET",
        responseType: 'arraybuffer',
        header: {
          cookie: wx.getStorageSync('sessionId')
        },
        success: function(res) {
          // 显示默认头像图片
          // console.log(res.data);
          let avatar = arrayBufferToBase64Img(res.data);
          that.setData({
            avatarUrl: avatar,
            show: true
          })
          // console.log(that.data.avatarUrl);
        }
      })
    } else {
      // 未登录或用户信息获取失败
      app.getUserInfo(function(userInfo){
        that.setData({
          avatarUrl: userInfo.avatarUrl
        })
      });
    }
    
    // 获取用户loginName
    if (app.globalData.sysUserInfo != null) {
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
    } else {
      // 没有登录或用户信息获取失败
      this.setData({
        nickName: '请登录'
      });
    }
  }
})