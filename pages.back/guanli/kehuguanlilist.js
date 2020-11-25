// pages/guanli/kehuguanlilist.js
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
        name: '已推荐'
      },
      {
        name: '看房中'
      },
      {
        name: '待签'
      },
    ],
    ismoedli:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  delehide:function(e){
    this.setData({
      ismoedli:false
    })
  },
  lookFn:function(e){
    this.setData({
      ismoedli:true
    })
  },
  editFn:function(e){
    wx.navigateTo({
      url: '/pages/guanli/adduserkehu',
    })
  },
  adduserFn:function(e){
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
  bindconfirm:function(e){
    var that = this;
    var discountName = e.detail.value['search - input'] ? e.detail.value['search - input'] : e.detail.value
    console.log('内容为', discountName)
    this.setData({
      keyword: discountName,
    })
    console.log(this.data.keyword)
  },
  delitFn:function(e){
    wx.navigateTo({
      url: '/pages/guanli/kehuguanli',
    })
  },
  delitFn1:function(e){
    wx.navigateTo({
      url: '/pages/guanli/kehuguanli?isshowModel=' + true ,
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