// pages/guanli/yaoshiguanli.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerProDataf: [
      {
        name: '请选择'
      },
      {
        name: '高档社区'
      },
      {
        name: '菜鸟社区'
      },
      {
        name: '脖子酸社区'
      },
    ],
    pickerProDataf2: [
      {
        name: '业务类型'
      },
      {
        name: '在租房源'
      },
      {
        name: '在售房源'
      }
    ],
    listJu:[
      {
        id:1,
        name:'一居',
        chenkhu:false
      },
      {
        id:2,
        name:'两居',
        chenkhu:false

      },
      {
        id:1,
        name:'三居',
        chenkhu:false

      },
      {
        id:1,
        name:'四居',
        chenkhu:false

      },
      {
        id:1,
        name:'五居及以上',
        chenkhu:false

      },
    ],
    listJu_list:[],
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
    urlId:1,
    movieList:[],
    page:1
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      agentId:app.globalData.user_id,
      shequdelit: wx.getStorageSync('shequdelit' ),
      companyId:wx.getStorageSync('companyId' ),
     })
    that.getMore(that.data.page)
  },
  beizhuFn:function(e){
    this.setData({
      ismoedli:this.data.ismoedli?false:true
    })
  },
  delehide:function(e){
    this.setData({
      ismoedli:false
    })
  },
  delehides:function(e){
    this.setData({
      ismoedlis:false
    })
  },
  submitQue:function(e){
    this.setData({
      ismoedlis:false
    })
  },
  inpFns:function(e){
    if(e.detail.value>this.data.isnum){
      wx.showToast({
        title: '不能大于持有钥匙总数量',
        icon:'none'
      })
      this.setData({
        inpFns:this.data.isnum
      })
      return
    }
    this.setData({
      inpFns:e.detail.value
    })
  },
  phoneFn:function(e){
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
  jiaohui:function(e){
    this.setData({
      ismoedlis:true,
      ishouseId:e.currentTarget.dataset.houseid,
      isnum:e.currentTarget.dataset.num
    })
  },
  submitQue:function(e){
    if(!this.data.inpFns){
      wx.showToast({
        title: '请填写数量',
        icon:'none'
      })
      return
    }
    var that = this;
    wx.showLoading({
      title:'提交中.'
    })
    var url = app.globalData.host + '/key/returnKeys';
    var data = {
      houseId:this.data.ishouseId,
      agentId:app.globalData.user_id,
      num:'-'+this.data.inpFns
    }
    app.wxRequest('POST', url, data, (res) => {
      wx.hideLoading({
        success: (res) => {},
      })
			console.log(res)
			wx.hideLoading()
      if (res.success) {
       wx.showToast({
         title: '提交成功',
       })
       this.setData({
        inpFns:'',
        ismoedlis:false,
        page:1,
        movieList:[]
      })
      that.getMore(that.data.page)
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
  lookuserFn:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    that.getMore(that.data.page)
  },
  clickFn1:function(e){
    var that = this
    this.setData({
      urlId:e.currentTarget.dataset.id,
      page:1,
      movieList:[]
    })
    that.getMore(that.data.page)
  },
  getMore: function (page) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    if(that.data.urlId==1){
      var url = app.globalData.host + '/key/keysListForAll';
    var data = {
      companyId:wx.getStorageSync('companyId'),
      page:page
		}}
    if(that.data.urlId==2){
      var url = app.globalData.host + '/key/keysListForAgent';
      var data = {
        companyId:wx.getStorageSync('companyId'),
        agentId:app.globalData.user_id,
        page:page
      }
    }
    app.wxRequest('POST', url, data, (res) => {
      wx.hideLoading({
        success: (res) => {},
      })
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
  huxinFn:function(e){
    this.setData({
      huishow:this.data.huishow?false:true,
      mianishow:false,
      louishow:false,
      iswanishow:false

    })
  },
  subJuFndele:function(e){
    var listJu = this.data.listJu
    for(var index in listJu){
        listJu[index].chenkhu = false
    }
    this.setData({
      listJu_list:[],
      listJu:listJu,
    })
  },
  clickjuFn:function(e){
    var listJu = this.data.listJu
    var _index =  e.currentTarget.dataset.index
    var listJu_list = []
    for(var index in listJu){
      if(index == _index){
        listJu[index].chenkhu = listJu[index].chenkhu?false:true
      }
      if( listJu[index].chenkhu){
        listJu_list.push( listJu[index].id)
      }
    }
   
    this.setData({
      listJu_list:listJu_list,
      listJu:listJu,
    })
    console.log(listJu_list)
  },
  judeleFn:function(e){
    this.setData({
      huishow:false
    })
  },
  judeleFnwan:function(e){
    this.setData({
      huishow:false
    })
  },
  subJuFn:function(e){
    this.setData({
      huishow:false
    })
  },
  mianjiFn:function(e){
    this.setData({
      mianishow:this.data.mianishow?false:true,
      huishow:false,
      louishow:false,
      iswanishow:false
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

  subMianuFndele:function(e){
    this.setData({
      inpmax:'',
      inpmin:'',
    })
  },
  miandeleFn:function(e){
    this.setData({
      mianishow:false
    })
  },
  subMianuFn:function(e){
    this.setData({
      mianishow:false
    })
  },
  louinp:function(e){
    this.setData({
      louinp:e.detail.value
    })
  },
  daninp:function(e){
    this.setData({
      daninp:e.detail.value
    })
  },
  louFn:function(e){
    this.setData({
      louishow:this.data.louishow?false:true,
      huishow:false,
      mianishow:false,
      iswanishow:false
    })
  },
  loudeleFn:function(e){
    this.setData({
      louishow:false
    })
  },
  subLouFn:function(e){
    this.setData({
      louishow:false
    })
  },
  subLouFndele:function(e){
    this.setData({
      daninp:'',
      louinp:''
    })
  },
  jineFn:function(e){
    console.log(this.data.countryIndex)
    if(this.data.countryIndex2==0||!this.data.countryIndex2){
      wx.showToast({
        title: '请先选择业务类型',
        icon:'none'
      })
      return
    }
    this.setData({
      huishow:false,
      mianishow:false,
      louishow:false,
    })
    if(this.data.countryIndex2==1){
      this.setData({
        pickerShow:this.data.pickerShow?false:true
      })
    }
    if(this.data.countryIndex2==2){
      this.setData({
        iswanishow:this.data.iswanishow?false:true
      })
    }
  },
  inpminwan:function(e){
    this.setData({
      inpminwan:e.detail.value
    })
  },
  inpmaxwan:function(e){
    this.setData({
      inpmaxwan:e.detail.value
    })
  },
  subJuFndelewan:function(e){
    this.setData({
      inpminwan:'',
      inpmaxwan:''
    })
  },
  subJuFnwan:function(e){
    this.setData({
      iswanishow:false
    })
  },
	pickerShow:function(e){
		this.setData({
			pickerShow:false
		})
	},
  pickerProChangef: function (e) {
    this.setData({ countryIndex: e.detail.value });
    console.log(this.data.countryIndex)
  },
  pickerProChangef2: function (e) {
    var that = this
    this.setData({ countryIndex2: e.detail.value });
    console.log(this.data.countryIndex2)
    this.setData({
      huishow:false,
      mianishow:false,
      louishow:false,
      iswanishow:false
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
		},
		changed: function (e) {
			if (this.data.slider1Value === this.data.slider2Value && this.data.slider2Value === this.data.max) {
				this.setData({
					change: true
				})
			}
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
		// wx.showLoading({
    //   title: '加载中',
    // })
    // var that = this;
	
		// that.getMore(that.data.page)
		
    // wx.hideLoading()
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
		
    wx.hideLoading()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})