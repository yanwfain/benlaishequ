// pages/guanli/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shequName:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   shequdelit: wx.getStorageSync('shequdelit' )
    // })
    
    var that = this
		var url = app.globalData.host + '/login/getUserByOpenid';
    var data = {
			openid:app.globalData.openId
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          listdelit:res.data
        })
      } else {
        wx.showToast({
          title: res.msg,
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
    var that = this
		var url = app.globalData.host + '/appointment/getCompanyByUser';
    var data = {
			userId:app.globalData.user_id
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.setStorageSync('companyId',res.data.company[0].dept_id )
        wx.setStorageSync('shequdelit',res.data.company[0].dept_name )
        that.setData({
          shequdelit:res.data.company[0].dept_name,
          usershequName:res.data.name
        })
        for(var index in res.data.role){
            this.data.shequName.push(res.data.role[index].role_name)
        }
        this.setData({
          shequName: this.data.shequName
        })
        console.log(this.data.shequName)
      } else {
        wx.showToast({
          title: res.msg,
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
  },
  click5:function(e){
    wx.navigateTo({
      url: '../shuju/index',
    })
  },
  xinpanFn:function(e){
    wx.navigateTo({
      url: '../xinpanguanli/detail',
    })
  },
  chnegjiaoFn:function(e){
    wx.navigateTo({
      url: '../chnegjiao/index',
    })
  },
  click1:function(e){
    wx.navigateTo({
      url: '/pages/guanli/fangyuanguanli',
    })
  },
  kehuFn:function(e){
    wx.navigateTo({
      url: '/pages/guanli/kehuguanlilist',
    })
  },
  click4:function(e){
    wx.navigateTo({
      url: '/pages/guanli/yaoshiguanli',
    })
  },
  click8:function(e){
    wx.navigateTo({
      url: '/pages/guanli/wodemingpian',
    })
  },
  click7:function(e){
    wx.navigateTo({
      url: "/pages/guanli/yuyueguanli",
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