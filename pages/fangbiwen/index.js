// pages/fangbiwen/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tid: 1,
    page: 1,
    movieList: [],
    keyword:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
		// var url = app.globalData.host + '/login/getUserByOpenid';
    // var data = {
		// 	openid:app.globalData.openId
    // }
    // app.wxRequest('POST', url, data, (res) => {
    //   console.log(res)
    //   wx.hideLoading()
    //   if (res.success) {
    //     that.setData({
    //       listdelit:res.data
		// 		})
				
    //   } else {
    //     wx.showToast({
    //       title: res.msg,
    //     })
    //   }
    // }, (err) => {
    //   wx.showToast({
    //     title: '提交失败',
    //   })
    //   console.log(err.errMsg)
    // })
    that.getMore(that.data.page)

  },
  getMore: function (page) {
    wx.showLoading({
      title: '加载中.',
    })
    var that = this;
    var url = app.globalData.host + '/customer/getNewsList';
    var data = {
      businessType: this.data.tid,
      page: page,
      words: this.data.keyword,
    }
    console.log(page)
    console.log(url)
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
      
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
  clickFn: function (e) {
    this.setData({
      tid: e.currentTarget.dataset.id
    })
    var that = this
    this.setData({
      page:1,
      movieList:[]
    })
    that.getMore(that.data.page)
  },
  bindconfirm: function (e) {
    var that = this;
    var discountName = e.detail.value['search - input'] ? e.detail.value['search - input'] : e.detail.value
    console.log('内容为', discountName)
    this.setData({
      keyword: discountName,
    })
    this.setData({
      page:1,
      movieList:[]
    })
    that.getMore(that.data.page)
    console.log(this.data.keyword)
  },
  contdelitFn: function (e) {
    wx.navigateTo({
      url: '../newDelit/index?id=' + e.currentTarget.dataset.id +'&tid=' + this.data.tid,
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

		that.getMore(that.data.page)
		
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})