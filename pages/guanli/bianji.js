// pages/guanli/bianji.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerProDataf2: [
      {
        name: '房屋租赁'
      },
      {
        name: '二手交易 '
      },
      {
        name: '新房'
      }
    ],
    imgboxs: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var that = this
    var url = app.globalData.host + '/cart/' +app.globalData.user_id ;
    var data = {
      
		}
		console.log(url)
    app.wxRequest('GET', url, data, (res) => {
			console.log(res)
			wx.hideLoading()
      if (res.success) {
        
        console.log(dateFormat(res.data.startTime),'Y-M-D')
        if(res.data.startTime){
          that.setData({
            timeData:res.data.startTime,
            date_time:dateFormat(res.data.startTime,'Y-M-D')
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
            lisr_user:res.data,
            name:res.data.name,
            tel:res.data.tel,
            success:res.data.success,
            countryIndex2:res.data.goodAt,
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
   // 选择图片 &&&
   addPic1s: function (e) {
    var imgboxs = this.data.imgboxs;
    console.log(imgboxs)
    var that = this;
    var n = 99;
    if (99 > imgboxs.length > 0) {
      n = 99 - imgboxs.length;
    } else if (imgboxs.length == 99) {
      n = 1;
    }
   
    wx.chooseImage({
      count: n, // 默认99，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        if (imgboxs.length == 0) {
          var youurl = {
            url1: tempFilePaths[0],
            url2: ''
          }
          imgboxs.push(youurl)
        } else if (99 > imgboxs.length) {
          // imgboxs = imgboxs.concat(tempFilePaths);
          var youurl = {
            url1: tempFilePaths[0],
            url2: ''
          }
          imgboxs.push(youurl);
        }
        that.setData({
          imgboxs: imgboxs
        });
        console.log(that.data.imgboxs)
        for (var i = 0; i <= that.data.imgboxs.length; i++) {
          wx.uploadFile({
            url: app.globalData.host + '/img/upload',      //此处换上你的接口地址
            filePath: tempFilePaths[i],
            name: 'fileName',
            // header: {
            //   "Content-Type": "multipart/form-data",
            //   'accept': 'application/json',
            //   'Authorization': 'Bearer ..'    //若有token，此处换上你的token，没有的话省略
            // },
            formData: {
              'user': 'test'  //其他额外的formdata，可不写
            },
            success: function (res) {
              wx.showLoading({
                title: '上传中.',
              })
              if (res.statusCode == 200) {
                wx.hideLoading()
                console.log(res)
                var datas = JSON.parse(res.data);
                console.log(datas)
                for (var index in that.data.imgboxs) {
                  that.data.imgboxs[imgboxs.length - 1].url2 = datas.data
                }
                that.setData({
                  imgboxs: that.data.imgboxs
                })
              }
              console.log(that.data.imgboxs)
            },

            fail: function (res) {
              console.log('fail');
              wx.hideLoading()
            },
          })
        }
      }
    })
  },
  changeDate(e) {
    console.log(e)
    this.setData({ date_time: e.detail.value });
  },
  pickerProChangef2: function (e) {
    var that = this
    this.setData({ countryIndex2: e.detail.value });
  
  },
  name:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  tel:function(e){
    this.setData({
      tel:e.detail.value
    })
  },
  success:function(e){
    this.setData({
      success:e.detail.value
    })
  },
  submit:function(e){

    if(!this.data.name){
      wx.showToast({
        title: '请填写姓名',
        icon:'none'
      })
      return
    }
    if(!this.data.tel){
      wx.showToast({
        title: '请填写手机号',
        icon:'none'
      })
      return
    }
    if(!this.data.date_time){
      wx.showToast({
        title: '请选择从业时间',
        icon:'none'
      })
      return
    }
    if(!this.data.success){
      wx.showToast({
        title: '请输入成交套数',
        icon:'none'
      })
      return
    }
    if(!this.data.countryIndex2&&this.data.countryIndex2!=0){
      wx.showToast({
        title: '请选择擅长业务',
        icon:'none'
      })
      return
    }
    var that = this
    this.setData({
      timeData:that.data.date_time
    })
    var data = new Date(that.data.timeData);
    var time1 = data.getTime();
console.log(time1)
    var that = this;
    var url = app.globalData.host + '/cart';
    // var url ='http://192.168.0.135:64661/cart'
    var data = {
      id:app.globalData.user_id,
      name:this.data.name,
      tel:this.data.tel,
      startTime:time1,
      head:this.data.imgboxs[this.data.imgboxs.length-1].url2,
      success:this.data.success,
      goodAt:this.data.countryIndex2,
      
		}
    console.log(data)
		console.log(url)
    app.wxRequest('POST', url, data, (res) => {
			console.log(res)
			wx.hideLoading()
      if (res.success) {
        wx.showToast({
          title: '修改成功',
        })
        setTimeout(function(e){
          wx.navigateBack({
            delta: 1,
          })
        },800)
       
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
function timestampToTime(timestamp) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  // return Y+M+D+h+m+s;
  return Y+M+D;
}
function dateFormat (time, format) {
  const t = new Date(time)
  // 日期格式
  format = format || 'Y-m-d h:i:s'
  let year = t.getFullYear()
  // 由于 getMonth 返回值会比正常月份小 1
  let month = t.getMonth() + 1
  let day = t.getDate()
  let hours = t.getHours()
  let minutes = t.getMinutes()
  let seconds = t.getSeconds()

  const hash = {
    'y': year,
    'm': month,
    'd': day,
    'h': hours,
    'i': minutes,
    's': seconds
  }
  // 是否补 0
  const isAddZero = (o) => {
    return /M|D|H|I|S/.test(o)
  }
  return format.replace(/\w/g, o => {
    let rt = hash[o.toLocaleLowerCase()]
    return rt > 10 || !isAddZero(o) ? rt : `0${rt}`
  })
}