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
        name: '测试数据deom'
      },
      {
        name: '菜鸟社区'
      },
      {
        name: '脖子酸社区'
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      communityId: wx.getStorageSync('companyId')
    })
    var that = this;
    var url = app.globalData.host + '/community/getCommunityByCompany';
    let data = {
      communityId:wx.getStorageSync('companyId')
    };
    console.log(data)
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.success) {
        that.setData({
          pickerProDataf:res.data,
          countryIndex:0
        })
        var url = app.globalData.host + '/community/getBuildingByEstate';
        let data = {
          estateId:that.data.pickerProDataf[0].id
        };
        console.log(data)
        app.wxRequest('POST', url, data, (res) => {
          console.log(res)
          if (res.success) {
            that.setData({
              pickerProDataf1:res.data
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
  pickerProChangef: function (e) {
    this.setData({ countryIndex: e.detail.value });
    console.log(this.data.countryIndex)
    this.setData({
      countryIndex1:'',
      countryIndex2:'',
      countryIndex3:'',
    })
    var that = this;
    var url = app.globalData.host + '/community/getBuildingByEstate';
    let data = {
      estateId:this.data.pickerProDataf[this.data.countryIndex].id
    };
    console.log(data)
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.success) {
        that.setData({
          pickerProDataf1:res.data
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
  pickerProChangef1: function (e) {
    this.setData({ countryIndex1: e.detail.value });
    this.setData({

      countryIndex2:'',
      countryIndex3:'',
    })
    console.log(this.data.countryIndex1)
    var that = this;
    var url = app.globalData.host + '/community/getUnitList';
    let data = {
      buildingId:this.data.pickerProDataf1[this.data.countryIndex1].id
    };
    console.log(data)
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.success) {
        that.setData({
          pickerProDataf2:res.data
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
  submit1:function(e){
    if(!this.data.pickerProDataf3[this.data.countryIndex3].id){
      wx.showToast({
        title: '请完善信息后提交',
        icon:'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/guanli/fangyuanshangchuan?num_type=' + this.data.pickerProDataf3[this.data.countryIndex3].id,
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