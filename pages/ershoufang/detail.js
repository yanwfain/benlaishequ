// pages/zufang/detail.js
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imgList:[
			{imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600661911114&di=bb991286d16ece675de92289bfdfbc83&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F20%2F99%2F2256cd8f725b549.jpg',img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600661911114&di=bb991286d16ece675de92289bfdfbc83&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F20%2F99%2F2256cd8f725b549.jpg'},{imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600661911114&di=bb991286d16ece675de92289bfdfbc83&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F20%2F99%2F2256cd8f725b549.jpg',img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600661911114&di=bb991286d16ece675de92289bfdfbc83&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F20%2F99%2F2256cd8f725b549.jpg'}],
			height:0,
			heig:0,
			type:0//type=0代表租房，type=1代表二手房
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			id:options.id,
			title:options.title
		})
		var that = this
    var url = app.globalData.host + '/community/getBlsqHouseByid';
    var data = {
			id:options.id,
			userid: app.globalData.user_id
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          lismy:res.data
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
	  // 地图
		click: function (e) {
			var that = this
			wx.openLocation({
				latitude: 39.923399,
				longitude: 116.151929,
				scale:12,
				name: that.data.index_div.name,
				address: ''
			})
		},
	imageLoads: function (e) {//获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      ratio = imgwidth / imgheight;
      console.log(imgwidth)
      var heig=100/ratio*0.8;
      this.setData({
        height:heig
      })
  },
	imageLoad: function (e) {//获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      ratio = imgwidth / imgheight;
      console.log(imgwidth)
      var heig=100/ratio;
      this.setData({
        heig:heig
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