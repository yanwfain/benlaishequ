// pages/wode/index.js
var app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tid:2,
		statusBarHeight: app.globalData.statusBarHeight,//获取导航高度
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
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
    
	},
	guanliFn:function(e){
		if(this.data.listdelit.roleId>=1){
			wx.navigateTo({
				url: '/pages/guanli/index',
			})
		}else{
			wx.showToast({
				title: '无权限进入该模块',
			})
		}
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
		var that = this
		var url = app.globalData.host + '/wlsq/blsq-save/getScanInfo';
    var data = {
			userId:app.globalData.user_id
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
					// listdelit:res.data
					save:res.data.save?res.data.save:0,
					see:res.data.see?res.data.see:0,
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
	// onShareAppMessage: function () {

	// }
})