var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    navTab: [""], //
    currentNavtab: "0",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var currentNavtab = this.data.currentNavtab;
    this.searchData(currentNavtab)
    
  },
  searchData: function(currentNavtab){
    var that=this;
    console.log(wx.getStorageSync('sessionId'));
    console.log(currentNavtab);
    wx.request({
      url: 'http://' + app.globalData.serverIP + '/finance_forum/homepage/wxGet/' + currentNavtab,
      method:'POST',
      data:{},
      header:{
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 请求头
        'cookie': wx.getStorageSync('sessionId')
      },
      success:function(res){ 
        var list=res.data; 
        if(list==null){ 
          var toastText='获取数据失败';
          wx.showToast({
            title: toastText,
            icon:'',
            duration:2000 //弹出时间
          })
        }else{
          console.log(res.data);
          that.setData({
            list:list
          })
        }
      }
    })
  },

  switchTab: function(e){
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
    var currentNavtab = this.data.currentNavtab;
    console.log("tab是" + currentNavtab)
    var that = this;
    that.searchData(currentNavtab);
    
  },

  forumEdit: function(e){
    var app = getApp();
    app.globalData.forumlistId = e.currentTarget.dataset.id;
    console.log(app.globalData.forumlistId);
    wx.navigateTo({
      url: '/pages/forum/forumEdit',
    })
  },

  forumAdd: function(){
    wx.navigateTo({
      url: '/pages/forum/forumAdd',
    })
  },

  forumDelete: function (e) { 
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确定要删除[' + e.target.dataset.name +']吗？',
      success:function(sm){ 
        if(sm.confirm){
          wx.request({
            url: 'http://' + app.globalData.serverIP + '/finance_forum/homepage/remove',
            method:'POST',
            data:{
              ids: e.target.dataset.id,
            },
            header:{
              'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 请求头
              'cookie': wx.getStorageSync('sessionId')
            },
            success:function(res){ 
              var result=res.data.msg;
              console.log(result); 
              var toastText="删除成功"; 
              if(result!= "操作成功"){
                toastText = "删除失败";
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
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})