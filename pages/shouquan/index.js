// pages/shouquan/index.js
const app = getApp()
var httpUtils = require('../../js/httpUtils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isSiuser: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(app.globalData)
    setTimeout(function () {
      if (app.globalData.userInfo == null) {
        that.setData({
          hasUserInfo: false,
    
        })
      }
    }, 1000)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
    
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,

        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            isUser: true
          })
        }
      })
    }
  },
  ggopfns: function (e) {
    this.setData({
      isSiuser: false
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  ggopfn: function (e) {
    this.setData({
      hasUserInfo: true
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  getUserInfo(e) {

    console.log("ok")
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        console.log(res)
        app.globalData.userInfo = res.userInfo
        that.setData({
          encryptedData: res.encryptedData,
          iv: res.iv,
          rawData: res.rawData,
          wxuser: res.userInfo,
          signature: res.signature,
          hasUserInfo: true,
          canIUse: true,
          isUser: true,
          isSiuser: false,
          headimg: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
        getOpenid(that, res.userInfo)
      },
      fail: function () { },

    })
    getOpenid(that)
  },
  getPhoneNumber: function (e) { //点击获取手机号码按钮
    var that = this;
    wx.checkSession({
      success: function () {
        console.log(e)
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
        var ency = e.detail.encryptedData;
        var iv = e.detail.iv;
        var sessionk = that.data.sessionKey;

        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
          wx.showToast({
            title: '用户拒接授权',
            icon: 'none'
          })
          wx.navigateBack({
            delta: 1,
          })
        } else { //同意授权
          let url = app.globalData.url + '/user/getphone';
          console.log(url)
          let data = {
            encry: ency,
            iv: iv,
            sessionKey: that.data.session_key,
            openid: app.globalData.openId
          };
          console.log(data)
          app.wxRequest('POST', url, data, (res) => {

            wx.showLoading({
              title: '加载中'
            })
            console.log(res)
            if (res.code == 1) {
              wx.showToast({
                title: '获取成功',
              })
              that.setData({
                mobile: res.data.phone.phoneNumber
              })
              that.setData({
                isSiuser: false,
              })
              wx.hideLoading()
           
              var url = app.globalData.host + '/login/auth/phone';
              console.log(url)
              let data = {
                user_id: app.globalData.user_id,
                mobile: res.data.phone.phoneNumber,
              };
              console.log(data)
              app.wxRequest('POST', url, data, (res) => {
                console.log(res)
                wx.navigateBack({
                  delta: 1,
                })
                if (res.code == 1) {
                }
              }, (err) => {
                wx.showToast({
                  title: '提交失败',
                })
                console.log(err.errMsg)
              })
            } else {
              that.setData({
                isSiuser: true,
              })
              wx.navigateBack({
                delta: 1,
              })
              wx.showToast({
                title: '获取失败',
                icon: 'none'
              })
            }
            that.setData({
              phoneNumber: res.data.phone.phoneNumber
            })
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })
        }
      },
      fail: function () {
        console.log("session_key 已经失效，需要重新执行登录流程");
        that.wxlogin(); //重新登录
      }
    });
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
    wx.showToast({
      title: '加载中',
      icon: "loading",
      duration: 500
    })
    var that = this
    setTimeout(function () {
      if (app.globalData.userInfo == null) {
        that.setData({
          hasUserInfo: false,
          isUser: false
        })
      }
    }, 1000)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        isUser: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          isUser: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            isUser: true
          })
        }
      })
    }
    if(app.globalData.userInfo){
      getOpenid(that)
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
function getOpenid(that, userdelit) {
  var url = app.globalData.host + '/login/getOpenid';
  var url1 = app.globalData.host + '/login/getUserByOpenid';
  var url2 = app.globalData.host + '/login/saveUserInfo';
  console.log(that)
  var params = {};
  var wxlogin = httpUtils.httpPromise(wx.login);
  wxlogin().then(function (res) {
    console.log(res)
    params.code = res.code;
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      // var that = this;
      app.globalData.openId = res.data.openid
      that.setData({
        session_key: res.data.session_key
      })
      params.openid = res.data.openid;


      app.wxRequest('POST', url1, params, (res) => {
        console.log(res)
        if (res.success == true) {
          if (!res.data.phone) {
            that.setData({
              isSiuser: true
            })
          } else {
            that.setData({
              isSiuser: false
            })
            wx.navigateBack({
              delta: 1,
            })
          }
          app.globalData.user_id = res.data.id
          app.globalData.user_name = res.data.userName
          app.globalData.head_img = res.data.headUr
          app.globalData.roleId = res.data.roleId

        }
        if (res.success == false && userdelit) {
          params.headUrl = that.data.headimg;
          params.userName = that.data.nickName;
          console.log('执行')
          app.wxRequest('POST', url2, params, (res) => {
            console.log(res)
            if (!res.data.phone) {
              that.setData({
                isSiuser: true
              })
            } else {
              that.setData({
                isSiuser: false
              })
              wx.navigateBack({
                delta: 1,
              })
            }
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })
        }

      }, (err) => {
        wx.showToast({
          title: '提交失败',
        })
        console.log(err.errMsg)
      })
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
    var params1 = {
      openid: app.globalData.openId
    }


  })

}