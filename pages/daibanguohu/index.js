// pages/daibanguohu/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  community:function(e){
    this.setData({
      community:e.detail.value
    })
  },
  houseCode:function(e){
    this.setData({
      houseCode:e.detail.value
    })
  },
  userName:function(e){
    this.setData({
      userName:e.detail.value
    })
  },
  userPhone:function(e){
    this.setData({
      userPhone:e.detail.value
    })
  },
  submit:function(e){
    if(!this.data.region){
      wx.showToast({
        title: '请选择城市',
        icon:'none'
      })
      return
    }
    if(!this.data.community){
      wx.showToast({
        title: '请填写所在小区',
        icon:'none'
      })
      return
    }
    if(!this.data.houseCode){
      wx.showToast({
        title: '请填写门牌号',
        icon:'none'
      })
      return
    }
    if(!this.data.userName){
      wx.showToast({
        title: '请填写称呼',
        icon:'none'
      })
      return
    }
    if(!this.data.userPhone){
      wx.showToast({
        title: '请填写联系方式',
        icon:'none'
      })
      return
    }
    wx.showLoading({
      title:'提交中.'
    })
    var that = this
    var url = app.globalData.host + '/customer/saveTransfer'
    var data = {
        agentId:app.globalData.user_id,
        city:that.data.region[0] + that.data.region[1] + that.data.region[2],
        community:this.data.community,
        userName:this.data.userName,
        userPhone:this.data.userPhone,
      }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.showToast({
          title: '提交成功',
        })
        setTimeout(function(e){
          wx.navigateBack({
            delta: 1,
          },900)
        })
      } else {
        wx.showToast({
          title: res.error_message,
          icon: 'none'
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})