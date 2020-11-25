// pages/guanli/yuyueguanli.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
		movieList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
		that.getMore(that.data.page)
  },
 faqiFn:function(e){
  var that = this;
  wx.showModal({
    title: '提示',
    content: '确定要接受该预约么？',
    success (res) {
      if (res.confirm) {
        console.log('用户点击确定')
        console.log(that.data.movieList)
        var movieList = that.data.movieList
          for(var index in movieList){
            if(e.currentTarget.dataset.index == index){
              movieList[index].followStatus = 1
            }
          }
          that.setData({
            movieList:movieList
          })
          // return
        var url = app.globalData.host + '/appointment/updateAppointstatus'
        var data = {
            id:e.currentTarget.dataset.id,
            status:1,
            agentId:app.globalData.user_id
          }
        app.wxRequest('POST', url, data, (res) => {
          console.log(res)
          wx.hideLoading()
          console.log(that.data.movieList)
        
          if (res.success) {
            wx.showToast({
              title: '预约成功',
            })
          } else {
            wx.showToast({
              title: res.error_message,
              icon: 'none'
            })
          }
        }, (err) => {
          wx.showToast({
            title: '提交失败',
          })
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
 }, 
 wanchengFn:function(e){
  var that = this;
  wx.showModal({
    title: '提示',
    content: '确定完成看房？',
    success (res) {
      if (res.confirm) {
        console.log('用户点击确定')
        console.log(that.data.movieList)
        var movieList = that.data.movieList
          for(var index in movieList){
            if(e.currentTarget.dataset.index == index){
              movieList[index].followStatus=2
            }
          }
          that.setData({
            movieList:movieList
          })
          // return
        var url = app.globalData.host + '/appointment/updateAppointstatus'
        var data = {
            id:e.currentTarget.dataset.id,
            status:2,
            agentId:app.globalData.user_id
          }
        app.wxRequest('POST', url, data, (res) => {
          console.log(res)
          wx.hideLoading()
          console.log(that.data.movieList)
        
          if (res.success) {
            wx.showToast({
              title: '成功',
            })
          } else {
            wx.showToast({
              title: res.error_message,
              icon: 'none'
            })
          }
        }, (err) => {
          wx.showToast({
            title: '提交失败',
          })
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
 }, 
  telFn:function(e){
    var that =this
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel,
      success:function(){
        console.log('拨打成功')
      },
      fail:function(){
        console.log('拨打失败')
      }
    })

  }, 
  makePhoneCall:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel,
      success:function(){
        console.log('拨打成功')
      },
      fail:function(){
        console.log('拨打失败')
      }
    })
  },
  getMore: function (page) {

		var that = this;
    var url = app.globalData.host + '/appointment/appointmentList'
    var data = {
			userId:app.globalData.user_id,
			page:page
		}
    app.wxRequest('POST', url, data, (res) => {
			console.log(res)
			wx.hideLoading()
      if (res.success) {
        for(var index in res.data.list){
					res.data.list[index].bedroom_number = res.data.list[index].bedroom_number?parseInt(res.data.list[index].bedroom_number):res.data.list[index].bedroom_number
					res.data.list[index].livingroom_number =res.data.list[index].livingroom_number?parseInt(res.data.list[index].livingroom_number):res.data.list[index].livingroom_number
				}
        if (that.data.page > 1) {
          var movieLists = that.data.movieList;
          that.setData({
            movieList: movieLists.concat(res.data.list),
            page: page + 1
          })
        } else {
          that.setData({
            movieList: res.data.list,
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