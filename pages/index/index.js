//index.js
//获取应用实例
const app = getApp()
var httpUtils = require('../../js/httpUtils.js');
var host = app.globalData.host
var city = app.globalData.city
var QQMapWX = require('../../js/qqmap-wx-jssdk.min.js');
Page({
  data: {
    height: 0,
    heig: 0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: true,
    isSiuser: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    city: city,
    tid: 1,
    imgList: [],
      swiperList: [
      {
        index: 0,
        swpClass: "swp-left",
        active: false,
        img: 'http://yt.baike360.cn/index/image/banner.png'
      },
      {
        index: 1,
        swpClass: "swp-right",
        active: false,
        img: 'http://yt.baike360.cn/index/image/banner.png'
      },
      {
        index: 3,
        swpClass: "swp-right",
        active: false,
        img: 'http://yt.baike360.cn/index/image/banner.png'
      },
      {
        index: 4,
        swpClass: "swp-right",
        active: false,
        img: 'http://yt.baike360.cn/index/image/banner.png'
      }
    ],
    shequ: [],
    startPoint: 0,
    intervelHander: null,
    timeoutHande: null
  },
  launchAppError (e) {
    console.log(e.detail.errMsg)
    console.log(e)
  },
  //事件处理函数
  ggopfn: function (e) {
    this.setData({
      hasUserInfo: true
    })
  },
  ggopfns: function (e) {
    this.setData({
      isSiuser: false
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

  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindchange: function (e) {
    // console.log(e.detail.current)
    this.setData({ current: e.detail.current })
  },
  getShequ: function (city,companyId) {
    wx.showLoading({
      title: '数据加载中.',
    })
    var that = this
    if(companyId){
      var urlFn = '/community/getTotalListAll'
    }else{
      var urlFn = '/community/getEstateAll'
    }
    wx.request({
      url: host + urlFn, //获取列表
      method: 'POST', //请求方式
      data: {
        city: city,
        companyId: companyId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync("sessionid")
      },
      success: function (res) {
        console.log(res)
        wx.hideLoading({
          success: (res) => {},
        })
        if (res.data.success) {
          that.setData({
            shequ: res.data.data
          })
        }
      }
    })
    if(companyId){
      var companyIdnum = companyId
    }else{
      var companyIdnum = 100
    }
    var url = app.globalData.host + '/banner/index/' + companyIdnum;
    let data = {

    };
    console.log(data)
    app.wxRequest('GET', url, data, (res) => {
      console.log(res)
      if (res.success) {
        that.setData({
          imgList:res.data
        })
      }else{
        wx.showToast({
          title: res.error_message,
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败12',
      })
      console.log(err.errMsg)
    })
  },
  onLoad: function (opstion) {
  
    if(opstion.companyId){
      this.setData({
        companyId:opstion.companyId,
      })
      // wx.setStorageSync('companyId',opstion.companyId)
      app.globalData.companyId=opstion.companyId
      
    }
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
    console.log(app.globalData.city)
    that.getLocation()
    this.automove()
  },
  pausemove() {
    this.intervelHander && clearInterval(this.intervelHander)
    this.timeoutHander && clearTimeout(this.timeoutHander)
    this.timeoutHande = setTimeout(() => {
      this.automove()
    }, 1000)
  },
  automove() {
    this.intervelHander && clearInterval(this.intervelHander)
    this.intervelHander = setInterval(() => {
      this.moveLeftorRight(1)
    }, 3000)
  },
  start: function (e) {
    this.data.startPoint = e.changedTouches[0].pageX;
  },
  end: function (e) {
    let isLeft = 0;
    let endPoint = e.changedTouches[0].pageX;
    isLeft = (endPoint - this.data.startPoint);
    this.pausemove()
    if (isLeft < 0) {
      this.moveLeftorRight(1);
    }
    if (isLeft > 0) {
      this.moveLeftorRight(0);
    }
  },
  moveLeftorRight: function (idx) {
    let swp = this.data.swiperList;
    let max = swp.length;
    let self = this;
    for (let j = 0; j < max; j++) {
      swp[j].active = true;
    }
    if (idx === 1) {
      if (swp[0] && swp[1]) {
        swp[0].swpClass = 'imgleft1';
        swp[1].swpClass = 'imgleft2';
        if (swp[2]) {
          swp[2].swpClass = 'imgleft3';
        }
        this.setData({
          swiperList: swp
        }, () => {
          swp.push(swp.shift());
          self.setData({
            swiperList: swp
          })
        })
      }
    } else {
      if (swp[1]) {
        swp[max - 1].swpClass = 'imgright1'
        swp[0].swpClass = 'imgright2'
        if (swp[2]) {
          swp[1].swpClass = 'imgright3'
        }
        self.setData({
          swiperList: swp
        }, () => {
          swp.unshift(swp.pop());
          self.setData({
            swiperList: swp
          })
        })
      }
    }
  },
  getLocation: function () {
    wx.showLoading({
      title: '获取定位中',
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
      success: function (res) {
        console.log(res)
        QQmap.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
            console.log(res)
            that.setData({
              recommend: res.result.address,
              'region[0]': res.result.address_component.province,
              'region[1]': res.result.address_component.city,
              'region[2]': res.result.address_component.district,
              city: res.result.address_component.city,

            })
            wx.showLoading({
              title: '数据加载中.',
            })
            that.getShequ(that.data.city, app.globalData.companyId?app.globalData.companyId:'')
            app.globalData.city = res.result.address_component.city
            // wx.hideLoading()
          },
          fail: function (res) {
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
      fail: function (res) {
        console.log(res)
        wx.hideLoading()
      }
    })
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

        if (e.detail.errMsg == 'getPhoneNsumber:fail user deny') {
          wx.showToast({
            title: '用户拒接授权',
            icon: 'none'
          })
        } else { //同意授权
          let url = app.globalData.host + '/login/auth/phone';
          console.log(url)
          let data = {
            encryptedData: ency,
            iv: iv,
            session_key: that.data.session_key,
            openid: app.globalData.openId
          };
          console.log(data)
          app.wxRequest('POST', url, data, (res) => {
            wx.showLoading({
              title: '加载中'
            })
            console.log(res)
            if (res.success) {
              wx.showToast({
                title: '获取成功',
              })
              that.setData({
                mobile: res.data
              })
              that.setData({
                isSiuser: false,
              })
              wx.hideLoading()
              // var url = app.globalData.host + '/login/auth/phone';
              // console.log(url)
              // let data = {
              //   user_id: app.globalData.user_id,
              //   mobile: res.data.phone.phoneNumber,
              // };
              // console.log(data)
              // app.wxRequest('POST', url, data, (res) => {
              //   console.log(res)
              //   if (res.code == 1) {
              //   }
              // }, (err) => {
              //   wx.showToast({
              //     title: '提交失败',
              //   })
              //   console.log(err.errMsg)
              // })
            } else {
              that.setData({
                isSiuser: true,
              })
              wx.showToast({
                title: '获取失败',
                icon: 'none'
              })
            }
            that.setData({
              phoneNumber: res.data
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
  imageLoad: function (e) {//获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      ratio = imgwidth / imgheight;
    console.log(imgwidth)
    var heig = 100 / ratio;
    this.setData({
      heig: heig
    })
  },
  imageLoads: function (e) {//获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      ratio = imgwidth / imgheight;
    console.log(imgwidth)
    var heig = 100 / ratio * 0.8;
    this.setData({
      height: heig
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  requestCarouselListData() {
    var that = this;//注意this指向性问题
    var urlStr = that.data.host + "/xjj/chome_carousel_list.json"; //请求连接注意替换（我用本地服务器模拟）
    console.log("请求轮播图：" + urlStr);
    wx.request({
      url: urlStr,
      data: {//这里放请求参数，如果传入参数值不是String，会被转换成String 
        // x: '',
        // y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("轮播图返回值：");
        console.log(res.data.result);
        var resultArr = res.data.result;
        that.setData({
          carouselList: resultArr
        })
      }
    })
  },

  //点击了轮播图
  chomeCarouselClick: function (event) {
    var urlStr = event.currentTarget.dataset.url;
    console.log("点击了轮播图：" + urlStr);
    // wx.navigateTo({
    //   url: 'test?id=1'
    // })
  },
  onShow: function () {
    var that = this
    console.log(this.data)
    console.log(city)
    console.log(wx.getStorageSync('companyId' ))
    getOpenid(that)
    // if(app.globalData.companyId){
    //   if (that.data.city&&app.globalData.companyId) {
    //     that.getShequ(that.data.city,app.globalData.companyId)
    //   }
    // }
      if (that.data.city) {
        that.getShequ(that.data.city,app.globalData.companyId)
      }
    // else{
    //   if(wx.getStorageSync('companyId')){
    //     that.getShequ(that.data.city,wx.getStorageSync('companyId')?wx.getStorageSync('companyId'):'')
  
    //   }
    // }
  },
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
      // wx.showLoading({
      //   title: '信息获取中',
      // })
      app.wxRequest('POST', url1, params, (res) => {
        console.log(res)
        if (res.success == true) {
          that.setData({
            hasUserInfo: true
          })
          // setTimeout(function(){
          //   wx.navigateTo({
          //     url: '/pages/wode/index',
          //   })
          //   wx.hideLoading({
          //     success: (res) => {},
          //   })
          // })
          if (!res.data.phone) {
            that.setData({
              isSiuser: true
            })
          } else {
            that.setData({
              isSiuser: false
            })
          }
          app.globalData.user_id = res.data.id
          app.globalData.user_name = res.data.userName
          app.globalData.head_img = res.data.headUr
          app.globalData.roleId = res.data.roleId
          var url = app.globalData.host + '/appointment/getCompanyByUser';
          var data = {
            userId:res.data.id
          }
          app.wxRequest('POST', url, data, (res) => {
            console.log(res)
            wx.hideLoading()
            if (res.success) {
              // wx.setStorageSync('companyId',res.data[0].dept_id )
              // wx.setStorageSync('shequdelit',res.data[0].dept_name )
              // app.globalData.companyId=res.data[0].dept_id,
              // app.globalData.companyName=res.data[0].dept_name
          
              // that.getShequ(that.data.city,wx.getStorageSync(companyId))

            } else {
              wx.showToast({
                title: res.msg,
              })
            }
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })
        }
        if(res.success == false){
          that.setData({
            hasUserInfo: false
          })
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