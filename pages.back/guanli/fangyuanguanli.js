// pages/guanli/fangyuanguanli.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tid:1,
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
    ishow:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  delequxiao:function(e){
    this.setData({
      ishow:false
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
  ycfp: function (e) {
    console.log(e)
    this.setData({
      tid: e.detail.value
    })
    console.log(this.data.tid)
  },
  adduserFn:function(e){
    this.setData({
      ishow:true
    })
  },
  num_type:function(e){
    this.setData({
      num_type:e.detail.value
    })
    console.log(e)
    console.log(this.data.num_type)
  },
  submit_btn:function(e){
    if(this.data.tid==1){
      if(!this.data.num_type){
        wx.showToast({
          title: '请填写房源编号',
          icon:'none'
        })
        return
      }
      wx.navigateTo({
        url: '/pages/guanli/fangyuanshangchuan',
      })
    }
    if(this.data.tid==2){
      
      wx.navigateTo({
        url: '/pages/guanli/fangyuanshangchuanOne',
      })
    }
    this.setData({
      ishow:false
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