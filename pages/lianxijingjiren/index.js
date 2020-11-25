// // pages/guanli/lianxijingjiren.js
// var app = getApp()
// /**
//  * 8月初写的了。。代码都没啥印象了，刚刚打开，发现位置是写死了的7个，不过可以动态去设置。。
//  * 整体来说也不复杂，7个位置，相当于是7个状态，各个状态之间轮换，以下的列表都是从左往右的，最中间的也是界面当前正中间的。
//  * 用currentIndex这个变量来控制当前翻页情况，也就是本来的7个位置处于什么状态。
//  */
// // 位置列表
// const posOrgArray = [-360, -240, -120, 0, 120, 240, 360]
// let posArray = [-360, -240, -120, 0, 120, 240, 360]
// // 缩放列表
// let scaArray = [.8, .8, .9, 1, .9, .8, .8]
// // 透明度列表
// let opaArray = [0, 1, 1, 1, 1, 1, 0]
// // 高度列表
// let indArray = [1, 2, 3, 4, 3, 2, 1]
// // 当前位置列表
// let curPosArray = [-360, -240, -120, 0, 120, 240, 360]
// // 当前缩放列表
// let curScaArray = []
// // 当前透明度列表
// let curOpaArray = []
// // 当前高度列表
// let curIndArray = []
// let left = 0


// // 是否可点击，控制点击频率
// let canClick = true

