// pages/shequ/more.js
var app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		wx.showLoading({
			title: '加载中.'
		})
		var that = this
		var url = app.globalData.host + '/community/getCommoImgBySq';
		var data = {
			sqId: options.id,
		}
		app.wxRequest('POST', url, data, (res) => {
			console.log(res)
			wx.hideLoading()
			if (res.success) {

				this.setData({
					imglist: res.data
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
	topic_preview: function (e) {
		var that = this;
		var id = e.currentTarget.dataset.id;
		var url = e.currentTarget.dataset.url;
		//通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
		wx.previewImage({
			current: url, // 当前显示图片的http链接
			urls: that.data.imglist // 需要预览的图片http链接列表
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