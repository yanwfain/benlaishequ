//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    height:0,
    heig:0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    city:'北京',
    imgList:[
      {imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600661911114&di=bb991286d16ece675de92289bfdfbc83&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F20%2F99%2F2256cd8f725b549.jpg',img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600661911114&di=bb991286d16ece675de92289bfdfbc83&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F20%2F99%2F2256cd8f725b549.jpg'},{imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600661911114&di=bb991286d16ece675de92289bfdfbc83&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F20%2F99%2F2256cd8f725b549.jpg',img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600661911114&di=bb991286d16ece675de92289bfdfbc83&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F20%2F99%2F2256cd8f725b549.jpg'}],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindchange: function (e) {
    // console.log(e.detail.current)
    this.setData({ current: e.detail.current })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  imageLoad: function (e) {//获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      ratio = imgwidth / imgheight;
      console.log(imgwidth)
      var heig=100/ratio;
      this.setData({
        heig:heig
      })
  },
  imageLoads: function (e) {//获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      ratio = imgwidth / imgheight;
      console.log(imgwidth)
      var heig=100/ratio*0.8;
      this.setData({
        height:heig
      })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  requestCarouselListData(){
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
