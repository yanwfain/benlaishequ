// pages/wode/get.js
var app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		jdt_num:[1,2,3,4,5,6,7,8,9,10],
		jdt:0,
		pj:!1,
		bq:!1,
		page: 1,
    movieList: [],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
 
	},
	getMore: function (page) {
    wx.showLoading({
      title: '加载中',
    })
		var that = this;
    var url = app.globalData.host + '/buildResources/getSaveHouselist';
    var data = {
      uid: app.globalData.user_id,
      page:page,
		}
		console.log(page)
		console.log(url)
    app.wxRequest('POST', url, data, (res) => {
			console.log(res)
			wx.hideLoading()
      if (res.success) {
				for(var index in res.data){
					res.data[index].bedroom_number = parseInt(res.data[index].bedroom_number)
					res.data[index].livingroom_number = parseInt(res.data[index].livingroom_number)
				}
        if (that.data.page > 1) {
          var movieLists = that.data.movieList;
          that.setData({
            movieList: movieLists.concat(res.data),
            page: page + 1
          })
        } else {
          that.setData({
            movieList: res.data,
            page: page + 1
          })
        }
      } else {
        wx.showToast({
          title: '没有更多数据了！',
          icon: 'none'
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
	},
	deleshoucangFn:function(e){

    var that = this
    var url = app.globalData.host + '/wlsq/blsq-save/que';
    var data = {
      uid:app.globalData.user_id,
      hid: e.currentTarget.dataset.id
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
     
				that.onShow()
        wx.showToast({
          title: '取消成功',
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
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		wx.showLoading({
			title:'加载中.'
		})
		var that = this
    console.log(this.data)
    this.setData({
      movieList:[],
      page:1
    })
		that.getMore(that.data.page)	
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
		wx.showLoading({
      title: '加载中',
    })
    var that = this;
    this.getMore(that.data.page);
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})