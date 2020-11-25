// pages/guanli/fangyuanguanli.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tid:1,
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
    pickerProDataf1: [
      {
        name: '请选择'
      },
      {
        name: '空置中'
      },
      {
        name: '自用'
      },
      {
        name: '待租'
      },
      {
        name: '待签'
      },
      {
        name: '租期中'
      },
      {
        name: '下架'
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
    pickerProDataf3: [
      {
        name: '请选择'
      },
      {
        name: '待售'
      },
      {
        name: '待签'
      },
      {
        name: '交易中'
      },
    ],
    ishow:false,
    page: 1,
    movieList: [],
    businessType:'',
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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
   this.setData({
 
    shequdelit: wx.getStorageSync('shequdelit' ),
    companyId:wx.getStorageSync('companyId' ),
   })
   
  //  that.getMore(that.data.page)
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
      louishow:false

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
      louishow:false
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
      mianishow:false
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
  getMore: function (page) {
    wx.showLoading({
      title: '加载中',
    })
		var that = this;
    var url = app.globalData.host + '/buildResources/getResourcesUpByUser';
    var data = {
      agentId: app.globalData.user_id,
      page:page,
      businessType:this.data.businessType
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
  getMore1: function (page) {
    wx.showLoading({
      title: '加载中',
    })
		var that = this;
    var url = app.globalData.host + '/buildResources/getResourcesUpByUser';
    var data = {
      agentId: app.globalData.user_id,
      page:page,
      businessType:this.data.businessType
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
       
          var movieLists = that.data.movieList;
          that.setData({
            movieList: movieLists.concat(res.data),
            page: page + 1
          })
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
  lookFn:function(e){
    this.setData({
      ismoedli:true
    })
  },
  delitFn:function(e){
    wx.navigateTo({
      url: '/pages/guanli/fangyuanguanlilist?id=' + e.currentTarget.dataset.id + '&businessType=' +e.currentTarget.dataset.businessType ,
    })
  },
  delitFn1:function(e){
    wx.navigateTo({
      url: '/pages/guanli/fangyuanguanlilist?isshowModel=' + true  + '&id=' + e.currentTarget.dataset.id
    })
  },
  editFn:function(e){
    wx.navigateTo({
      url: '/pages/guanli/fangyuanshangchuan?id=' + e.currentTarget.dataset.id + '&num_type=' + e.currentTarget.dataset.houseid,
    })
    
  },
  // adduserFn:function(e){
  //   wx.navigateTo({
  //     url: '/pages/guanli/adduserkehu',
  //   })
  // },
  delequxiao:function(e){
    this.setData({
      ishow:false
    })
  },
  pickerProChangef: function (e) {
    this.setData({ countryIndex: e.detail.value });
    console.log(this.data.countryIndex)
  },
  pickerProChangef1: function (e) {
    console.log(e)
    this.setData({ countryIndex1: e.detail.value });
    console.log(this.data.countryIndex1)
    console.log(this.data.pickerProDataf1[e.detail.value])
    wx.showLoading({
      title: '修改中',
    })
		var that = this;
    var url = app.globalData.host + '/buildResources/transHouseStatus';
    var data = {
      status: that.data.pickerProDataf1[e.detail.value].name,
			id:e.target.dataset.id,
		}
    app.wxRequest('POST', url, data, (res) => {
      wx.hideLoading({
        success: (res) => {},
      })
			console.log(res)
			wx.hideLoading()
      if (res.success) {
        wx.showToast({
          title: '修改成功'
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
  },
  pickerProChangef2: function (e) {
    var that = this
    this.setData({ countryIndex2: e.detail.value });
    console.log(this.data.countryIndex2)
    if(e.detail.value==1){
      this.setData({
        businessType:'租'
      })
    }
    if(e.detail.value==2){
      this.setData({
        businessType:'售'
      })
    }
    if(e.detail.value==0){
      this.setData({
        businessType:''
      })
    }
    this.setData({
      movieList:[],
      page:1
    })
		that.getMore(that.data.page)
  },
  pickerProChangef3: function (e) {
    this.setData({ countryIndex3: e.detail.value });
    console.log(this.data.countryIndex3)
    wx.showLoading({
      title: '修改中',
    })
		var that = this;
    var url = app.globalData.host + '/buildResources/transHouseStatus';
    var data = {
      status: that.data.pickerProDataf3[e.detail.value].name,
			id:e.target.dataset.id,
		}
    app.wxRequest('POST', url, data, (res) => {
      wx.hideLoading({
        success: (res) => {},
      })
			console.log(res)
			wx.hideLoading()
      if (res.success) {
        wx.showToast({
          title: '修改成功'
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
  },
  ycfp: function (e) {
    console.log(e)
    this.setData({
      tid: e.detail.value
    })
    console.log(this.data.tid)
  },
  adduserFn:function(e){
    this.setData({
      ishow:true
    })
  },
  num_type:function(e){
    this.setData({
      num_type:e.detail.value
    })
    console.log(e)
    console.log(this.data.num_type)
  },
  submit_btn:function(e){
    if(this.data.tid==1){
      if(!this.data.num_type){
        wx.showToast({
          title: '请填写房源编号',
          icon:'none'
        })
        return
      }
      wx.navigateTo({
        url: '/pages/guanli/fangyuanshangchuan?num_type=' + this.data.num_type,
      })
    }
    if(this.data.tid==2){
      
      wx.navigateTo({
        url: '/pages/guanli/fangyuanshangchuanOne',
      })
    }
    this.setData({
      ishow:false
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
    var that = this
    console.log(this.data)
    this.setData({
      movieList:[],
      page:1
    })
       that.getMore(that.data.page)
    // if(that.data.page>1){
    //   that.getMore1(that.data.page)
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
    this.getMore(that.data.page);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})