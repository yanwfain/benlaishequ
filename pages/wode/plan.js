// pages/wode/plan.js
var app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		page: 1,
		classid:1,
		movieList: [],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this
		that.getMore(that.data.page)
	},
	deleFn:function(e){
		var that = this;

		wx.showModal({
			title: '提示',
			content: '确定要取消该预约么？',
			success (res) {
				if (res.confirm) {
					console.log('用户点击确定')
					console.log(that.data.movieList)
					var movieList = that.data.movieList
						for(var index in movieList){
							if(e.currentTarget.dataset.index == index){
								movieList.splice(index,1)
							}
						}
						that.setData({
							movieList:movieList
						})
						// return
					var url = app.globalData.host + '/appointment/updateAppointstatus'
					var data = {
							id:e.currentTarget.dataset.id,
							status:3,
							agentId:e.currentTarget.dataset.agentid
						}
					app.wxRequest('POST', url, data, (res) => {
						console.log(res)
						wx.hideLoading()
						console.log(that.data.movieList)
					
						if (res.success) {
							that.setData({
								movieList:[],
								page:1
							})
				
							wx.showToast({
								title: '取消成功',
							})
							that.getMore(that.data.page)
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
		wx.showLoading({
			title:'获取中'
		})
		var that = this;
		var url = app.globalData.host + '/appointment/getPhoneByAppointment'
	
			var data = {
				id:e.currentTarget.dataset.id
			}

    app.wxRequest('POST', url, data, (res) => {
			console.log(res)
			wx.hideLoading()
      if (res.success) {
				wx.makePhoneCall({
					phoneNumber: res.data[0].phone,
					success:function(){
						console.log('拨打成功')
					},
					fail:function(){
						console.log('拨打失败')
					}
				})
      } else {
        wx.showToast({
          title: '失败',
          icon: 'none'
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
 
   

  }, 
	// open: function (e) {
  //   var that = this
  //   wx.makePhoneCall({
  //     phoneNumber: e.currentTarget.dataset.tel, //此号码并非真实电话号码，仅用于测试  
  //     success: function () {
  //       console.log("拨打电话成功！")
  //     },
  //     fail: function () {
  //       console.log("拨打电话失败！")
  //     }
  //   })
	// },
	binqudelFn:function(e){
		var that= this
		wx.showModal({
			title: '提示',
			content: '确定取消该预约？',
			success (res) {
				if (res.confirm) {
					console.log('用户点击确定')
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
	},
	getMore: function (page) {
		wx.showLoading({
			title: '加载中.',
		})
		var that = this;
    var url = app.globalData.host + '/appointment/myAppointmentList';
		if(that.data.tid){
			var data = {
				userId:app.globalData.user_id,
				page:page,
				status:that.data.tid
			}
		}else{
			var data = {
				userId:app.globalData.user_id,
				page:page,

			}
		}

		console.log(page)
		console.log(url)
    app.wxRequest('POST', url, data, (res) => {
			console.log(res)
			wx.hideLoading()
      if (res.success) {
				for(var index in res.data){
					var times = res.data[index].orderTime
					console.log(times.substring(times.length-5))
					res.data[index].times = times.substring(times.length-5)
					res.data[index].days = times.substring(0,10)
				}
			
				console.log(res.data)
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