// pages/guanli/wodemingpian.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgboxs: [],
    isChecked1:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '../shouquan/index',
      })
    }
    if(options.userMid){
      this.setData({
        userMid:options.userMid,
        isChecked2:options.isChecked1,
        userid:app.globalData.user_id
      })
    }else{
      this.setData({
        userMid:app.globalData.user_id,
        userid:app.globalData.user_id
      })
    }
  
  },
  topic_preview: function (e) {
    var that = this;
    var previewImgArr = [];
    var data = this.data.imageUrlHaib
    previewImgArr.push(data)
    wx.previewImage({
      current: previewImgArr[0], // 当前显示图片的http链接
      urls: previewImgArr // 需要预览的图片http链接列表
    })
    console.log( previewImgArr[0])
  },
  imgFn:function(e){
    var that = this;
    var url = e.currentTarget.dataset.url
    var previewImgArr = [];
    previewImgArr.push(url)
    wx.previewImage({
      current: previewImgArr[0], // 当前显示图片的http链接
      urls: previewImgArr // 需要预览的图片http链接列表
    })
  },
  shengchengFn: function (e) {
    wx.showLoading({
      title: '海报生成中.',
    })
    var that = this
    var url = app.globalData.host + '/cart/shareCart';
    var data = {
      id: app.globalData.user_id,
      flag: this.data.isChecked1 ? 1 : 0
    }
    console.log(url)
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {

        that.setData({
          isshowtu:false,
          imageUrlHaib: res.data
        })

      } else {
        wx.showToast({
          title: '生成失败',
          icon: 'none'
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
  },
  shengqFn: function (e) {
    this.setData({
      isshowtu: true,
      imageUrlHaib:''
    })
  },
  opsshied: function (e) {
    this.setData({
      isshowtu: false,
      imageUrlHaib:''

    })
  },
  opsshieds:function(e){
    this.setData({
      imageUrlHaib:''
    })
  },
  imgxiaFn:function(e){
    var that = this
    wx.showLoading({
      title: '保存中...'
    })
    wx.downloadFile({
      url:that.data.imageUrlHaib,
      success: function (res) {
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: '您的推广海报已存入手机相册，赶快分享给好友吧',
              showCancel:false,
            })
          },
          fail: function (err) {
            if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
              wx.showModal({
                title: '提示',
                content: '需要您授权保存相册',
                showCancel: false,
                success:modalSuccess=>{
                  wx.openSetting({
                    success(settingdata) {
                      console.log("settingdata", settingdata)
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限成功,再次点击图片即可保存',
                          showCancel: false,
                        })
                      } else {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限失败，将无法保存到相册哦~',
                          showCancel: false,
                        })
                      }
                    },
                    fail(failData) {
                      console.log("failData",failData)
                    },
                    complete(finishData) {
                      console.log("finishData", finishData)
                    }
                  })
                }
              })
            }
          },
          complete(res) {
            wx.hideLoading()
          }
        })
      }
    })
  },
  bianjiFn: function (e) {
    wx.navigateTo({
      url: '/pages/guanli/bianji',
    })
  },
  changeSwitch1: function (e) {
    console.log(e)
    this.setData({
      isChecked1: e.detail.value
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
    wx.showLoading({
      title:'加载中.'
    })
    var that = this
    var url = app.globalData.host + '/cart/' + this.data.userMid;

    var data = {

    }
    console.log(url)
    app.wxRequest('GET', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        console.log(timestampToTime(res.data.startTime))
        if (res.data.startTime) {
          that.setData({
            date_time: timestampToTime(res.data.startTime)
          })
        }
        var imgboxs = this.data.imgboxs
        var youurl = {
          url1: '',
          url2: ''
        }
        imgboxs.push(youurl);
        for (var index in that.data.imgboxs) {
          that.data.imgboxs[index].url2 = res.data.head
        }
        that.setData({
          imgboxs: that.data.imgboxs
        })
        console.log(that.data.imgboxs)
        that.setData({
          lisr_user: res.data,
          name: res.data.name,
          tel: res.data.tel,
          success: res.data.success,
          countryIndex2: res.data.goodAt,

        })

      } else {
        // wx.showToast({
        //   title: '失败',
        //   icon: 'none'
        // })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
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
  onShareAppMessage: function (e) {
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: e.target.dataset.title,        // 默认是小程序的名称(可以写slogan等)
      path: 'pages/guanli/wodemingpian?userMid=' + app.globalData.user_id + '&isChecked1=' + this.data.isChecked1,// 默认是当前页面，必须是以‘/’开头的完整路径
      imageUrl: '',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      success: function (res) {
        // 转发成功之后的回调
        console.log(res)
        if (res.errMsg == 'shareAppMessage:ok') {

        }
      },
      fail: function () {
        // 转发失败之后的回调
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          // 用户取消转发
          return
        } else if (res.errMsg == 'shareAppMessage:fail') {
          // 转发失败，其中 detail message 为详细失败信息
        }
      }
    }
    // 来自页面内的按钮的转发
    if (e.from == 'button') {
      var eData = e.target.dataset;
      console.log(eData);     // shareBtn
      // 此处可以修改 shareObj 中的内容
      shareObj.path = 'pages/guanli/wodemingpian?userMid=' + app.globalData.user_id + '&isChecked1=' + this.data.isChecked1;
    }
    // 返回shareObj
    return shareObj;
  }
})
function timestampToTime(timestamp) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  // return Y+M+D+h+m+s;
  return Y + M + D;
}