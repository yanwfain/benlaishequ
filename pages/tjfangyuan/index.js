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
    pickerProDataf1: [
      {
        name: '请选择'
      },
      {
        name: '出租房屋'
      },
      {
        name: '出售房屋'
      },
      {
        name:'新盘'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(wx.getStorageSync('companyId'))
    this.setData({
      customerId:options.id
    })
    var that = this;
    var url = app.globalData.host + '/customer/getEasteByAgent';
    let data = {
      agentId:app.globalData.user_id,
      companyId:wx.getStorageSync('companyId')
    };
    console.log(data)
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.success) {
        that.setData({
          pickerProDataf:res.data,
          countryIndex:0
        })
        var url = app.globalData.host + '/customer/getBuildingByAgent';
        let data = {
          agentId:app.globalData.user_id,
          estateId:that.data.pickerProDataf[0].id
        };
        console.log(data)
        app.wxRequest('POST', url, data, (res) => {
          console.log(res)
          this.setData({
            countryIndex2:'',
            countryIndex3:'',
            countryIndex4:'',
          })
          wx.hideLoading({
            success: (res) => {},
          })
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
  chongzhi:function(e){
    this.setData({
      countryIndex:'',
      countryIndex1:0,
      countryIndex2:'',
      countryIndex3:'',
      countryIndex4:'',
    })
  },
 
  subQue:function(e){
    console.log(this.data.countryIndex1)
    // console.log(this.data.pickerProDataf4[this.data.countryIndex4].houseCode)
    if(!this.data.pickerProDataf4){
      if(!this.data.countryIndex4){
        wx.showToast({
          title: '请完善信息后提交',
          icon:'none'
        })
        return
      }
     
    }
  
    if(this.data.countryIndex1==0||!this.data.countryIndex1){
      wx.showToast({
        title: '请选择业务类型',
        icon:'none'
      })
      return
    }
    var that = this;
    var url = app.globalData.host + '/customer/recommend';
    let data = {
      customerId:that.data.customerId,
      agentId:app.globalData.user_id,
      recourseId:that.data.recourseId,
      businessType:that.data.countryIndex1
    };
    console.log(data)
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      
      wx.hideLoading({
        success: (res) => {},
      })
      if (res.success) {
        wx.navigateBack({
          delta: 1,
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
    wx.showLoading({
      title: '查询中.',
    })
    var that = this;
    var url = app.globalData.host + '/customer/getBuildingByAgent';
    let data = {
      agentId:app.globalData.user_id,
      estateId:that.data.pickerProDataf[e.detail.value].id
    };
    console.log(data)
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      this.setData({
        countryIndex2:'',
        countryIndex3:'',
        countryIndex4:'',
      })
      wx.hideLoading({
        success: (res) => {},
      })
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
    wx.showLoading({
      title: '查询中.',
    })
    var that = this;
    var url = app.globalData.host + '/customer/getUnitByAgent';
    let data = {
      agentId:app.globalData.user_id,
      buildingId:that.data.pickerProDataf2[e.detail.value].id
    };
    console.log(data)
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      this.setData({

        countryIndex3:'',
        countryIndex4:'',
      })
      wx.hideLoading({
        success: (res) => {},
      })
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
    this.setData({

    })
    this.setData({ countryIndex3: e.detail.value });
    console.log(this.data.countryIndex3)
    var that = this;
    var url = app.globalData.host + '/customer/getHouseByAgent';
    let data = {
      agentId:app.globalData.user_id,
      buildingId:that.data.pickerProDataf2[e.detail.value].id,
      unit:that.data.pickerProDataf3[e.detail.value].unit
    };
    console.log(data)
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      this.setData({
        countryIndex4:'',
      })
      wx.hideLoading({
        success: (res) => {},
      })
      if (res.success) {
        that.setData({
          pickerProDataf4:res.data
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
  pickerProChangef4: function (e) {

    this.setData({ 
      countryIndex4: e.detail.value ,
      recourseId:this.data.pickerProDataf4[e.detail.value].id
    });
    console.log(this.data.countryIndex4)
  },
  pickerProChangef1: function (e) {
    this.setData({ countryIndex1: e.detail.value });
    console.log(this.data.countryIndex1)
  },
  submit1:function(e){
    wx.navigateTo({
      url: '/pages/guanli/fangyuanshangchuan',
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