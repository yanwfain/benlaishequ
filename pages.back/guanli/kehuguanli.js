// pages/guanli/kehuguanli.js
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
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      isshowModel:options.isshowModel
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
  },
  isdele:function(e){
    this.setData({
      isshowModel:false
    })
  },
  subFn:function(e){
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