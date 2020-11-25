// pages/xinfang/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList:[
      {
        img:'http://39.106.122.121:9000/file/blzzw.jpg'
       },
      {
        img:'http://39.106.122.121:9000/file/blfs.jpg'
       },
       {
        img:'http://39.106.122.121:9000/file/bllj.jpg'
       },
       
       {
        img:'http://39.106.122.121:9000/file/blck.jpg'
       },

  ],
    taid:1,
    page: 1,
		movieList: [],
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getMore(that.data.page)
    console.log(this.data.movieList)
  },
  getMore: function (page) {
    wx.showLoading({
      title: '加载中.',
    })
		var that = this;
    var url = app.globalData.host + '/new/community/getEstateAll';
    var data = {
      city: app.globalData.city,
      page:this.data.page
      // companyId: app.globalData.companyId,
		}
		console.log(page)
		console.log(url)
    app.wxRequest('POST', url, data, (res) => {
			console.log(res)
			wx.hideLoading()
      if (res.success) {
				// for(var index in res.data.selList){
				// 	res.data.selList[index].bedroom_number = parseInt(res.data.selList[index].bedroom_number)
				// 	res.data.selList[index].livingroom_number = parseInt(res.data.selList[index].livingroom_number)
				// }
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
  clickFns:function(e){
    this.setData({
      taid:e.currentTarget.dataset.id
    })
  },
  binddelir:function(e){
    wx.navigateTo({
      url: '/pages/xinfang/detail?id=' + e.currentTarget.dataset.id,
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
  scrollFn:function(e){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
   });
  },
  onPageScroll:function(e){
    console.log(e)
    if(e.scrollTop>150){
      this.setData({
        isscroll:true
      })
    }else{
      this.setData({
        isscroll:false
      })
    }
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