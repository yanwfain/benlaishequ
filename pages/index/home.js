const app = getApp()
var host=app.globalData.host
var city=app.globalData.city
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tid:0,
		page:1,
		classid:1,
		movieList: [],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this
	
	},
	clickclass:function(e){
		wx.navigateBack({
			delta: 1
		})
	},
	tab:function(e){
		this.setData({
			tid:e.currentTarget.dataset.index
		})
	},
	bindconfirm:function(e){
    var that = this;
    var discountName = e.detail.value['search - input'] ? e.detail.value['search - input'] : e.detail.value
    console.log('内容为', discountName)
    this.setData({
      keyword: discountName,
		})
		that.getMore(that.data.page)
    console.log(this.data.keyword)
  },
	getMore: function (page) {
		var that = this;
    var url = app.globalData.host + '/search/index/' + page +'/' + 6;
    var data = {
			search:that.data.keyword,
			flag:that.data.tid
		}

		console.log(page)
		console.log(url)
    app.wxRequest('GET', url, data, (res) => {
			console.log(res)
			wx.hideLoading()
      if (res.success) {
        if (that.data.page > 1) {
          var movieLists = that.data.movieList;
          that.setData({
            movieList: movieLists.concat(res.data.selList),
            page: page + 1
          })
        } else {
          that.setData({
            movieList: res.data.selList,
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