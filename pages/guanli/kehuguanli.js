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
        name: '已推荐'
      },
      {
        name: '看房中'
      },
      {
        name: '待签'
      },
      {
        name: '草签'
      },
      {
        name: '签约'
      },
      {
        name: '交易完成'
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
    // wx.showLoading({
    //   title: '加载中',
    // })
		// var that = this;
    // var url = app.globalData.host + '/customer/getSourseByCustomer';
    // var data = {
    //   customerId: options.id,
		// }
    // app.wxRequest('POST', url, data, (res) => {
    //   wx.hideLoading({
    //     success: (res) => {},
    //   })
		// 	console.log(res)
		// 	wx.hideLoading()
    //   if (res.success) {
    //     that.setData({
    //       listcont:res.data,
    //       countryIndex:res.data.customer.userStatus
    //     })
    //   } else {
    //     wx.showToast({
    //       title: res.error_message,
    //       icon: 'none'
    //     })
    //   }
    // }, (err) => {
    //   wx.showToast({
    //     title: '提交失败',
    //   })
    // })
  },
  fangyuanFn:function(e){
    wx.navigateTo({
      url: '/pages/zufang/detail?id=' + e.currentTarget.dataset.houseid,
    })
  },
  tuijianFn:function(e){  
    wx.navigateTo({
      url: '../tjfangyuan/index?id=' + e.currentTarget.dataset.id,
    })
  },
  tuuijianlou:function(e){
    wx.navigateTo({
      url: '../tjloupan/index',
    })
  },
  editFn:function(e){
    wx.navigateTo({
      url: '/pages/guanli/adduserkehu',
    })
  },
  pickerProChangef: function (e) {
    this.setData({ countryIndex: e.detail.value });
    console.log(this.data.countryIndex)
    wx.showLoading({
      title: '加载中',
    })
		var that = this;
    var url = app.globalData.host + '/customer/transUserStatus';
    var data = {
      id: this.data.listcont.customer.id,
      status:e.detail.value
		}
    app.wxRequest('POST', url, data, (res) => {
      wx.hideLoading({
        success: (res) => {},
      })
			console.log(res)
			wx.hideLoading()
      if (res.success) {
        wx.showToast({
          title:'修改成功'
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
  
    wx.showLoading({
      title: '加载中',
    })
		var that = this;
    var url = app.globalData.host + '/customer/saveCustomerFollow';
    var data = {
      recourseId:this.data.recourseId,
      agentId:app.globalData.user_id,
      content:this.data.content,
      customerId:this.data.listcont.customer.id
    }
    app.wxRequest('POST', url, data, (res) => {
      wx.hideLoading({
        success: (res) => {},
      })
			console.log(res)
			wx.hideLoading()
      if (res.success) {
        that.setData({
          isshowModel:false,
          content:''
        })
        wx.showToast({
          title: '填写成功',
        })
        var url = app.globalData.host + '/customer/getSourseByCustomer';
        var data = {
          customerId:that.data.id,
        }
        app.wxRequest('POST', url, data, (res) => {
          wx.hideLoading({
            success: (res) => {},
          })
          console.log(res)
          wx.hideLoading()
          if (res.success) {
         
            that.setData({
              listcont:res.data
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
  },
  ismodelshow:function(e){
    console.log(e)
    this.setData({
      isshowModel:true,
      recourseId:e.currentTarget.dataset.recourseid,

    })
    console.log(this.data.recourseId)
  },
  binajiFn:function(e){
   
  },
  zhankailist:function(e){
    var listcont = this.data.listcont.follows
    console.log(e.currentTarget.dataset.recourseid)
    for(var index in listcont){
      if(e.currentTarget.dataset.recourseid==listcont[index].recourseId){
        console.log(e.currentTarget.dataset.recourseid)
        console.log(listcont[index].recourseId)
        listcont[index].isshow = true
      }
    }
    this.setData({
      'listcont.follows':listcont
    })
    console.log(this.data.listcont)
    console.log(this.data.listcont.follows)
  },
  shouqilist:function(e){
    var listcont = this.data.listcont.follows
    console.log(e.currentTarget.dataset.recourseid)
    for(var index in listcont){
      if(e.currentTarget.dataset.recourseid==listcont[index].recourseId){
        console.log(e.currentTarget.dataset.recourseid)
        console.log(listcont[index].recourseId)
        listcont[index].isshow = false
      }
    }
    this.setData({
      'listcont.follows':listcont
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
    if(this.data.id){
      wx.showLoading({
        title:'加载中'
      })
      var that = this;
      var url = app.globalData.host + '/customer/getSourseByCustomer';
      var data = {
        customerId: this.data.id,
      }
      app.wxRequest('POST', url, data, (res) => {
        wx.hideLoading({
          success: (res) => {},
        })
        console.log(res)
        wx.hideLoading()
        if (res.success) {
          for(var index in res.data.follows){
            if(res.data.follows[index].follow){
              res.data.follows[index].isshow = false
            }
          }
          console.log(res.data)
          that.setData({
            listcont:res.data,
            countryIndex:res.data.customer.userStatus
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
    }
   
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