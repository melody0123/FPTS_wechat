// 通过sessionId获取loginName
selectLoginNameBySessionId: function(sessionId) {
  wx.request({
    url: 'http://localhost/monitor/online/getLoginNameBySessionId',
  })
}