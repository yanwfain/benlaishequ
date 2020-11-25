
// pages/zufang/detail.js
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imgList:[
			{imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600661911114&di=bb991286d16ece675de92289bfdfbc83&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F20%2F99%2F2256cd8f725b549.jpg',img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600661911114&di=bb991286d16ece675de92289bfdfbc83&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F20%2F99%2F2256cd8f725b549.jpg'},{imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600661911114&di=bb991286d16ece675de92289bfdfbc83&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F20%2F99%2F2256cd8f725b549.jpg',img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600661911114&di=bb991286d16ece675de92289bfdfbc83&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F20%2F99%2F2256cd8f725b549.jpg'}],
			height:0,
			heig:0,
			type:0,//type=0代表租房，type=1代表二手房
			swiperList: [
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
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '../shouquan/index',
      })
    }
    console.log(options)
		this.setData({
			id:options.id,
			title:options.title
    })
    var url1 = app.globalData.host + '/wlsq/blsq-see/post' +'?uid='+ app.globalData.user_id +'&hid='+options.id;
    var data1 = {
      // uid:app.globalData.user_id,
      // hid:res.data.id
    }
    app.wxRequest('POST', url1, data1, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
      
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
  pagearry:function(e){
    var that = this
    var url = app.globalData.host + '/community/getBlsqHouseByid';

    var data = {
      id:this.data.id,
      userId:app.globalData.user_id
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        
          res.data.bedroomNumber = parseInt( res.data.bedroomNumber )
          res.data.livingroomNumber = parseInt( res.data.livingroomNumber )
          res.data.floor = parseInt( res.data.floor )
          if(res.data.rent){
            var rent = JSON.parse(res.data.rent)
            console.log(rent)
          }else{
            rent=[]
          }
        that.setData({
          lismy:res.data,
          rent:rent,

        })
        if(rent.length==1){
          that.setData({
            yuefu:rent[0],
          }) 
        }
        if(rent.length==2){
          that.setData({
            jifu:rent[1],
          }) 
        }
        if(rent.length==3){
          that.setData({
            nianfu:rent[2],
          }) 
        }

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
  shoucangFn:function(e){
    
    var that = this
    var url = app.globalData.host + '/wlsq/blsq-save/post';
    var data = {
      uid:app.globalData.user_id,
      hid:that.data.lismy.id
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          'lismy.collection':1
        })
        wx.showToast({
          title: '收藏成功',
        })
     
        // this.pagearry()
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
  deleshoucangFn:function(e){
    var that = this
    var url = app.globalData.host + '/wlsq/blsq-save/que';
    var data = {
      uid:app.globalData.user_id,
      hid:that.data.lismy.id
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          'lismy.collection':0
        })
        wx.showToast({
          title: '取消成功',
        })
        // this.pagearry()
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
  opsshied:function(e){
    this.setData({
      isshowtu:false
    })
  },
  fenxianhgmessg:function(e){
    this.setData({
      isshowtu:true
    })
  },
	  // 地图
		click: function (e) {
			var that = this
			wx.openLocation({
				latitude: 39.923399,
				longitude: 116.151929,
				scale:12,
				name: that.data.index_div.name,
				address: ''
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
    // this.pagearry()
    var that = this
    var url = app.globalData.host + '/community/getBlsqHouseByid';
    var data = {
      id:this.data.id,
      userId:app.globalData.user_id
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        if(res.data.remark==1){
          var rent = JSON.parse(res.data.rent)
          console.log(rent)
          res.data.bedroomNumber = parseInt( res.data.bedroomNumber )
          res.data.livingroomNumber = parseInt( res.data.livingroomNumber )
          res.data.floor = parseInt( res.data.floor )
          
        that.setData({
          lismy:res.data,
          rent:rent,
          yuefu:rent[0],
          jifu:rent[1],
          nianfu:rent[2],

        })
        }else{
          var rent = JSON.parse(res.data.rent)
          console.log(rent)
          res.data.bedroomNumber = parseInt( res.data.bedroomNumber )
          res.data.livingroomNumber = parseInt( res.data.livingroomNumber )
          res.data.floor = parseInt( res.data.floor )
          that.setData({
            lismy:res.data,
            rent:rent,
            wanyuan:rent
          })
        }
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
      title:  e.target.dataset.title,        // 默认是小程序的名称(可以写slogan等)
      path:'/pages/zufang/detail?id=' + this.data.id + '&title=' + this.data.title,// 默认是当前页面，必须是以‘/’开头的完整路径
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
      shareObj.path = '/pages/zufang/detail?id=' + this.data.id + '&title=' + this.data.title ;
    }
    // 返回shareObj
    return shareObj;
	}
})