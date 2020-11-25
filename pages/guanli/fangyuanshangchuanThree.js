// pages/guanli/fangyuanshangchuanThree.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgbox: [],//选择图片
    imgboxs: [],
    imgboxs1: [],
    imgboxs12: [],
    imgboxs13: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getStorageSync('detail'))
    this.setData({
      list_delit:wx.getStorageSync('detail')
    })
    var that = this
    var string = this.data.list_delit.rent_amount
    var stringResult = string.split(',');
    console.log(stringResult)
    if(this.data.list_delit.business_type==1){
      var rent_amount1 =''
      var rent_amount2 =''
      var rent_amount3 =''
      if(stringResult[0].slice(2)){
        rent_amount1 = '月付' + stringResult[0].slice(2)
      }
      if(stringResult[1].slice(2)){
        rent_amount2= '季付' + stringResult[1].slice(2)
      }
      if(stringResult[2].slice(2)){
        rent_amount3='年付' + stringResult[2].slice(2)
      }
      console.log(rent_amount1 + rent_amount2 + rent_amount3)
      this.setData({
        'list_delit.rent_amount':rent_amount1 +  rent_amount2 + rent_amount3
      })
    }
    if(this.data.list_delit.business_type==2){
    
      this.setData({
        'list_delit.rent_amount':this.data.list_delit.rent_amount
      })
    }
    // for(var index in stringResult){
    //   console.log( stringResult[index].slice(2))
     
    // }
    if(this.data.list_delit.resId){
      var url = app.globalData.host + '/buildResources/getResourcesUpByResId';
      var data = {
        resId:options.id
      }
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        wx.hideLoading()
        if (res.success) {
          for(var index in res.data.img){
            if(res.data.img[index].remark =="客厅图片"){
              var pcli = {
                name:res.data.img[index].remark,
                url1:res.data.img[index].url,
                url2:res.data.img[index].url
              }
              that.data.imgbox.push(pcli)
            }
            if(res.data.img[index].remark =="卧室图片"){
              var pcli = {
                name:res.data.img[index].remark,
                url1:res.data.img[index].url,
                url2:res.data.img[index].url
              }
              that.data.imgboxs.push(pcli)
            }
            if(res.data.img[index].remark =="卫生间图片"){
              var pcli = {
                name:res.data.img[index].remark,
                url1:res.data.img[index].url,
                url2:res.data.img[index].url
              }
              that.data.imgboxs1.push(pcli)
            }
            if(res.data.img[index].remark =="餐厅图片"){
              var pcli = {
                name:res.data.img[index].remark,
                url1:res.data.img[index].url,
                url2:res.data.img[index].url
              }
              that.data.imgboxs12.push(pcli)
            }
            if(res.data.img[index].remark =="阳台图片"){
              var pcli = {
                name:res.data.img[index].remark,
                url1:res.data.img[index].url,
                url2:res.data.img[index].url
              }
              that.data.imgboxs13.push(pcli)
            }
          }
          that.setData({
            imgbox:that.data.imgbox,
            imgboxs:that.data.imgboxs,
            imgboxs1:that.data.imgboxs1,
            imgboxs12:that.data.imgboxs12,
            imgboxs13:that.data.imgboxs13,
          })
          console.log(that.data.imgbox)
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
  },
  submit3:function(e){
    var img_list = []
    img_list.push(this.data.imgbox?JSON.stringify(this.data.imgbox):'')
    img_list.push(this.data.imgboxs?JSON.stringify(this.data.imgboxs):'')
    img_list.push(this.data.imgboxs1?JSON.stringify(this.data.imgboxs1):'')
    img_list.push(this.data.imgboxs12?JSON.stringify(this.data.imgboxs12):'')
    img_list.push(this.data.imgboxs13?JSON.stringify(this.data.imgboxs13):'')
    console.log(img_list)
    console.log(this.data.imgbox)
    console.log(this.data.imgboxs)
    console.log(this.data.imgboxs1)
    console.log(this.data.imgboxs12)
    console.log(this.data.imgboxs13)
    var that = this
    var list_delit = this.data.list_delit
    var url = app.globalData.host + '/buildResources/resoourceUpSav';
    var url1 = app.globalData.host + '/buildResources/saveResImg';
    var data = {
      agentId:app.globalData.user_id,
      houseId:list_delit.house_number,
      rentType:list_delit.rent_amount,
      rentAmount:0,
      houseNumber:list_delit.house_number?list_delit.house_number:'',
      facilities:list_delit.biaolist_list,
      businessType:list_delit.business_type,
      houseStatus:list_delit.house_statustxt,
      startDate:list_delit.date_time?list_delit.date_time:'',
      leaseTerm:list_delit.lease_term?list_delit.lease_term:'',
      watchingDate:list_delit.countryIndex?list_delit.countryIndex:'',
      renovation:list_delit.renovation?list_delit.renovation:'',
      parkingLot:list_delit.parking_lot?list_delit.parking_lot:'',
      paymentMethod:list_delit.payment_method?list_delit.payment_method:'',
      introduction:list_delit.introduction?list_delit.introduction:'',
      isbargaining:list_delit.switch1Checked,
      iskey:list_delit.keysNumber?list_delit.keysNumber:0,
      deposit:list_delit.yanjinfangshi?list_delit.yanjinfangshi:'',
      amountDeposit:list_delit.depositNumber?list_delit.depositNumber:0,
      photo:'',
    }
    if(list_delit.resId){
      data.id = list_delit.resId
    }
    if(list_delit.business_type==1){
      data.houseStatus = list_delit.house_status
    }
    if(list_delit.business_type==2){
      data.houseStatus = list_delit.house_status1
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        var data1= {
          resId:list_delit.house_number,
          data:img_list
        }
        app.wxRequest('POST', url1, data1, (res) => {
          console.log(res)
          wx.hideLoading()
          if (res.success) {
           wx.showToast({
             title: '提交成功',
           })
           setTimeout(function(){
            if(list_delit.house_number){
              wx.navigateBack({
                delta: 2,
              })
            }else{
             wx.navigateBack({
               delta: 3,
             })
            }
           },800)
          
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
  topic_preview1: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    var data = []
    for (var index in that.data.imgboxs) {
      data.push(that.data.imgboxs[index].url1)
      data = data
    }

    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: data // 需要预览的图片http链接列表
    })
  },
  topic_preview2: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    var data = []
    for (var index in that.data.imgboxs1) {
      data.push(that.data.imgboxs1[index].url1)
      data = data
    }
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: data // 需要预览的图片http链接列表
    })
  },
  topic_preview3: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    var data = []
    for (var index in that.data.imgboxs12) {
      data.push(that.data.imgboxs12[index].url1)
      data = data
    }
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: data // 需要预览的图片http链接列表
    })
  },
  topic_preview4: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    var data = []
    for (var index in that.data.imgboxs13) {
      data.push(that.data.imgboxs13[index].url1)
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
    imgbox.splice(index, 1)
    console.log(imgbox)
    that.setData({
      imgbox: imgbox,
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
            name:'客厅图片',
            url1: tempFilePaths[0],
          
            url2: ''
          }
          imgbox.push(youurl)
        } else if (99 > imgbox.length) {
          var youurl = {
            name:'客厅图片',
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
            url: app.globalData.host + '/img/upload',      //此处换上你的接口地址
            filePath: tempFilePaths[i],
            name: 'fileName',
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
                  that.data.imgbox[imgbox.length - 1].url2 = datas.data
                }
                that.setData({
                  imgbox: that.data.imgbox
                })
                //  that.data.imgbox_list.push(datas.data);
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
  imgDelete1s: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgboxs = this.data.imgboxs;
    imgboxs.splice(index, 1)
    console.log(imgboxs)
    that.setData({
      imgboxs: imgboxs,
    });
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
            name:'卧室图片',
            url1: tempFilePaths[0],
            url2: '',
          
          }
          imgboxs.push(youurl)
        } else if (99 > imgboxs.length) {
          // imgboxs = imgboxs.concat(tempFilePaths);
          var youurl = {
            name:'卧室图片',
            url1: tempFilePaths[0],
            url2: '',
            
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


              console.log(that.data.imgboxs_list)
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

  //图片
  imgboxs: function (e) {
    this.setData({
      imgboxs: e.detail.value
    })
  },
  imgDelete1s1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgboxs1 = this.data.imgboxs1;

    imgboxs1.splice(index, 1)

    that.setData({
      imgboxs1: imgboxs1,
    });
  },
  // 选择图片 &&&
  addPic1s1: function (e) {
    var imgboxs1 = this.data.imgboxs1;
    console.log(imgboxs1)
    var that = this;
    var n = 99;
    if (99 > imgboxs1.length > 0) {
      n = 99 - imgboxs1.length;
    } else if (imgboxs1.length == 99) {
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

        if (imgboxs1.length == 0) {

          var youurl = {
            name:'卫生间图片',
            url1: tempFilePaths[0],
            url2: ''
          }
          imgboxs1.push(youurl)
        } else if (99 > imgboxs1.length) {
          var youurl = {
            name:'卫生间图片',
            url1: tempFilePaths[0],
            url2: ''
          }
          imgboxs1.push(youurl);
        }
        that.setData({
          imgboxs1: imgboxs1
        });
        for (var i = 0; i <= that.data.imgboxs1.length; i++) {
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
                var datas = JSON.parse(res.data);
                console.log(datas)
                for (var index in that.data.imgboxs1) {
                  that.data.imgboxs1[imgboxs1.length - 1].url2 = datas.data
                }
                that.setData({
                  imgboxs1: that.data.imgboxs1
                })
              }
              console.log(res)
              console.log(that.data.imgboxs1)

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

  //图片
  imgboxs1: function (e) {
    this.setData({
      imgboxs1: e.detail.value
    })
  },
  imgDelete1s12: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgboxs12 = this.data.imgboxs12;
    imgboxs12.splice(index, 1)
    that.setData({
      imgboxs12: imgboxs12,

    });
  },
  // 选择图片 &&&
  addPic1s12: function (e) {
    var imgboxs12 = this.data.imgboxs12;
    console.log(imgboxs12)
    var that = this;
    var n = 99;
    if (99 > imgboxs12.length > 0) {
      n = 99 - imgboxs12.length;
    } else if (imgboxs12.length == 99) {
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

        if (imgboxs12.length == 0) {

          var youurl = {
            name:'餐厅图片',
            url1: tempFilePaths[0],
            url2: ''
          }
          imgboxs12.push(youurl)
        } else if (99 > imgboxs12.length) {

          var youurl = {
            name:'餐厅图片',
            url1: tempFilePaths[0],
            url2: ''
          }
          imgboxs12.push(youurl);
        }
        that.setData({
          imgboxs12: imgboxs12
        });
        for (var i = 0; i <= that.data.imgboxs12.length; i++) {
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
                var datas = JSON.parse(res.data);
                console.log(datas)
                for (var index in that.data.imgboxs12) {
                  that.data.imgboxs12[imgboxs12.length - 1].url2 = datas.data
                }
                that.setData({
                  imgboxs12: that.data.imgboxs12
                })
              }
              console.log(res)


              console.log(that.data.imgboxs12)
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

  //图片
  imgboxs12: function (e) {
    this.setData({
      imgboxs12: e.detail.value
    })
  },

  imgDelete1s13: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgboxs13 = this.data.imgboxs13;

    imgboxs13.splice(index, 1)

    that.setData({
      imgboxs13: imgboxs13,


    });
  },
  // 选择图片 &&&
  addPic1s13: function (e) {
    var imgboxs13 = this.data.imgboxs13;
    console.log(imgboxs13)
    var that = this;
    var n = 99;
    if (99 > imgboxs13.length > 0) {
      n = 99 - imgboxs13.length;
    } else if (imgboxs13.length == 99) {
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

        if (imgboxs13.length == 0) {

          var youurl = {
            name:'阳台图片',
            url1: tempFilePaths[0],
            url2: ''
          }
          imgboxs13.push(youurl)
        } else if (99 > imgboxs13.length) {

          var youurl = {
            name:'阳台图片',
            url1: tempFilePaths[0],
            url2: ''
          }
          imgboxs13.push(youurl);
        }
        that.setData({
          imgboxs13: imgboxs13
        });
        for (var i = 0; i <= that.data.imgboxs13.length; i++) {
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
                var datas = JSON.parse(res.data);
                console.log(datas)
                for (var index in that.data.imgboxs13) {
                  that.data.imgboxs13[imgboxs13.length - 1].url2 = datas.data
                }
                that.setData({
                  imgboxs13: that.data.imgboxs13
                })
              }
              console.log(res)


              console.log(that.data.imgboxs13)
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

  //图片
  imgboxs13: function (e) {
    this.setData({
      imgboxs13: e.detail.value
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
    wx.setStorageSync('detail','')
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