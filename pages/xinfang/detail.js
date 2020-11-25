
const app = getApp()
var host = app.globalData.host
var city = app.globalData.city
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tid: 1,
    // 背景图列表
    imgArray: [
      "https://legal.baike360.cn/public/uploads/z-4.png",
      "https://legal.baike360.cn/public/uploads/z-4.png",
      "https://legal.baike360.cn/public/uploads/z-4.png",
      "https://legal.baike360.cn/public/uploads/z-4.png",
      "https://legal.baike360.cn/public/uploads/z-4.png",
      "https://legal.baike360.cn/public/uploads/z-4.png",
      "https://legal.baike360.cn/public/uploads/z-4.png"
    ],
    imgArray1: [
      "https://legal.baike360.cn/public/uploads/z-4.png",
      "https://legal.baike360.cn/public/uploads/z-4.png",
      "https://legal.baike360.cn/public/uploads/z-4.png",
      "https://legal.baike360.cn/public/uploads/z-4.png",
      "https://legal.baike360.cn/public/uploads/z-4.png",
      "https://legal.baike360.cn/public/uploads/z-4.png",
      "https://legal.baike360.cn/public/uploads/z-4.png"
    ],
    swiperList2: [
      {
        index: 0,
        swpClass: "swp-left",
        active: false,
        imgsrc: "https://legal.baike360.cn/public/uploads/z-4.png",
      },
      {
        index: 1,
        swpClass: "swp-right",
        active: false,
        imgsrc: "https://legal.baike360.cn/public/uploads/z-4.png"
      },
      {
        index: 3,
        swpClass: "swp-right",
        active: false,
        imgsrc: "https://legal.baike360.cn/public/uploads/z-4.pngg"
      },
      {
        index: 4,
        swpClass: "swp-right",
        active: false,
        imgsrc: "https://legal.baike360.cn/public/uploads/z-4.png"
      },
    ],
    startPoint: 0,
    intervelHander: null,
    timeoutHande: null,
    startPoint1: 0,
    intervelHander1: null,
    timeoutHande1: null,
    startPoint2: 0,
    intervelHander2: null,
    timeoutHande2: null,
    indicatorArray: [],
    istab:1,
    id: 0,
    flag:0,
    lismy: [],
    page: 1,
    movieList: [],
    list: [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ]
  },
  context:function(e){
    // console.log(e)
    this.setData({
      context:e.detail.value
    })
  },
  inpShow:function(e){
    this.setData({
      isinpShow:true
    })
  },
  subinp_Fn:function(e){
    wx.showLoading({
      title:'提交中.'
    })
    var that = this
    var url = app.globalData.host + '/new/buildResources/saveReview';
    var data = {
      // id: options.id,
      communityId:that.data.lismy.comm.id,
      agentId:app.globalData.user_id,
      context:that.data.context,
      grade:this.data.flag,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
    
        this.setData({
          isinpShow:false,
          flag:0,
          context:'',
          movieList:[],
          page:1
        })
        that.getMore(that.data.page)
        
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
  isshowinp:function(e){
    this.setData({
      isinpShow:false
    })
  },
  getMore: function (page) {
    wx.showLoading({
      title: '加载中',
    })
		var that = this;
    var url = app.globalData.host + '/new/buildResources/getReviewList';
    var data = {
      communityId:that.data.lismy.comm.id,
      page:page,
		}
		console.log(page)
		console.log(url)
    app.wxRequest('POST', url, data, (res) => {
			console.log(res)
			wx.hideLoading()
      if (res.success) {
			
        if (that.data.page > 1) {
          var movieLists = that.data.movieList;
          that.setData({
            movieList: movieLists.concat(res.data),
            page: page + 1
          })
        } else {
          that.setData({
            movieList: res.data,
            page: page + 1
          })
        }
      } else {
        wx.showToast({
          title: '没有更多数据了！',
          icon: 'none'
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
	},
  changeColor1: function () {
    var that = this;
    that.setData({
      flag: 1
    });
  },
  changeColor2: function () {
    var that = this;
    that.setData({
      flag: 2
    });
  },
  changeColor3: function () {
    var that = this;
    that.setData({
      flag: 3
    });
  },
  changeColor4: function () {
    var that = this;
    that.setData({
      flag: 4
    });
  },
  changeColor5: function () {
    var that = this;
    that.setData({
      flag: 5
    });
  },
  clicktabFc:function(e){
    this.setData({
      istab:e.currentTarget.dataset.id
    })
  },
  
  lianxiFn: function (e) {
    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '../shouquan/index',
      })
      return
    }
    wx.navigateTo({
      url: '/pages/lianxijingjiren/index?id=' + this.data.id,
    })
  },
  zu_Fn:function(e){
    wx.navigateTo({
      url: '/pages/zufang/index?id='+this.data.id+'&title='+this.data.listdelit.communityAnotherName,
    })
  },
  shou_Fn:function(e){
    wx.navigateTo({
      url: '/pages/ershoufang/index?id='+this.data.id+'&title='+this.data.listdelit.communityAnotherName,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '../shouquan/index',
      })
    }
    console.log(options)
    this.setData({
      id: options.id,
      communityAnotherName: options.communityAnotherName
    })
    var url = app.globalData.host + '/new/community/getPropertiesInfo';
    var data = {
      estateId: options.id,
      page:1
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {

        // var swiperList = res.data.lecList
        // for (var index in swiperList) {
        //   if (index == 0) {
        //     swiperList[index].swpClass = 'swp-left'
        //     swiperList[index].active = false
        //   } else {
        //     swiperList[index].swpClass = 'swp-right'
        //     swiperList[index].active = false
        //   }
        // }

        // var swiperList1 = res.data.selList
        // for (var index in swiperList1) {
        //   if (index == 0) {
        //     swiperList1[index].swpClass = 'swp-left'
        //     swiperList1[index].active = false
        //   } else {
        //     swiperList1[index].swpClass = 'swp-right'
        //     swiperList1[index].active = false
        //   }
        // }
        that.setData({
          lismy: res.data,
          // swiperList: swiperList,
          // swiperList1: swiperList1,
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
    var url = app.globalData.host + '/community/viewBlsqHousingEstateBaseByid';
    var data = {
      id: options.id
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          listdelit: res.data
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
    this.automove()
  },
  delit_shouFn: function (e) {
    wx.navigateTo({
      url: '/pages/ershoufang/detail?id=' + e.currentTarget.dataset.id + '&title=' + this.data.listdelit.communityAnotherName,
    })
  },
  delit_zuFn: function (e) {
    wx.navigateTo({
      url: '/pages/zufang/detail?id=' + e.currentTarget.dataset.id + '&title=' + this.data.listdelit.communityAnotherName,
    })
  },
  clickFn: function (e) {
    this.setData({
      tid: e.currentTarget.dataset.id
    })
  },
  // 地图
  click: function (e) {
    var that = this
    wx.openLocation({
      latitude: 39.923399,
      longitude: 116.151929,
      scale: 12,
      name: that.data.index_div.name,
      address: ''
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
  // ------------
  pausemove1() {
    this.intervelHander1 && clearInterval(this.intervelHander1)
    this.timeoutHander1 && clearTimeout(this.timeoutHander1)
    this.timeoutHande1 = setTimeout(() => {
      this.automove1()
    }, 1000)
  },
  automove1() {
    this.intervelHander1 && clearInterval(this.intervelHander1)
    this.intervelHander1 = setInterval(() => {
      this.moveLeftorRight1(1)
    }, 3000)
  },
  start1: function (e) {
    this.data.startPoint1 = e.changedTouches[0].pageX;
  },
  end1: function (e) {
    let isLeft = 0;
    let endPoint = e.changedTouches[0].pageX;
    isLeft = (endPoint - this.data.startPoint1);
    this.pausemove1()
    if (isLeft < 0) {
      this.moveLeftorRight1(1);
    }
    if (isLeft > 0) {
      this.moveLeftorRight1(0);
    }
  },
  moveLeftorRight1: function (idx) {
    let swp = this.data.swiperList1;
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
          swiperList1: swp
        }, () => {
          swp.push(swp.shift());
          self.setData({
            swiperList1: swp
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
          swiperList1: swp
        }, () => {
          swp.unshift(swp.pop());
          self.setData({
            swiperList1: swp
          })
        })
      }
    }
  },
  // ----------------
  pausemove2() {
    this.intervelHander2 && clearInterval(this.intervelHander2)
    this.timeoutHander2 && clearTimeout(this.timeoutHander2)
    this.timeoutHande2 = setTimeout(() => {
      this.automove2()
    }, 1000)
  },
  automove2() {
    this.intervelHander2 && clearInterval(this.intervelHander2)
    this.intervelHander2 = setInterval(() => {
      this.moveLeftorRight2(1)
    }, 3000)
  },
  start2: function (e) {
    this.data.startPoint2 = e.changedTouches[0].pageX;
  },
  end2: function (e) {
    let isLeft = 0;
    let endPoint = e.changedTouches[0].pageX;
    isLeft = (endPoint - this.data.startPoint2);
    this.pausemove2()
    if (isLeft < 0) {
      this.moveLeftorRight2(1);
    }
    if (isLeft > 0) {
      this.moveLeftorRight2(0);
    }
  },
  moveLeftorRight2: function (idx) {
    let swp = this.data.swiperList2;
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
          swiperList2: swp
        }, () => {
          swp.push(swp.shift());
          self.setData({
            swiperList2: swp
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
          swiperList2: swp
        }, () => {
          swp.unshift(swp.pop());
          self.setData({
            swiperList2: swp
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
  btnmimg: function (e) {
    wx.navigateTo({
      url: '/pages/shequ/more',
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if(this.data.istab==2){
      wx.showLoading({
        title: '加载中',
      })
      this.getMore(that.data.page)
      console.log('1234')
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: '',        // 默认是小程序的名称(可以写slogan等)
      path:'/pages/shequ/detail?id=' + this.data.id + '&communityAnotherName=' + this.data.communityAnotherName,// 默认是当前页面，必须是以‘/’开头的完整路径
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
      shareObj.path = '/pages/shequ/detail?id=' + this.data.id + '&communityAnotherName=' + this.data.communityAnotherName ;
    }
    // 返回shareObj
    return shareObj;
	}
  
})