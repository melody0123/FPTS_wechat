var app = getApp();
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    feedback:{},
    touxiang: 'https://manager.diandianxc.com/diandianxc/mrtx.png',
    icon_r: 'https://manager.diandianxc.com/mine/enter.png',
    
    isSex:"0",
    information:[],
    userSex:'',
    modalHidden:true
  },
  //单选按钮发生变化
  radioChange(e){
    console.log(e.detail.value);
    var sexName=this.data.isSex
    this.setData({
      isSex:e.detail.value
    })
  },
 
  //表单提交
  formSubmit(e){
    var information= e.detail.value;

    this.setData({
      information: e.detail.value,
      modalHidden:false
    });
  },
 
  //模态框取消
  modalCancel(){
    wx.showToast({
      title: '取消提交',
      icon:'none'
    })
    this.setData({
      modalHidden:true,
    })
  },
  //模态框确定
  modalConfirm() {
    this.saveAdd();
    wx.showToast({
      title: '提交成功',
      icon:'success'
    })
    this.setData({
      modalHidden: true
    })
    wx.navigateTo({
      url: '/pages/feedback/feedback',
    })
  },
  onLoad: function (options) {
    this.showFeedback();
    console.log(this.feedback);

  },


  saveAdd: function(){
    var that=this;
    console.log(that.data.information);
    wx.request({
      url: 'http://' + app.globalData.serverIP + '/feedback/feedback/add',
      method:'POST',
      data:{
        userFeedbackContent:that.data.information.userFeedbackContent,
        userFeedbackCreatetime:that.data.information.userFeedbackCreatetime,
        completemark:0,
        adminFeedbackContent:that.data.information.adminFeedbackContent,
        userFeedbackId:that.data.information.userFeedbackId,
      },
      header:{
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 请求头
        'cookie': wx.getStorageSync('sessionId')
      },
      success:function(res){ 
        var result=res.data.msg;
        console.log(result); 
        var toastText="新增成功"; 
        if(result!= "操作成功"){
          toastText = "新增失败";
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

})