// pages/addzu/index.js
var app = getApp()
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
        name: '01-05022'
      },
      {
        name: '02-05888'
      },
      {
        name: '03-50899'
      },
    ],
    pickerProDataf1: [
      {
        name: '请选择'
      },
      {
        name: '整租'
      },
      {
        name: '合租'
      },
      {
        name: '其他'
      },
    ],
    pickerProDataf2: [
      {
        name: '请选择'
      },
      {
        name: '1人'
      },
      {
        name: '2人'
      },
      {
        name: '3人'
      },
      {
        name: '4人'
      },
      {
        name: '5人'
      },

    ],
    pickerProDataf3: [
      {
        name: '请选择'
      },
      {
        name: '1单元'
      },
      {
        name: '2单元'
      },
      {
        name: '3单元'
      },
    ],
    pickerProDataf4: [
      {
        name: '请选择'
      },
      {
        name: '北花园物业'
      },
      {
        name: '龙腾物业'
      },
      {
        name: '对对对物业'
      },
    ],
    pickerProDataf5: [
      {
        name: '请选择'
      },
      {
        name: '1楼'
      },
      {
        name: '2楼'
      },
      {
        name: '3楼'
      },
    ],
    pickerProDataf12: [
      {
        name: '请选择'
      },
      {
        name: '全款'
      },
      {
        name: '商业贷款'
      },
      {
        name: '公积金贷款'
      },
      {
        name: '组合贷款'
      },
    ],
    pickerProDataf10: [
      {
        name: '请选择'
      },
      {
        name: '商业贷款'
      },
      {
        name: '公积金贷款'
      },
      {
        name: '组合贷款'
      },
    ],
    pickerProDataf11: [
      {
        name: '请选择'
      },
      {
        name: '贷款金额'
      },
      {
        name: '贷款银行'
      },
      {
        name: '还款时间'
      },
      {
        name: '是否自还'
      },
    ],
    region:[],
    imgbox: [],//选择图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      hetongid:options.id
    })
    // var data = new Date(that.data.date_time);
    // var time1 = data.getTime();
    if(options.typePage==1){
      wx.setNavigationBarTitle({
        title:'租赁成交'
      })
    }
    if(options.typePage==2){
      wx.setNavigationBarTitle({
        title:'售卖成交'
      })
    }
    this.setData({
      typePage:options.typePage
    })
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var url = app.globalData.host + '/community/getCommunityByCompany';
    let data = {
      communityId:wx.getStorageSync('companyId')
    };
    console.log(data)
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading({
        success: (res) => {},
      })
      if (res.success) {
        that.setData({
          pickerProDataf4:res.data,
          countryIndex4:0
        })
        var url = app.globalData.host + '/community/getBuildingByEstate';
        let data = {
          estateId:that.data.pickerProDataf4[0].id
        };
        console.log(data)
        app.wxRequest('POST', url, data, (res) => {
          console.log(res)
          if (res.success) {
            that.setData({
              pickerProDataf5:res.data
            })
          }else{
            wx.showToast({
              title: res.error_message,
            })
          }
        }, (err) => {
          wx.showToast({
            title: '提交失败',
          })
          console.log(err.errMsg)
        })
      }else{
        wx.showToast({
          title: res.error_message,
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
    if(options.pageid==1){
      this.setData({
        pageid:options.pageid
      })
      var that = this;
      var url = app.globalData.host + '/contract/findContractListById';
      var url1 = app.globalData.host + '/contract/findProListById';
      var data_1 = {
       id:options.id
      }
      app.wxRequest('POST', url, data_1, (res) => {
        wx.hideLoading({
          success: (res) => {},
        })
        console.log(res)
        wx.hideLoading()
        if (res.success) {
          this.setData({
            list_cont:res.data.contract,
            // imglist:res.data.img
            money:res.data.contract.money,
            kehuName:res.data.contract.kehu_name,
            tel:res.data.contract.tel,
            sfz:res.data.contract.sfz,
            gwName:res.data.contract.gw_name,
            address:res.data.contract.address,
            countryIndex1:res.data.contract.pay_type,
            startData:res.data.contract.start_time,
            endData:res.data.contract.end_time,
            countryIndex2:res.data.contract.person_num,
            remark:res.data.contract.remark,
            // imgbox:res.data.img,
            countryIndex11:res.data.contract.loan_mortgage,
            countryIndex10:res.data.contract.loan_inf,
            countryIndex12:res.data.contract.pay_method,
          })
          for(var index in res.data.img){
            var posl = {
              url1:res.data.img[index].url,
              url2:res.data.img[index].url
            }
            this.data.imgbox.push(posl)
          }
          this.setData({
            imgbox:this.data.imgbox
          })
          var data1 = {
            contractId:res.data.contract.id
          }
          app.wxRequest('POST', url1, data1, (res) => {
            wx.hideLoading({
              success: (res) => {},
            })
            console.log(res)
            wx.hideLoading()
            if (res.success) {
            
              for(var index in res.data){
                if(res.data[index].remark &&res.data[index].sort!=0){
                  this.setData({
                    top_list:res.data[index].remark
                  })
                }
              }
            } else {
              wx.showToast({
                title: res.error_message,
                icon: 'none'
              })
            }
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
          })
       
        } else {
          wx.showToast({
            title: res.error_message,
            icon: 'none'
          })
        }
      }, (err) => {
        wx.showToast({
          title: '提交失败',
        })
      })

    }
  },
  pickerProChangef11: function (e) {
    this.setData({ countryIndex11: e.detail.value });
    console.log(this.data.countryIndex11)
  },
  pickerProChangef10: function (e) {
    this.setData({ countryIndex10: e.detail.value });
    console.log(this.data.countryIndex10)
  },
  pickerProChangef12: function (e) {
    this.setData({ countryIndex12: e.detail.value });
    console.log(this.data.countryIndex12)
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
    this.setData({
      countryIndex:''
    })
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var url = app.globalData.host + '/community/getBlsqHouseListByUnit';
    let data = {
      buildingId:this.data.pickerProDataf5[this.data.countryIndex5].id,
      unit:this.data.pickerProDataf3[this.data.countryIndex3]
    };
    console.log(data)
    app.wxRequest('POST', url, data, (res) => {
      wx.hideLoading({
        success: (res) => {},
      })
      console.log(res)
      if (res.success) {
        that.setData({
          pickerProDataf:res.data
        })
      }else{
        wx.showToast({
          title: res.error_message,
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
  },
  pickerProChangef4: function (e) {
    this.setData({ 
      countryIndex4: e.detail.value,
      communityId:this.data.pickerProDataf4[ e.detail.value].communityId
    });
    console.log(this.data.countryIndex4)
    this.setData({
      countryIndex5:'',
      countryIndex3:'',
      countryIndex:''
    })
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var url = app.globalData.host + '/community/getBuildingByEstate';
    let data = {
      estateId:this.data.pickerProDataf4[this.data.countryIndex4].id
    };
    console.log(data)
    app.wxRequest('POST', url, data, (res) => {
      wx.hideLoading({
        success: (res) => {},
      })
      console.log(res)
      if (res.success) {
        that.setData({
          pickerProDataf5:res.data
        })
      }else{
        wx.showToast({
          title: res.error_message,
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
  },
  pickerProChangef5: function (e) {
    this.setData({ countryIndex5: e.detail.value });
    console.log(this.data.countryIndex5)
    this.setData({
      countryIndex3:'',
      countryIndex:''
    })
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var url = app.globalData.host + '/community/getUnitList';
    let data = {
      buildingId:this.data.pickerProDataf5[this.data.countryIndex5].id
    };
    console.log(data)
    app.wxRequest('POST', url, data, (res) => {
      wx.hideLoading({
        success: (res) => {},
      })
      console.log(res)
      if (res.success) {
        that.setData({
          pickerProDataf3:res.data
        })
      }else{
        wx.showToast({
          title: res.error_message,
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
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
  money:function(e){
    this.setData({
      money:e.detail.value
    })
  },
  kehuName:function(e){
    this.setData({
      kehuName:e.detail.value
    })
  },
  tel:function(e){
    this.setData({
      tel:e.detail.value
    })
  },
  sfz:function(e){
    this.setData({
      sfz:e.detail.value
    })
  },
  remark:function(e){
    this.setData({
      remark:e.detail.value
    })
  },
  gwName:function(e){
    this.setData({
      gwName:e.detail.value
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
            url: app.globalData.host + '/img/upload',      //此处换上你的接口地址
            filePath: tempFilePaths[i],
            name: 'fileName',
            formData: {
              'user': 'test'  //其他额外的formdata，可不写
            },
            success: function (res) {
              wx.showLoading({
                title: '上传中.',
                duration:2000
              })
              // if (res.success) {
                wx.hideLoading()
                var datas = JSON.parse(res.data);
                console.log(datas)
                for (var index in that.data.imgbox) {
                  that.data.imgbox[imgbox.length - 1].url2 =  datas.data
                }
                that.setData({
                  imgbox: that.data.imgbox
                })
                //  that.data.imgbox_list.push(datas.data.url);
                //  that.setData({
                //    imgbox_list: that.data.imgbox_list,
                //  });
              // }
              console.log(that.data.imgbox)
              console.log(that.data.imgbox_list)
            },
            fail: function (res) {
              console.log(res)
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
  submit3:function(e){
    if(!this.data.pageid){
     
      if(!this.data.countryIndex5){
       wx.showToast({
         title: '请选择楼号',
         icon:"'none"
       })
       return
     }
     if(!this.data.countryIndex3){
       wx.showToast({
         title: '请选择单元',
         icon:"'none"
       })
       return
     }
     if(!this.data.countryIndex){
       wx.showToast({
         title: '请选择房号',
         icon:"'none"
       })
       return
     }
    }
  
  if(!this.data.money){
    wx.showToast({
      title: '请输入金额',
      icon:"'none"
    })
    return
  }
  if(!this.data.kehuName){
    wx.showToast({
      title: '请输入姓名',
      icon:"'none"
    })
    return
  }
  if(!this.data.tel){
    wx.showToast({
      title: '请输入手机号',
      icon:"'none"
    })
    return
  }
  // if(!this.data.sfz){
  //   wx.showToast({
  //     title: '请输入身份证号',
  //     icon:"'none"
  //   })
  //   return
  // }
  // if(!this.data.gwName){
  //   wx.showToast({
  //     title: '请输入成交公司',
  //     icon:"'none"
  //   })
  //   return
  // }
  if(this.data.typePage==1){
    // if(!this.data.region){
    //   wx.showToast({
    //     title: '请选择户籍',
    //     icon:"'none"
    //   })
    //   return
    // }
    if(this.data.countryIndex1==0||!this.data.countryIndex1){
      wx.showToast({
        title: '请选择租赁方式',
        icon:"'none"
      })
      return
    }
    if(!this.data.startData){
      wx.showToast({
        title: '请选择起租时间',
        icon:"'none"
      })
      return
    }
    if(!this.data.endData){
      wx.showToast({
        title: '请选择截止时间',
        icon:"'none"
      })
      return
    }
    // if(this.data.countryIndex2==0||!this.data.countryIndex2){
    //   wx.showToast({
    //     title: '请选择入住人数',
    //     icon:"'none"
    //   })
    //   return
    // }
  }
  if(this.data.typePage==2){
    // if(this.data.countryIndex12==0||!this.data.countryIndex12){
    //   wx.showToast({
    //     title: '请选择付款方式',
    //     icon:"none"
    //   })
    //   return
    // }
    // if(this.data.countryIndex10==0||!this.data.countryIndex10){
    //   wx.showToast({
    //     title: '请选择贷款信息',
    //     icon:"none"
    //   })
    //   return
    // }
    // if(this.data.countryIndex11==0||!this.data.countryIndex11){
    //   wx.showToast({
    //     title: '请选择贷款抵押',
    //     icon:"none"
    //   })
    //   return
    // }
  }

  // if(!this.data.remark){
  //   wx.showToast({
  //     title: '请填写备注',
  //     icon:"'none"
  //   })
  //   return
  // }
  // if(this.data.imgbox.length<1){
  //   wx.showToast({
  //     title: '请上传合同',
  //     icon:"'none"
  //   })
  //   return
  // }
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    
    var url = app.globalData.host + '/contract/createContract';
    var data = {
      gwId:app.globalData.user_id,
   
      kehuName:this.data.kehuName,
      gwName:this.data.gwName?this.data.gwName:'',
      money:this.data. money,
      tel:this.data.tel,
      sfz:this.data.sfz?this.data.sfz:'',
      startTime:this.data.startData?this.data.startData:'',
      remark:this.data.remark?this.data.remark:'',
      companyId:wx.getStorageSync('companyId'),
      conStatus:1,
      imgs:this.data.imgbox?JSON.stringify(this.data.imgbox):[]
      // houseId:
    }
    if(this.data.pageid){
      data.houseId = this.data.list_cont.house_id,
      data.id = this.data.hetongid
    }
    if(!this.data.pageid){
      data.houseId=this.data.pickerProDataf[this.data.countryIndex].id
    }
    if(this.data.typePage==1){
      data.address=this.data.region[0]?this.data.region[0] + this.data.region[1] + this.data.region[2]:''
      data.endTime=this.data.endData
      data.type=1
      data.personNum=this.data.countryIndex2?this.data.countryIndex2:0
      data.payType = this.data.countryIndex1?this.data.countryIndex1:0
    }
    if(this.data.typePage==2){
      data.payMethod=this.data.countryIndex12?this.data.countryIndex12:0
      data.loanInf=this.data.countryIndex10?this.data.countryIndex10:0
      data.type=2
      data.loanMortgage= this.data.countryIndex11?this.data.countryIndex11:0
    }
    app.wxRequest('POST', url, data, (res) => {
      wx.hideLoading({
        success: (res) => {},
      })
			console.log(res)
			wx.hideLoading()
      if (res.success) {
        wx.showToast({
          title: '上传成功',
        })
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
            ,
          })
        },800)
      } else {
        wx.showToast({
          title: res.error_message,
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