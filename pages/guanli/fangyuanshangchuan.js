// pages/guanli/fangyuanshangchuan.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    business_types: ['请选择', '出租房源','出售房源'],
    business_type: 0,
    house_statuss: ['请选择', '空置中', '自用','待租','下架','待签','租期中',],
    house_statuss1: ['请选择', '待售','待签','交易中','下架'],
    house_status: 0,
    house_status1: 0,
    lease_terms: ['请选择', '半年', '一年', '两年'],
    lease_term: 0,
    renovations: ['请选择', '毛坯', '简装', '精装'],
    renovation: 0,
    parking_lots: ['请选择', '无车位', '带车位', '询物业', '自行租赁', '自行购买'],
    parking_lot: 0,
    payment_methods: ['请选择', '支付宝', '微信', '银联转账', '第三方代扣', '京东'],
    payment_method: 0,
    yanjinfangshis: ['请选择', '押一付一', '押一付三'],
    yanjinfangshi: 0,
    detail: [],
    null1: '',
    null2: '',
    null3: '',
    switch1Checked: false,
    switch1Checkeds: false,
    house_number: '',
    iid:true,
     biaolist:[
      {
        id:1,
        ischenak:false,
        name:'电视'
      },
      {
        id:2,
        ischenak:false,
        name:'衣柜'
      },
      {
        id:3,
        ischenak:false,
        name:'冰箱'
      },
      {
        id:4,
        ischenak:false,
        name:'空调'
      },
      {
        id:5,
        ischenak:false,
        name:'宽带'
      },
      {
        id:6,
        ischenak:false,
        name:'床'
      },
      {
        id:7,
        ischenak:false,
        name:'暖气'
      },
      {
        id:8,
        ischenak:false,
        name:'热水器'
      },

      {
        id:9,
        ischenak:false,
        name:'天然气'
      },
      {
        id:10,
        ischenak:false,
        name:'洗衣机'
      },
    ],
    biaolist_list:[]

  },
  clickcctab:function(e){
    var _index = e.currentTarget.dataset.index
		var listhu = this.data.biaolist
		var list_hu = []
		for(var index in listhu){
			if(_index== index){
        listhu[index].ischenak = listhu[index].ischenak?false:true
			}
			if(listhu[index].ischenak){
				list_hu.push(listhu[index].id)
			}
		}
		this.setData({
			biaolist:listhu,
			biaolist_list:list_hu
    })
    console.log(listhu)
    console.log(list_hu)
  },
  checkboxChange: function (e) {
    var checkValue = e.detail.value;
    this.setData({
      checkValue: checkValue
    });
  },
  checkFn: function (e) {
    console.log(e)
    if (e.currentTarget.dataset.id == 1) {
      this.setData({
        iid: this.data.iid ? false : true
      })
      if(!this.data.iid){
        this.setData({
          null1:''
        })
      }
      console.log(this.data.iid)
    }

    if (e.currentTarget.dataset.id == 2) {
      this.setData({
        iid2: this.data.iid2 ? false : true
      })
      if(!this.data.iid2){
        this.setData({
          null2:''
        })
      }
    }
    if (e.currentTarget.dataset.id == 3) {
      this.setData({
        iid3: this.data.iid3 ? false : true
      })
      if(!this.data.iid3){
        this.setData({
          null3:''
        })
      }
    }
  },
  yanjinfangshis: function (e) {
    console.log(e)
    this.setData({
      yanjinfangshi: e.detail.value,
      yanjinfangshitxt: this.data.yanjinfangshis[e.detail.value]
    })
  },
  payment_method: function (e) {
    this.setData({
      payment_method: e.detail.value,
      payment_methodtxt: this.data.payment_methods[e.detail.value],
      detail: {
        payment_method: this.data.payment_methods[e.detail.value]
      }
    });
  },
  parking_lot: function (e) {
    this.setData({
      parking_lot: e.detail.value,
      parking_lottxt: this.data.parking_lots[e.detail.value],
      detail: {
        parking_lot: this.data.parking_lots[e.detail.value]
      }
    });
  },
  renovation: function (e) {
    this.setData({
      renovation: e.detail.value,
      renovationtxt: this.data.renovations[e.detail.value],
      detail: {
        renovation: this.data.renovations[e.detail.value]
      }
    });
  },
  lease_term: function (e) {
    this.setData({
      lease_term: e.detail.value,
      lease_termtxt: this.data.lease_terms[e.detail.value],
      detail: {
        lease_term: this.data.lease_terms[e.detail.value]
      }
    });
  },
  house_status: function (e) {
    this.setData({
      house_status: e.detail.value,
      house_statustxt: this.data.house_statuss[e.detail.value],
      detail: {
        house_statuss: this.data.house_statuss[e.detail.value]
      }
    });
  },
  house_status1: function (e) {
    this.setData({
      house_status1: e.detail.value,
      house_statustxt1: this.data.house_statuss1[e.detail.value],
      detail: {
        house_statuss1: this.data.house_statuss1[e.detail.value]
      }
    });
  },
  business_type: function (e) {
    this.setData({
      business_type: e.detail.value,
      business_typetxt: this.data.business_types[e.detail.value],
      detail: {
        business_type: this.data.business_types[e.detail.value]
      }
    });
    if( e.detail.value==1){
      this.setData({
        rent_amount:''
      })
    }
  },
  listFn: function (e) {
    if (e.currentTarget.dataset.id == 1) {
      this.setData({
        yid: 1,
        yanjinfangshi: 0,
        depositNumber: ''
      })
    }
    if (e.currentTarget.dataset.id == 2) {
      this.setData({
        yid: 2,
        yanjinfangshi: 0,
        depositNumber: ''
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      house_number: options.num_type
    })
    var that = this
    this.setData({
      resId:options.id
    })
    var list_delit = this.data.list_delit
    
    if(options.id){
      wx.showLoading({
        title:"加载中."
      })
      var url = app.globalData.host + '/buildResources/getResourcesUpByResId';
      var data = {
        resId:options.id
      }
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        wx.hideLoading()
        if (res.success) {
          var biaolist_list = []
          var biaolist = that.data.biaolist
          var intention = res.data.res.facilities.split(',')
          console.log(intention)
          for(var index in intention){
            biaolist_list.push(intention[index])
            console.log(intention[index])
            console.log(biaolist[index].id)
            for(var indexlist in biaolist){
              if(intention[index]==biaolist[indexlist].id){
                biaolist[indexlist].ischenak = true
              }
            }
           
          }
          that.setData({
            biaolist_list:biaolist_list,
            biaolist:biaolist
          })
          that.setData({
           list:res.data,
           business_type:res.data.res.businessType,
           date_time:res.data.res.startDate?res.data.res.startDate:'',
           countryIndex:res.data.res.watchingDate?res.data.res.watchingDate:'',
           renovation:res.data.res.renovation?res.data.res.renovation:'',
           parking_lot:res.data.res.parkingLot?res.data.res.parkingLot:'',
           payment_method:res.data.res.paymentMethod?res.data.res.paymentMethod:'',
           introduction:res.data.res.introduction?res.data.res.introduction:'',
           switch1Checked:res.data.res.isbargaining=='true'?true:false,
           switch1Checkeds:res.data.res.iskey==0?false:true,
           keysNumber:res.data.res.iskey!=0?res.data.res.iskey:'',
           yanjinfangshi:res.data.res.deposit?res.data.res.deposit:'',
           depositNumber:res.data.res.amountDeposit?res.data.res.amountDeposit:'',
          })
          var string = JSON.parse(res.data.res.rentType)
          console.log(string)
          if(res.data.res.businessType==1){
            if(string[0]>0){
              this.setData({
                iid:true,
                null1:string[0]
              })
            }
            if(string[1]>0){
              this.setData({
                iid2:true,
                null2:string[1]
              })
            }
            if(string[2]>0){
              this.setData({
                iid3:true,
                null3:string[2]
              })
            }
          }else{
            this.setData({
              rent_amount:res.data.res.rentType
            })
          }
        
          if(res.data.res.deposit&&!res.data.res.amountDeposit){
            this.setData({
              yid:1,
            
            })
          }
          if(!res.data.res.deposit&&res.data.res.amountDeposit){
            this.setData({
              yid:2,
             
            })
          }
          if(res.data.res.businessType==1){
            this.setData({
              house_status:res.data.res.houseStatus
            })
          }
          if(res.data.res.businessType==2){
            this.setData({
              house_status1:res.data.res.houseStatus
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
    }else{
      var url = app.globalData.host + '/buildResources/getResourcesUpByHouseId';
      var data = {
        houseId:options.num_type
      }
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        wx.hideLoading()
        if (res.success) {
          var biaolist_list = []
          var biaolist = that.data.biaolist
          var intention = res.data.facilities.split(',')
          console.log(intention)
          for(var index in intention){
            biaolist_list.push(intention[index])
            console.log(intention[index])
            console.log(biaolist[index].id)
            for(var indexlist in biaolist){
              if(intention[index]==biaolist[indexlist].id){
                biaolist[indexlist].ischenak = true
              }
            }
           
          }
          that.setData({
            biaolist_list:biaolist_list,
            biaolist:biaolist
          })
          that.setData({
           list:res.data,
           business_type:res.data.businessType,
           date_time:res.data.startDate?res.data.startDate:'',
           countryIndex:res.data.watchingDate?res.data.watchingDate:'',
           renovation:res.data.renovation?res.data.renovation:'',
           parking_lot:res.data.parkingLot?res.data.parkingLot:'',
           payment_method:res.data.paymentMethod?res.data.paymentMethod:'',
           introduction:res.data.introduction?res.data.introduction:'',
           switch1Checked:res.data.isbargaining=='true'?true:false,
           switch1Checkeds:res.data.iskey==0?false:true,
           keysNumber:res.data.iskey!=0?res.data.iskey:'',
           yanjinfangshi:res.data.deposit?res.data.deposit:'',
           depositNumber:res.data.amountDeposit?res.data.amountDeposit:'',
          })
          var string = JSON.parse(res.data.rentType)
          console.log(string)
          if(res.data.businessType==1){
            if(string[0]>0){
              this.setData({
                iid:true,
                null1:string[0]
              })
            }
            if(string[1]>0){
              this.setData({
                iid2:true,
                null2:string[1]
              })
            }
            if(string[2]>0){
              this.setData({
                iid3:true,
                null3:string[2]
              })
            }
          }else{
            this.setData({
              rent_amount:res.data.rentType
            })
          }
        
          if(res.data.deposit&&!res.data.amountDeposit){
            this.setData({
              yid:1,
            
            })
          }
          if(!res.data.deposit&&res.data.amountDeposit){
            this.setData({
              yid:2,
             
            })
          }
          if(res.data.businessType==1){
            this.setData({
              house_status:res.data.houseStatus
            })
          }
          if(res.data.businessType==2){
            this.setData({
              house_status1:res.data.houseStatus
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
    }
	
  },
  switch1Changes: function (e) {
    this.setData({
      switch1Checkeds: this.data.switch1Checkeds ? false : true,
      detail: {
        iskey: this.data.switch1Checkeds ? false : true
      }
    })
  },
  ycf: function (e) {
    var rent_amount = '', iid = e.detail.value
    this.setData({
      iid: e.detail.value,
      null1: '',
      null2: '',
      null3: '',
      // detail:{
      //   rent_amount:rent_amount
      // }
    })
  },
  ycfs: function (e) {
    var rent_amount = '', iid = e.detail.value
    this.setData({
      yid: 2,
      yanjinfangshi: 0
    })
  },
  rent_amount: function (e) {
    this.setData({
      null1: e.detail.value,
    })
  },
  rent_amount2: function (e) {
    this.setData({
      null2: e.detail.value,
    })
  },
  rent_amount3: function (e) {
    this.setData({
      null3: e.detail.value,
    })
  },
  switch1Change: function (e) {
    this.setData({
      switch1Checked: this.data.switch1Checked ? false : true,
      detail: {
        isbargaining: this.data.switch1Checked ? false : true,
      }
    })
  },
  keysNumber: function (e) {
    this.setData({
      detail: {
        keysNumber: e.detail.value
      }
    })
  },

  pickerProChangef: function (e) {
    this.setData({ countryIndex: e.detail.value });
    console.log(this.data.countryIndex)
  },
  changeDate(e) {
    this.setData({
      date_time: e.detail.value,
      detail: {
        start_date: e.detail.value
      }
    });
  },

  introduction: function (e) {//配套简介
    console.log(e)
    this.setData({
      introduction: e.detail.value,
    })
  },
  depositNumber: function (e) {
    this.setData({
      depositNumber: e.detail.value
    })
  },
  keysNumber: function (e) {
    this.setData({
      keysNumber: e.detail.value
    })
  },
  sunmit2: function (e) {
    console.log(this.data.detail)
    if (this.data.business_type == 0) {
      wx.showToast({
        title: '请选择业务类型',
        icon: 'none'
      })
      return
    }
    if(this.data.business_type==1){
      if (this.data.house_status == 0) {
        wx.showToast({
          title: '请选择更改状态',
          icon: 'none'
        })
        return
      }
    }
    if(this.data.business_type==2){
      if (this.data.house_status1 == 0) {
        wx.showToast({
          title: '请选择更改状态',
          icon: 'none'
        })
        return
      }
    }
   
    // if (!this.data.date_time) {
    //   wx.showToast({
    //     title: '请选择起租日期',
    //     icon: 'none'
    //   })
    //   return
    // }
    // if (this.data.lease_term == 0) {
    //   wx.showToast({
    //     title: '请选择租期',
    //     icon: 'none'
    //   })
    //   return
    // }
    // if (!this.data.countryIndex) {
    //   wx.showToast({
    //     title: '请选择看房时间',
    //     icon: 'none'
    //   })
    //   return
    // }
    // if (this.data.renovation == 0) {
    //   wx.showToast({
    //     title: '请选择装修状况',
    //     icon: 'none'
    //   })
    //   return
    // }
    // if (this.data.parking_lot == 0) {
    //   wx.showToast({
    //     title: '请选择车位情况',
    //     icon: 'none'
    //   })
    //   return
    // }
    // if (this.data.payment_method == 0) {
    //   wx.showToast({
    //     title: '请选择付款方式',
    //     icon: 'none'
    //   })
    //   return
    // }
    // if (!this.data.introduction) {
    //   wx.showToast({
    //     title: '请填写配套简介',
    //     icon: 'none'
    //   })
    //   return
    // }

    // if (this.data.switch1Checkeds) {
    //   if (!this.data.keysNumber) {
    //     wx.showToast({
    //       title: '请填写钥匙数量',
    //       icon: 'none'
    //     })
    //     return
    //   }
    // }
    // if (!this.data.yid) {
    //   wx.showToast({
    //     title: '请选择押金方式',
    //     icon: 'none'
    //   })
    //   return
    // }
    // if (this.data.yid == 1) {
    //   if (this.data.yanjinfangshi==0) {
    //     wx.showToast({
    //       title: '请选择押金方式',
    //       icon: 'none'
    //     })
    //     return
    //   }
    // }
    // if (this.data.yid == 2) {
    //   if (!this.data.depositNumber) {
    //     wx.showToast({
    //       title: '请填写固定押金',
    //       icon: 'none'
    //     })
    //     return
    //   }
    // }
    if(this.data.business_type==1){
      if (this.data.iid||!this.data.iid) {
        console.log(this.data.null1)
        if (!this.data.null1) {
          wx.showToast({
            title: '请填写月租金',
            icon: 'none'
          })
          return
        }
      }
      if (this.data.iid2) {
        if (!this.data.null2) {
          wx.showToast({
            title: '请填写季租金',
            icon: 'none'
          })
          return
        }
  
      }
      if (this.data.iid3) {
        if (!this.data.null3) {
          wx.showToast({
            title: '请填写年租金',
            icon: 'none'
          })
          return
        }
      }
      if(!this.data.iid&&!this.data.iid2&&!this.data.iid3){
        wx.showToast({
          title: '请选择租金方式',
          icon: 'none'
        })
        return
      }
      this.setData({
        rent_amount:'月付' + this.data.null1 + ','+'季付' + this.data.null2 + ','+'年付' + this.data.null3 
      })
    }else{
        if (!this.data.rent_amount) {
          wx.showToast({
            title: '请填售价',
            icon: 'none'
          })
          return
        }
    }
    wx.setStorageSync('detail', this.data)
    wx.navigateTo({
      url: '/pages/guanli/fangyuanshangchuanThree?id=' + this.data.resId,
    })
  },
  rent_amountshou:function(e){
    this.setData({
      rent_amount:e.detail.value
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