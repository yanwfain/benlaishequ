// pages/guanli/kehuguanli.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshowModel:false,
    pickerProDataf: [
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
        name: '下架'
      },
      {
        name: '待签'
      },
      {
        name: '租期中'
      },
     
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
      {
        name: '下架'
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      isshowModel:options.isshowModel,
      id:options.id
    })
   this.onloModelit()
  },
  onloModelit:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var url = app.globalData.host + '/buildResources/getFollowList';
    var data = {
      resId:that.data.id,
		}
		console.log(url)
    app.wxRequest('POST', url, data, (res) => {
      wx.hideLoading({
        success: (res) => {},
      })
			console.log(res)
			wx.hideLoading()
      if (res.success) {
        that.setData({
          list:res.data,
         
        })
        if(res.data.res.businessType==1){
          this.setData({
            countryIndex:res.data.res.houseStatus?res.data.res.houseStatus:'',
          })
        }
        if(res.data.res.businessType==2){
          this.setData({
            countryIndex3:res.data.res.houseStatus?res.data.res.houseStatus:'',
          })
        }
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
  editFn:function(e){
    wx.navigateTo({
      url: '/pages/guanli/fangyuanshangchuan?id=' + e.currentTarget.dataset.id + '&num_type=' + e.currentTarget.dataset.houseid,
    })
  },
  pickerProChangef: function (e) {
    this.setData({ countryIndex: e.detail.value });
    console.log(this.data.countryIndex)
    wx.showLoading({
      title: '修改中',
    })
		var that = this;
    var url = app.globalData.host + '/buildResources/transHouseStatus';
    var data = {
      status: e.detail.value,
			id:that.data.list.res.id,
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
  pickerProChangef3: function (e) {
    this.setData({ countryIndex3: e.detail.value });
    console.log(this.data.countryIndex3)
    wx.showLoading({
      title: '修改中',
    })
		var that = this;
    var url = app.globalData.host + '/buildResources/transHouseStatus';
    var data = {
      status: e.detail.value,
      id:that.data.list.res.id,

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
  isdele:function(e){
    this.setData({
      isshowModel:false
    })
  },
  content:function(e){
    this.setData({
      content:e.detail.value
    })
  },
  subFn:function(e){
    var that = this;
    var url = app.globalData.host + '/buildResources/saveFollowUp';
    var data = {
      agentId: app.globalData.user_id,
      resId:that.data.id,
      content:that.data.content,
		}
		console.log(url)
    app.wxRequest('POST', url, data, (res) => {
      wx.hideLoading({
        success: (res) => {},
      })
			console.log(res)
			wx.hideLoading()
      if (res.success) {
        wx.showToast({
          title: '提交成功'
        })
        that.setData({
          content:''
        })
        this.onloModelit()
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
    this.setData({
      isshowModel:false
    })
  },
  ismodelshow:function(e){
    this.setData({
      isshowModel:true
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