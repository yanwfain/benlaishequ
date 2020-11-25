// pages/wode/yuyue.js
var app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		jdt_num: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		jdt: 0,
		slider4: 10,
		page: 1,
		movieList: [],
		tid:false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this
		that.getMore(that.data.page)

	},
	delitFn:function(e){
		wx.navigateTo({
			url: '/pages/zufang/detail?id=' +e.currentTarget.dataset.houseid ,
		})
	},
	clickFn:function(e){
		var that = this
		this.setData({
			tid:e.currentTarget.dataset.id,
			page:1,
			movieList:[],

		})
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
							wx.showToast({
								title: '取消成功',
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
	slider3change: function (e) {
		this.setData({ slider4: e.detail.value })
	},
	liuvalue: function (e) {
		this.setData({
			liuvalue: e.detail.value
		})

	},
	inpsubmitFn: function (e) {
		if (this.data.slider4 <= 6) {
			if (!this.data.liuvalue) {
				wx.showToast({
					title: '请输入评语',
					icon: 'none'
				})
				return

			}
		}
		if (this.data.slider4 <= 6 && this.data.liuvalue.length < 20) {
			wx.showToast({
				title: '评语不能少于20个字',
				icon: 'none'
			})
			return
		}
		this.setData({
			show: false
		})
	},
	pingjiaFn: function (e) {
		this.setData({
			show: true
		})
	},
	subshow: function (e) {
		this.setData({
			show: false
		})
	},
	getMore: function (page) {

		var that = this;
		var url = app.globalData.host + '/appointment/myAppointmentList'
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
    app.wxRequest('POST', url, data, (res) => {
			console.log(res)
			wx.hideLoading()
      if (res.success) {
				for(var index in res.data){
					res.data[index].bedroom_number = res.data[index].bedroom_number?parseInt(res.data[index].bedroom_number):res.data[index].bedroom_number
					res.data[index].livingroom_number =res.data[index].livingroom_number?parseInt(res.data[index].livingroom_number):res.data[index].livingroom_number
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
	// onShareAppMessage: function () {

	// }
})