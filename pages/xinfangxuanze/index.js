// pages/guanli/fangyuanshangchuanOne.js
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
        name: '在售'
      },
      {
        name: '尾盘'
      },
      {
        name: '待售'
      }
    ],
    pickerProDataf1:[
      {
        name: '请选择'
      },
      {
        name: '住宅'
      },
      {
        name: '商住'
      },
      {
        name: '别墅'
      },
      {
        name: '商业'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      communityId: wx.getStorageSync('companyId'),

    })
    console.log(options)
    if(options.houseId){
      this.setData({
     
        houseId:options.houseId
      })
    }
    if(options.id){
      wx.showLoading({
        title:'加载中.'
      })
      this.setData({
        resId:options.id
      })
      var url = app.globalData.host + '/new/buildResources/getResourcesUpByResId';
      var data = {
        resId:options.id
      }
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        wx.hideLoading()
        if (res.success) {
          that.setData({
            houseId:res.data.res.houseId,
            countryIndex:res.data.res.houseStatus?res.data.res.houseStatus:'',
            countryIndex1:res.data.res.product?res.data.res.product:'',
            bili:res.data.res.rate?res.data.res.rate:'',
            shoujia:res.data.res.amount?res.data.res.amount:''
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
    }
  },
  pickerProChangef: function (e) {
    this.setData({ countryIndex: e.detail.value });
    console.log(this.data.countryIndex)
  
  },
  pickerProChangef1: function (e) {
    this.setData({ countryIndex1: e.detail.value });
  },
  pickerProChangef2: function (e) {
    this.setData({ countryIndex2: e.detail.value });
    console.log(this.data.countryIndex2)
    this.setData({
      countryIndex3:'',
    })
    var that = this;
    var url = app.globalData.host + '/community/getBlsqHouseListByUnit';
    let data = {
      buildingId:this.data.pickerProDataf1[this.data.countryIndex1].id,
      unit:this.data.pickerProDataf2[this.data.countryIndex2]
    };
    console.log(data)
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.success) {
        that.setData({
          pickerProDataf3:res.data
        })
      }else{
        wx.showToast({
          title: res.error_message,
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
  },
  pickerProChangef3: function (e) {
    this.setData({ countryIndex3: e.detail.value });
    console.log(this.data.countryIndex3)
  },
  shoujia:function(e){
    this.setData({
      shoujia:e.detail.value
    })
  },
  bili:function(e){
    this.setData({
      bili:e.detail.value
    })
  },
  submit1:function(e){

    if(this.data.countryIndex==0){
      wx.showToast({
        title: '请选择新房状态',
        icon:'none'
      })
      return
    }
    if(!this.data.shoujia){
      wx.showToast({
        title: '请填写售价',
        icon:'none'
      })
      return
    }
    if(this.data.countryIndex1==0){
      wx.showToast({
        title: '请选择产品',
        icon:'none'
      })
      return
    }
    if(!this.data.bili){
      wx.showToast({
        title: '请填写佣金比例',
        icon:'none'
      })
      return
    }
    wx.setStorageSync('xinfang', this.data)
    wx.navigateTo({
      url: '/pages/xinfangxuanzeImg/index?resId=' + this.data.resId,
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})