// pages/chnegjiao/index.js
var app =getApp()
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
        name: '已租房源'
      },
      {
        name: '已售房源'
      }
    ],
    pickerProDataf3: [
      {
        name: '状态'
      },
      {
        name: '审核中'
      },
      {
        name: '审核失败'
      },
      {
        name: '已驳回'
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
    page: 1,
    movieList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
 
      shequdelit: wx.getStorageSync('shequdelit' ),
      companyId:wx.getStorageSync('companyId' ),
     })
     var that = this
     var url = app.globalData.host + '/login/getUserByOpenid';
     var data = {
       openid:app.globalData.openId
     }
     app.wxRequest('POST', url, data, (res) => {
       console.log(res)
       wx.hideLoading()
       if (res.success) {
         that.setData({
           quanxian:res.data.roleId
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
  tel:function(e){
    wx.showLoading({
      title: '获取中.',
    })
    var that = this
    var url = app.globalData.host + '/contract/getAgentPhone';
    var data = {
      contractId:e.currentTarget.dataset.id
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.makePhoneCall({
          phoneNumber: res.data.phone,
          success:function(){
            console.log('拨打成功')
          },
          fail:function(){
            console.log('拨打失败')
          }
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
  getMore: function (page) {
    wx.showLoading({
      title: '加载中',
    })
		var that = this;
    var url = app.globalData.host + '/contract/findContractListByUserId';
    var data = {
      companyId:wx.getStorageSync('companyId'),
      userId:app.globalData.user_id,
      page:page
		}
		console.log(page)
		console.log(url)
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
  delitFn:function(e){
    this.setData({
      list_id:e.currentTarget.dataset.id,
      isstatusop:true,
      index_o:e.currentTarget.dataset.index
    })
    
  },
  isShowque:function(e){
    this.setData({
      isstatusop:false
    })
  },
  substatusFn:function(e){
    // 修改状态  bottid
    // 点击修改哪条数据  list_id
    if(!this.data.bottid){
      wx.showToast({
        title: '请选择状态',
        icon:'none'
      })
      return
    }
    this.setData({
      // status:this.data.bottid,
      isstatusop:false
    })
    console.log(this.data.movieList)
    console.log(this.data.index_o)
    for(var index in this.data.movieList){
      if(this.data.index_o == index){
        this.data.movieList[index].conStatus = this.data.bottid
      }
    }
    this.setData({
      movieList:this.data.movieList
    })
    console.log(this.data.movieList)

  },
  clicklist_c:function(e){

    this.setData({
      bottid:e.currentTarget.dataset.id,
    })
  },
  seleFn:function(e){
    wx.navigateTo({
      url: '/pages/wuYelist/index',
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
  subLouFndele:function(e){
    this.setData({
      daninp:'',
      louinp:''
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
  lookFn:function(e){
    wx.navigateTo({
      url: '../chnegjiaodelit/index?id=' + e.currentTarget.dataset.id,
    })
  },
  delitFn1:function(e){
    wx.navigateTo({
      url: '../chnegjiaodelit/index?id=' + e.currentTarget.dataset.id,
    })
  },
  addzuFn:function(e){
    wx.navigateTo({
      url: '../addzu/index?typePage=' + 1,
    })
  },
  addshouFn:function(e){
    wx.navigateTo({
      url: '../addzu/index?typePage=' +2,
    })
  },
  xuigaiFn:function(e){
    if(e.currentTarget.dataset.type==1){
      wx.navigateTo({
        url: '../addzu/index?typePage=' + 1 + '&id=' + e.currentTarget.dataset.id + '&pageid=' + 1,
      })
    }
    if(e.currentTarget.dataset.type==2){
      wx.navigateTo({
        url: '../addzu/index?typePage=' + 2 + '&id=' + e.currentTarget.dataset.id + '&pageid=' + 1,
      })
    }
   
  },
  jineFn:function(e){
    console.log(this.data.countryIndex2)
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
  pickerProChangef3: function (e) {
    var that = this
    this.setData({ countryIndex3: e.detail.value });
    console.log(this.data.countryIndex3)
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