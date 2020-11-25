// pages/wuYelist/index.js
var app = getApp()
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
    var that = this;
    // var url = app.globalData.host + '/company/listLogo';
    var url = app.globalData.host + '/company';
    let data = {
        
    };
    console.log(data)
    app.wxRequest('GET', url, data, (res) => {
      console.log(res)
      if (res.success) {
        that.setData({
          wyList:res.data
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
    this.setData({
      city:app.globalData.city
    })
  },
  clocjkFn:function(e){
    wx.setStorageSync('companyId','')
    wx.setStorageSync('shequdelit','')
    app.globalData.companyId =  ''
    app.globalData.companyName = ''
    let pages = getCurrentPages(); //获取当前页面pages里的所有信息。
    let prevPage = pages[pages.length - 2]; //prevPage 是获取上一个页面的js里面的pages的所有信息。-2 是上一个页面，-3是上上个页面以此类推。                                                           
    prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
      companyId: '',
      shequdelit: ''
    })//上一个页面内执行setData操作，将我们想要的信息保存住。当我们返回去的时候，页面已经处理完毕。
    //最后就是返回上一个页面。
    wx.navigateBack({
      delta: 1,  // 返回上一级页面。
      success: function () {
        console.log('成功！')
      }
    })
  },
  clickFn:function(e){
    var that = this
    wx.setStorageSync('companyId',e.currentTarget.dataset.id )
    wx.setStorageSync('shequdelit',e.currentTarget.dataset.name )
    let pages = getCurrentPages(); //获取当前页面pages里的所有信息。
    let prevPage = pages[pages.length - 2]; //prevPage 是获取上一个页面的js里面的pages的所有信息。-2 是上一个页面，-3是上上个页面以此类推。                                                           
    prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
      companyId:  e.currentTarget.dataset.id,
      shequdelit:  e.currentTarget.dataset.name
    })//上一个页面内执行setData操作，将我们想要的信息保存住。当我们返回去的时候，页面已经处理完毕。
    //最后就是返回上一个页面。
    wx.navigateBack({
      delta: 1,  // 返回上一级页面。
      success: function () {
        console.log('成功！')
      }
    })
    app.globalData.companyId =  e.currentTarget.dataset.id
    app.globalData.companyName = e.currentTarget.dataset.name
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