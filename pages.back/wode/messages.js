// pages/wode/messages.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		date:'',
		date_star:'开始时间',
		date_end:''
	},
	bindDateChangeStar: function(e) {
    this.setData({
      date_star: e.detail.value
    })
	},
	bindDateChangeEnd: function(e) {
    this.setData({
      date_end: e.detail.value
    })
  },
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {	
		var timestamp = Date.parse(new Date());
		var date = new Date(timestamp);
		//获取年份  
		var Y =date.getFullYear();
		//获取月份  
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
		//获取当日日期 
		var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
		var the_date=Y+'-'+M+'-'+D;
		this.setData({
			date:the_date,
			date_end:the_date
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