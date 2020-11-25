// pages/index/city.js
var app = getApp()
var QQMapWX = require('../../js/qqmap-wx-jssdk.min.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    var that = this
    that.setData({
      city:options.city
    })
  },
  chengecity:function(e){
    console.log(e)
    app.globalData.city = e.currentTarget.dataset.text
    var that = this
    let pages = getCurrentPages(); //获取当前页面pages里的所有信息。
    let prevPage = pages[pages.length - 2]; //prevPage 是获取上一个页面的js里面的pages的所有信息。-2 是上一个页面，-3是上上个页面以此类推。                                                           
    prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
      city:  e.currentTarget.dataset.text,
    })//上一个页面内执行setData操作，将我们想要的信息保存住。当我们返回去的时候，页面已经处理完毕。
    //最后就是返回上一个页面。
    wx.navigateBack({
      delta: 1,  // 返回上一级页面。
      success: function () {
        console.log('成功！')
      }
    })
  },
	getLocation: function() {
    wx.showLoading({
      title: '定位中',
    })
    var that = this
    console.log(111)
    let QQmap = new QQMapWX({
      key: 'CO5BZ-3DPCX-PSG44-7O2NN-UYBQJ-MGFXE' // 必填
    });
    // 获取当前的地理位置
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: function(res) {
        console.log(res)
        QQmap.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function(res) {
            console.log(res)
            that.setData({
              recommend:res.result.address,
              'region[0]':res.result.address_component.province,
              'region[1]':res.result.address_component.city,
              'region[2]':res.result.address_component.district,
              city:res.result.address_component.city,

            })
            app.globalData.city  = res.result.address_component.city 
            wx.hideLoading()
          },
          fail: function(res) {
            console.log(res)
            wx.hideLoading()
            wx.showToast({
              title: '获取位置失败',
              icon: 'success',
              duration: 2000
            })

          }
        })
      },
      fail: function(res) {
        console.log(res)
        wx.hideLoading()
      }
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