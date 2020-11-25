const app = getApp()
var host=app.globalData.host
var city=app.globalData.city
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		show:!1,
		list:[],
		tid:1,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			shequdelit:app.globalData.companyName?app.globalData.companyName:'',
      companyId:app.globalData.companyId?app.globalData.companyId:'',
			city:	app.globalData.city
		})
		console.log(app.globalData.city)
	},
	xloptpageFn:function(e){
		wx.navigateTo({
			url: '/pages/wuYelist/index',
		})
		this.setData({
			show:false
		})
	},
	change:function(e){
		this.setData({
			show:this.data.show?false:true
		})
	},
	clickFn:function(e){
		this.setData({
			tid:e.currentTarget.dataset.id,
			show:false
		})
	},
	getShequ:function(){
		wx.showLoading({
			title:'数据加载中.'
		})
		if(app.globalData.companyId){
			var urlFn = '/community/getDetailListAll'
		}else{
			var urlFn = '/community/getEstateListAll'
		}
	
	
    var that=this
		wx.request({
      url: host+urlFn, //获取列表
      method: 'POST', //请求方式
      data:{
				city:app.globalData.city,
				companyId: app.globalData.companyId
      },
      header: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync("sessionid")
      },
      success: function(res) {
				console.log(res)
				wx.hideLoading({
					success: (res) => {},
				})
        if(res.data.success){
					that.setData({
						list:res.data.data
					})
        } 
      }
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
		this.getShequ()
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