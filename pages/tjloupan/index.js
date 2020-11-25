// pages/guanli/fangyuanshangchuanOne.js
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
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  chongzhi:function(e){
    this.setData({
      countryIndex:0,
      countryIndex1:0
    })
  },
 
  subQue:function(e){
    wx.navigateBack({
      delta: 1,
    })
  },
  pickerProChangef: function (e) {
    this.setData({ countryIndex: e.detail.value });
    console.log(this.data.countryIndex)
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