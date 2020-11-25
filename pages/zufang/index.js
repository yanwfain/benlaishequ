// pages/zufang/index.js
var app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		page: 1,
		classid:1,
		movieList: [],
    change: false, // 当两个slider在最右端重合时，将change设置为true，从而隐藏slider2，才能继续操作slider1
    max: 10000, // 两个slider所能达到的最大值
    min: 0, // 两个slider所能取的最小值
    rate: 100, // slider的最大最小值之差和100（或1000）之间的比率
    scale: 1, // 比例系数。页面显示值的时候，需要将slider1Value(slider2Value)乘以比例系数scale
    slider1Max: 10000, // slider1的最大取值
    slider1Value: 0, // slider1的值
    slider2Value: 10000, // slider2的值
    slider2Min: 0, // slider2的最小取值
    slider1W: 100, // slider1的宽度
    slider2W: 0, // slider2的宽度
    leftSliderPriceWidthX: '-1.5%',
		rightSliderPriceWidthX: '-21%',
		countryIndex:'',
		pickerProDataf:[],
		istimes:0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '../shouquan/index',
      })
    }
		var that = this
		console.log(options.id)
		this.setData({
			id:options.id,
			title:options.title
		})
	
	},
	// inpolist:function(e){
	// 	if(!this.data.companyId){
	// 		wx.showToast({
	// 			title: '请先选择物业',
	// 		})
	// 	}
	// },
	pickerProChangef: function (e) {

    this.setData({ countryIndex: e.detail.value });
		console.log(this.data.countryIndex)
		var that = this
		this.setData({
			page:1,
			movieList:[]
		})
		that.getMore1(that.data.page)
	},
	clikFn:function(e){
		var that = this

		this.setData({
			istimes:this.data.istimes==0?1:0
		})
		this.setData({
			page:1,
			movieList:[]
		})
		if(this.data.id){
			that.getMore(that.data.page)
		}else{
			that.getMore1(that.data.page)
		}
	},
	pageFn:function(e){
		// wx.navigateTo({
		// 	url: '/pages/zufang/detail?id='+this.data.id?e.currentTarget.dataset.id:e.currentTarget.dataset.house_id+'&type='+0+'&title='+this.data.title,
		// })
		if(this.data.id){
			wx.navigateTo({
				url: '/pages/zufang/detail?id='+e.currentTarget.dataset.id+ '&type=' + 0 + '&title=' + this.data.title,
			})
		}else{
			wx.navigateTo({
				url: '/pages/zufang/detail?id='+e.currentTarget.dataset.house_id + '&type=' + 0 + '&title=' + this.data.title,
			})
		}
	
	},
	seleFn:function(e){
		wx.navigateTo({
			url: '/pages/wuYelist/index',
		})
	},
	inpmin:function(e){
		this.setData({
			inpmin:e.detail.value
		})
	},
	inpmax:function(e){
		this.setData({
			inpmax:e.detail.value
		})
	},
	subJuFndele:function(e){
		this.setData({
			inpmax:'',
			inpmin:'',
		})
	},
	judeleFn:function(e){
		this.setData({
			iswanishow:false
		})
	},
	subJuFn:function(e){
		this.setData({
			iswanishow:false
		})
	},
	shaixuan:function(e){
		this.setData({
			iswanishow:false,
			pickerShow:false
		})
		wx.navigateTo({
			url: '/pages/ershoufang/screen?classid=' + this.data.classid,
		})
	},
	jineFn:function(e){

		if(this.data.classid==1){
			this.setData({
				pickerShow:this.data.pickerShow?false:true,
		
			})
			
		}
		if(this.data.classid==2){
			this.setData({
				iswanishow:this.data.iswanishow?false:true
			})
		}
	
	},
	pickerShow:function(e){
		this.setData({
			pickerShow:false,

		})
	},
  getMore: function (page) {
		var that = this;
    var url = app.globalData.host + '/community/getBlsqHouseByComSelMore';
    var data = {
      esId: that.data.id?that.data.id:'',
			page:page,
			mole:1,
			asc:this.data.istimes,
			facilities:that.data.list_she?that.data.list_she:'',
			min:that.data.slider1Value||that.data.slider1Value!=0?that.data.slider1Value:'',
			max:that.data.slider2Value||that.data.slider2Value!=0?that.data.slider2Value:'',
		}
		console.log(page)
		console.log(url)
    app.wxRequest('POST', url, data, (res) => {
			console.log(res)
			wx.hideLoading()
      if (res.success) {
				for(var index in res.data.selList){
					res.data.selList[index].bedroom_number = parseInt(res.data.selList[index].bedroom_number)
					res.data.selList[index].livingroom_number = parseInt(res.data.selList[index].livingroom_number)
				}
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
	btn_pic:function(e){
		var that = this
		this.setData({
			page:1,
			movieList:[],
			pickerShow:false
		})
		if(this.data.id){
			this.getMore(that.data.page)
		}else{
			this.getMore1(that.data.page)
		}
	
	},
	getMore1: function (page) {
		var that = this;
    var url = app.globalData.host + '/buildResources/getBuildingByType';
    var data = {
			asc:this.data.istimes,
			city: app.globalData.city,
			remark:1,
			facilities:that.data.list_she?that.data.list_she:'',
			page:page,
			companyId:this.data.companyId?this.data.companyId:'',
			min:that.data.slider1Value||that.data.slider1Value!=0?that.data.slider1Value:'',
			max:that.data.slider2Value||that.data.slider2Value!=0?that.data.slider2Value:'',
		}
		if(this.data.pickerProDataf.length>=1&&this.data.countryIndex){
			data.communityId = this.data.pickerProDataf[this.data.countryIndex].id?this.data.pickerProDataf[this.data.countryIndex].id:''
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
	  // 开始滑动
		changeStart: function (e) {
			var idx = parseInt(e.currentTarget.dataset.idx)
			if (idx === 1) {
				// dW是当前操作的slider所能占据的最大宽度百分数
				var dW = (this.data.slider2Value - this.data.min) / this.data.rate
				this.setData({
					slider1W: dW,
					slider2W: 100 - dW,
					slider1Max: this.data.slider2Value,
					slider2Min: this.data.slider2Value,
					change: false
				})
			} else if (idx === 2) {
		

				var dw = (this.data.max - this.data.slider1Value) / this.data.rate
				this.setData({
					slider2W: dw,
					slider1W: 100 - dw,
					slider1Max: this.data.slider1Value,
					slider2Min: this.data.slider1Value,
					change: false
				})
			}

		},
	 
		// 正在滑动
		changing: function (e) {
			console.log(e)
			var idx = parseInt(e.currentTarget.dataset.idx)
			var value = e.detail.value
			let rightSliderPriceWidthX = (this.data.max-value)/116-21
			let leftSliderPriceWidthX = value/116
			if (idx === 1) {
		
				this.setData({
			
					slider1Value: value,
					leftSliderPriceWidthX:leftSliderPriceWidthX+'%'
				})
			} else if (idx === 2) {
			

				this.setData({
					slider2Value: value,
					rightSliderPriceWidthX: rightSliderPriceWidthX+'%'
				})
			}
			// console.log(this.data.slider1Value)
			// console.log(this.data.slider2Value)
		},
		changed: function (e) {
			
			if (this.data.slider1Value === this.data.slider2Value && this.data.slider2Value === this.data.max) {
				this.setData({
					change: true
				})
			}
		},
		shequFn:function(e){
			wx.navigateTo({
				url: '/pages/shequ/detail?id=' + e.currentTarget.dataset.id + '&communityAnotherName=' + e.currentTarget.dataset.anothername ,
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
		console.log(this.data)
		// if(this.data.companyId){
		// 	this.setData({
		// 		pickerProDataf:'',
		// 		countryIndex:''
		// 	})
		// 	// this.setData({
		// 	// 	page:1,
		// 	// 	movieList:[]
		// 	// })
		// }
		this.setData({
			page:1,
			movieList:[]
		})
		var that = this
	
		if(this.data.id){
			that.getMore(that.data.page)
		}else{
			that.getMore1(that.data.page)
		}
		// if(this.data.companyId){
			
			var url = app.globalData.host + '/community/getTotalListAll'
			var data = {
					city:app.globalData.city,
					companyId:this.data.companyId?this.data.companyId:''
			}
			app.wxRequest('POST', url, data, (res) => {
				console.log(res)
				wx.hideLoading()
				if (res.success) {
						this.setData({
							pickerProDataf:res.data
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
		// }
	
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
		if(this.data.id){
			that.getMore(that.data.page)
		}else{
			that.getMore1(that.data.page)
		}
 
	},

	/**
	 * 用户点击右上角分享
	 */
	// onShareAppMessage: function () {

	// }
})