// // px和rpx转换比例，用于横向滑动的时候计算滑动距离（rpx）
// let screenRate = 1;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isChecked1: false,
    // 背景图列表
    imgArray: [
      "../../image/timg.jpg",
      "../../image/timg.jpg",
      "../../image/timg.jpg",
      "../../image/timg.jpg",
      "../../image/timg.jpg",
      "../../image/timg.jpg",
      "../../image/timg.jpg"
    ],
    // 文字列表，和前面的图位置对应
    // textArray: ["页面1", "页面2", "页面3", "页面4", "页面5", "页面6", "页面7"],
    // animation: [],
    // // 当前位置，这个。。和默认位置有关，不要随便改哦。
    // currentIndex: 7,
    // // index高度数组，中间的最高嘛~ 因为wxml里用style控制，所以写到了 data 里
    // indexArray: [1, 2, 3, 4, 3, 2, 1],
    // // 指示点数组（哈哈哈，写在了这里，没加上去）
    indicatorArray: [],
    lunid: 0,
    swiperCurrent: 0,
    swiperList: [
      {
        index: 0,
        swpClass: "swp-left",
        active: false,
        imgsrc: "https://legal.baike360.cn/public/uploads/z-4.png",
        id:4
      },
      {
        index: 1,
        swpClass: "swp-right",
        active: false,
        imgsrc: "https://legal.baike360.cn/public/uploads/z-4.png",
        id:5
        
      },
      {
        index: 2,
        swpClass: "swp-right",
        active: false,
        imgsrc: "https://legal.baike360.cn/public/uploads/z-4.png",
        id:6
      },
      {
        index: 3,
        swpClass: "swp-right",
        active: false,
        imgsrc: "https://legal.baike360.cn/public/uploads/z-4.png",
        id:7
      },
    ],
    startPoint: 0,
    intervelHander: null,
    timeoutHande: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // wx.setStorageSync('companyId',opstion.companyId)
    console.log( wx.getStorageSync('companyId'))
    this.setData({
      houseId:options.id,
      height: wx.getSystemInfoSync().windowHeight,
    })
    var that = this
    var url = app.globalData.host + '/login/getUserByRecourse';
    var data = {
      houseId:options.id?options.id:'',
      commId:options.commId?options.commId:''
		}
		console.log(url)
    app.wxRequest('POST', url, data, (res) => {
			console.log(res)
			wx.hideLoading()
      if (res.success) {
      
          this.setData({
            adviserId:res.data[0].id,
            phone:res.data[0].phone
          })
        
        var swiperList = res.data
        for (var index in swiperList) {
          if (index == 0) {
            swiperList[index].swpClass = 'swp-left'
            swiperList[index].active = false
          } else {
            swiperList[index].swpClass = 'swp-right'
            swiperList[index].active = false
          }
        }
        that.setData({
          lismy: res.data,
          swiperList: swiperList,
        })
       
      } else {
        wx.showToast({
          title: '失败',
          icon: 'none'
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
		var url = app.globalData.host + '/appointment/getCompanyByUser';
    var data = {
			userId:app.globalData.user_id
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        // wx.setStorageSync('companyId',res.data.company[0].dept_id )
        // wx.setStorageSync('shequdelit',res.data.company[0].dept_name )
        that.setData({
          companyId:res.data.company[0].dept_id
        })
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
    // this.automove()
  },
  //轮播图的切换事件  
  swiperChange: function (e) {
    console.log(e);
    this.setData({
      swiperCurrent: e.detail.current,   //获取当前轮播图片的下标
      lunid: this.data.list[e.detail.current].id//获取当前轮播图片的id
    })
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      value_time: e.detail.value
    })
  },
  submit: function (e) {
    if(!this.data.inpName){
      wx.showToast({
        title: '请填写姓名',
        icon:'none'
      })
      return 
    }
    if(!this.data.inphone){
      wx.showToast({
        title: '请填写手机号',
        icon:'none'
      })
      return 
    }
    if(!this.data.date_time||!this.data.value_time){
      wx.showToast({
        title: '请选择时间',
        icon:'none'
      })
      return 
    }
    var that = this
    var url = app.globalData.host + '/appointment/addAppointmen';
    var data = {
      orderUserId: app.globalData.user_id,
      houseId: that.data.houseId,
      orderTime:that.data.date_time +' ' + that.data.value_time,
      // adviserId:that.data.adviserId,
      appName:that.data.inpName,
      phone:that.data.inphone,
      remark:that.data.inpTxt?that.data.inpTxt:'',
      companyId:that.data.companyId
    }
    if(that.data.isChecked1){
      data.adviserId = that.data.adviserId
    }else{
      data.adviserId = ''
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success ) {
        wx.showModal({
          title: '提示',
          content: '预约提交成功请耐心等待社区顾问联系',
          cancelText: '返回详情',
          cancelColor: '#303030',
          confirmText: '返回首页',
          confirmColor: '#C3A874',
          success(res) {
            if (res.confirm) {

    
              wx.navigateTo({
                url: '../index/index',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
              wx.navigateBack({
                delta: 1,
              })
            }
          }
        })
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
   
  },
  inpName: function (e) {
    this.setData({
      inpName: e.detail.value
    })
  },
  inphone: function (e) {
    this.setData({
      inphone: e.detail.value
    })
  },
  inpTxt: function (e) {
    this.setData({
      inpTxt: e.detail.value
    })
  },
  makePhoneCall: function () {
    var that = this
    console.log(that.data.swiperList)
    if(that.data.isChecked1){
     that.setData({
       phonetel:that.data.phone
     })
    }else{
      wx.showToast({
        title: '请选择顾问',
        icon:'none'
      })
    }
    wx.makePhoneCall({
      phoneNumber: that.data.phonetel,
      success: function () {
        console.log('拨打成功')
      },
      fail: function () {
        console.log('拨打失败')
      }
    })
  },
  changeDate(e) {
    console.log(e)
    this.setData({ date_time: e.detail.value });
  },
  changeSwitch1: function (e) {
    console.log(e)
    this.setData({
      isChecked1: e.detail.value
    })
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
    // this.pausemove()
    if (isLeft < 0) {
      this.moveLeftorRight(1);
      console.log(this.data.swiperList)
      var swiperList = this.data.swiperList
      for(var index in swiperList){
        if(swiperList[index].swpClass=="imgleft2"){
          console.log(swiperList[index].id)
          this.setData({
            adviserId:swiperList[index].id,
            phone:swiperList[index].phone
          })
        }
      }
    }
    if (isLeft > 0) {
      this.moveLeftorRight(0);
      console.log(this.data.swiperList)
      var swiperList = this.data.swiperList
      for(var index in swiperList){
        if(swiperList[index].swpClass=="imgright1"){
          console.log(swiperList[index].id)
          this.setData({
            adviserId:swiperList[index].id,
            phone:swiperList[index].phone

          })
        }
      }
    }
  },
  moveLeftorRight: function (idx) {
    let swp = this.data.swiperList;
    // console.log(swp)
    let max = swp.length;
    let self = this;
    for (let j = 0; j < max; j++) {
      swp[j].active = true;
      // if(swp[j].swpClass=="imgleft2"){
      //   console.log(swp[j].id)
      // }
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