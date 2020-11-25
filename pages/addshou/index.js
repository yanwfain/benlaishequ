// pages/addzu/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
        name: '银行卡'
      },
      {
        name: '微信'
      },
      {
        name: '支付宝'
      },
    ],
    pickerProDataf2: [
      {
        name: '请选择'
      },
      {
        name: '全贷款'
      },
      {
        name: '分期款'
      },
      {
        name: '贷款贷款'
      },
    ],
    pickerProDataf3: [
      {
        name: '请选择'
      },
      {
        name: '房子'
      },
      {
        name: '车子'
      },
      {
        name: '公司'
      },
    ],
    region:[],
    imgbox: [],//选择图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  pickerProChangef: function (e) {
    this.setData({ countryIndex: e.detail.value });
    console.log(this.data.countryIndex)
  },
  pickerProChangef1: function (e) {
    this.setData({ countryIndex1: e.detail.value });
    console.log(this.data.countryIndex1)
  },
  pickerProChangef2: function (e) {
    this.setData({ countryIndex2: e.detail.value });
    console.log(this.data.countryIndex2)
  },
  pickerProChangef3: function (e) {
    this.setData({ countryIndex3: e.detail.value });
    console.log(this.data.countryIndex3)
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startData: e.detail.value
    })
  },
  bindDateChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endData: e.detail.value
    })
  },
  topic_preview: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    console.log(url)
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    console.log(that.data.imgbox)
    var data = []
    for (var index in that.data.imgbox) {
      data.push(that.data.imgbox[index].url1)
      data = data
    }

    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: data // 需要预览的图片http链接列表
    })
  },
   // 删除照片 &&
   imgDelete1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    let imgbox_list = this.data.imgbox_list;
    imgbox.splice(index, 1)
    imgbox_list.splice(index, 1)
    console.log(imgbox)
    that.setData({
      imgbox: imgbox,
      imgbox_list: imgbox_list
    });
  },
  // 选择图片 &&&
  addPic1: function (e) {
    var imgbox = this.data.imgbox;
    console.log(imgbox)
    var that = this;
    var n = 99;
    if (99 > imgbox.length > 0) {
      n = 99 - imgbox.length;
    } else if (imgbox.length == 99) {
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
        console.log(tempFilePaths)
        if (imgbox.length == 0) {
          var youurl = {
            url1: tempFilePaths[0],
            url2: ''
          }
          imgbox.push(youurl)
        } else if (99 > imgbox.length) {
          var youurl = {
            url1: tempFilePaths[0],
            url2: ''
          }
          imgbox.push(youurl);
        }
        that.setData({
          imgbox: imgbox
        });
        console.log(that.data.imgbox)
        for (var i = 0; i <= that.data.imgbox.length; i++) {

          wx.uploadFile({
            url: app.globalData.host + '/common/upload',      //此处换上你的接口地址
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {
              'user': 'test'  //其他额外的formdata，可不写
            },
            success: function (res) {
              wx.showLoading({
                title: '上传中.',
              })
              if (res.statusCode == 200) {
                wx.hideLoading()
                var datas = JSON.parse(res.data);
                console.log(datas)
                for (var index in that.data.imgbox) {
                  that.data.imgbox[imgbox.length - 1].url2 = datas.data.url
                }
                that.setData({
                  imgbox: that.data.imgbox
                })
                //  that.data.imgbox_list.push(datas.data.url);
                //  that.setData({
                //    imgbox_list: that.data.imgbox_list,
                //  });
              }
              console.log(that.data.imgbox)
              console.log(that.data.imgbox_list)
            },

            fail: function (res) {
              console.log('fail');
              wx.hideLoading({
                success: (res) => { },
              })
            },
          })
        }
        // api / common / upload
      }
    })
  },

  //图片
  imgbox: function (e) {
    this.setData({
      imgbox: e.detail.value
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