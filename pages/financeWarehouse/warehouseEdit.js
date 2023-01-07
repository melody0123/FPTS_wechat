var app = getApp();
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    todolist:{},
    touxiang: 'https://manager.diandianxc.com/diandianxc/mrtx.png',
    icon_r: 'https://manager.diandianxc.com/mine/enter.png',
    sex:[
      {name:'0',value:'男',checked:'true'},
      {name:'1',value:'女'}
    ],
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
    this.saveEdit();
    wx.showToast({
      title: '提交成功',
      icon:'success'
    })
    this.setData({
      modalHidden: true
    })
    wx.navigateTo({
      url: '/pages/financeWarehouse/financeWarehouse',
    })
  },
  onLoad: function (options) {
    console.log(123);
    this.showFinanceList();
    console.log(this.financelist);
  },

  showFinanceList: function(){
    var app = getApp();
    var id = app.globalData.financelistId;
    console.log(id);
    var that=this;
    wx.request({
      url: 'http://' + app.globalData.serverIP + '/finance_warehouse/finance_warehouse/wxEdit/' + id,
      method:'POST',
      data:{},
      header:{
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 请求头
        'cookie': wx.getStorageSync('sessionId')
      },
      success:function(res){ 
        var financelist=res.data; 
        if(financelist==null){ 
          var toastText='获取数据失败';
          wx.showToast({
            title: toastText,
            icon:'',
            duration:2000 //弹出时间
          })
        }else{
          that.setData({
            financelist:financelist
          })
        }
      }
    })
  },

  saveEdit: function(){
    var app = getApp();
    var id = app.globalData.financeId;
    var that=this;
    console.log(that.data.financelist);
    console.log(that.data.information);
    wx.request({
      url: 'http://' + app.globalData.serverIP + '/finance_warehouse/finance_warehouse/edit',
      method:'POST',
      data:{
        id:id,
        productId:that.data.financelist.productId,
        newPrice:that.data.financelist.newPrice,
        openPrice:that.data.financelist.openPrice,
      },
      header:{
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 请求头
        'cookie': wx.getStorageSync('sessionId')
      },
      success:function(res){ 
        var result=res.data.msg;
        console.log(result); 
        var toastText="修改成功"; 
        if(result!= "操作成功"){
          toastText = "修改失败";
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