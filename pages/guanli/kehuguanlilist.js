// pages/guanli/kehuguanlilist.js
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
    pickerProDataf1: [
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
    ],
    ismoedli: false,
    page: 1,
    movieList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // that.getMore(that.data.page)
    this.setData({

      shequdelit: wx.getStorageSync('shequdelit'),
      companyId: wx.getStorageSync('companyId'),
    })
  },
  tuijianFn: function (e) {
    wx.navigateTo({
      url: '../tjfangyuan/index?id=' + e.currentTarget.dataset.id,
    })
  },
  delehide: function (e) {
    this.setData({
      ismoedli: false
    })
  },
  lookFn: function (e) {
    var _id = e.currentTarget.dataset.id
    var _tel = e.currentTarget.dataset.tel
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var url = app.globalData.host + '/customer/viewCustomerPhone';
    var data = {
      agentId: app.globalData.user_id,
      customerId: _id
    }
    console.log(url)
    app.wxRequest('POST', url, data, (res) => {
      wx.hideLoading({
        success: (res) => { },
      })
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          ismoedli: true,
          telPhone: _tel
        })
        var url = app.globalData.host + '/customer/getViewRecordList';
        var data = {
          customerId: _id,
        }
        app.wxRequest('POST', url, data, (res) => {
          wx.hideLoading({
            success: (res) => { },
          })
          console.log(res)
          wx.hideLoading()
          if (res.success) {
            that.setData({
              listTel: res.data
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
  telFn: function (e) {
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.telPhone,
      success: function () {
        console.log('拨打成功')
      },
      fail: function () {
        console.log('拨打失败')
      }
    })

  },
  editFn: function (e) {
    wx.navigateTo({
      url: '/pages/guanli/adduserkehu?id=' + e.currentTarget.dataset.id,
    })
  },
  adduserFn: function (e) {
    wx.navigateTo({
      url: '/pages/guanli/adduserkehu',
    })
  },
  pickerProChangef: function (e) {
    this.setData({ countryIndex: e.detail.value });
    console.log(this.data.countryIndex)
  },
  pickerProChangef1: function (e) {
    this.setData({ countryIndex1: e.detail.value });
    console.log(this.data.countryIndex)
  },
  changeDate(e) {
    console.log(e)
    this.setData({ date_time: e.detail.value });
  },
  bindconfirm: function (e) {
    var that = this;
    var discountName = e.detail.value['search - input'] ? e.detail.value['search - input'] : e.detail.value
    console.log('内容为', discountName)
    this.setData({
      keyword: discountName,
    })
    console.log(this.data.keyword)
  },
  delitFn: function (e) {
    wx.navigateTo({
      url: '/pages/guanli/kehuguanli?id=' + e.currentTarget.dataset.id,
    })
  },
  delitFn1: function (e) {
    wx.navigateTo({
      url: '/pages/guanli/kehuguanli?isshowModel=' + true,
    })
  },
  getMore: function (page) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var url = app.globalData.host + '/customer/pageCustomerByCompany';
    var data = {
      companyId: that.data.companyId,
      page: page,
    }

    console.log(page)
    console.log(url)
    app.wxRequest('POST', url, data, (res) => {
      wx.hideLoading({
        success: (res) => { },
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
    var url = app.globalData.host + '/customer/pageCustomerByCompany';
    var data = {
      companyId: that.data.companyId,
      page: page,
    }

    console.log(page)
    console.log(url)
    app.wxRequest('POST', url, data, (res) => {
      wx.hideLoading({
        success: (res) => { },
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
    // this.setData({
    //   movieList:[],
    //   page:1
    // })
    //  that.getMore(that.data.page)

    // if (that.data.page == 2) {
      this.setData({
        movieList: [],
        page: 1
      })
      that.getMore(1)
    // }
    // if (that.data.page > 1) {
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