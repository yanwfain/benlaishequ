// pages/chnegjiaodelit/index.js
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
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      id:options.id
    })
		var that = this;
    var url = app.globalData.host + '/contract/findContractListById';
    var url1 = app.globalData.host + '/contract/findProListById';
    var url2 = app.globalData.host + '/contract/jurisdiction';
    var data = {
     id:options.id
		}
    app.wxRequest('POST', url, data, (res) => {
      wx.hideLoading({
        success: (res) => {},
      })
			console.log(res)
			wx.hideLoading()
      if (res.success) {
        this.setData({
          list_cont:res.data.contract,
          imglist:res.data.img
        })
        var data1 = {
          contractId:res.data.contract.id
        }
        app.wxRequest('POST', url1, data1, (res) => {
          wx.hideLoading({
            success: (res) => {},
          })
          console.log(res)
          wx.hideLoading()
          if (res.success) {
            this.setData({
              botom_list:res.data
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
        that.setData({
          contractId:res.data.contract.id
        })
        var data2 = {
          contractId:res.data.contract.id,
          companyId: wx.getStorageSync('companyId'),
          userId:app.globalData.user_id
        }
        app.wxRequest('POST', url2, data2, (res) => {
          wx.hideLoading({
            success: (res) => {},
          })
          console.log(res)
          wx.hideLoading()
          if (res.success) {
            this.setData({
              iftypeid:res.data
            })
          } else {
            wx.showToast({
              title: res.error_message,
              icon: 'none'
            })
          }})
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
  remark:function(e){
    this.setData({
      remark:e.detail.value
    })
  },
  subFn:function(e){
    var that = this;
    var url = app.globalData.host + '/contract/contractApproval';
    var url2 = app.globalData.host + '/contract/findProListById';
    var data = {
      contractId:this.data.list_cont.id,
      pId:this.data.list_cont.process_id,
      flag:2,
      remark:this.data.remark,
      compayId: wx.getStorageSync('companyId'),
      agentId:app.globalData.user_id
    }
    app.wxRequest('POST', url, data, (res) => {
      wx.hideLoading({
        success: (res) => {},
      })
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        var data2 = {
          contractId:this.data.list_cont.id,
       
        }
        app.wxRequest('POST', url2, data2, (res) => {
          wx.hideLoading({
            success: (res) => {},
          })
          console.log(res)
          wx.hideLoading()
          if (res.success) {
            this.setData({
              botom_list:res.data
            })
          } else {
            wx.showToast({
              title: res.error_message,
              icon: 'none'
            })
          }})
          this.setData({
            isshowModel:false,
            remark:''
          })
       wx.showToast({
         title: '驳回成功',
       })
      } else {
        wx.showToast({
          title: res.error_message,
          icon: 'none'
        })
      }})
  },
  tongguo:function(e){
    var that = this;
    var url = app.globalData.host + '/contract/contractApproval';
    var url2 = app.globalData.host + '/contract/findProListById';
    var url3 = app.globalData.host + '/contract/jurisdiction';
    var data = {
      contractId:this.data.list_cont.id,
      pId:this.data.list_cont.process_id,
      flag:1,

      compayId: wx.getStorageSync('companyId'),
      agentId:app.globalData.user_id
    }
    app.wxRequest('POST', url, data, (res) => {
      wx.hideLoading({
        success: (res) => {},
      })
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        var data2 = {
          contractId:this.data.list_cont.id,
     
        }
        app.wxRequest('POST', url2, data2, (res) => {
          wx.hideLoading({
            success: (res) => {},
          })
          console.log(res)
          wx.hideLoading()
          if (res.success) {
            this.setData({
              botom_list:res.data
            })
            var data3 = {
              contractId:that.data.contractId,
              companyId: wx.getStorageSync('companyId'),
              userId:app.globalData.user_id
            }
            app.wxRequest('POST', url3, data3, (res) => {
              wx.hideLoading({
                success: (res) => {},
              })
              console.log(res)
              wx.hideLoading()
              if (res.success) {
                this.setData({
                  iftypeid:res.data
                })
              } else {
                wx.showToast({
                  title: res.error_message,
                  icon: 'none'
                })
              }})
          } else {
            wx.showToast({
              title: res.error_message,
              icon: 'none'
            })
          }})
        wx.showToast({
          title: '处理成功',
        })
      } else {
        wx.showToast({
          title: res.error_message,
          icon: 'none'
        })
      }})
  },  
  previewImg:function(e){
    console.log();
    var imgArr = this.data.imglist;
    var previewImgArr = []
    for(var index in imgArr){
      previewImgArr.push(imgArr[index].url)
    }
    wx.previewImage({
      current:previewImgArr[e.currentTarget.dataset.index] ,     
      urls: previewImgArr
    })
  },
  isdele:function(e){
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