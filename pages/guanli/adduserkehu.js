
// pages/guanli/adduserkehu.js
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
        name: '寻租'
      },
      {
        name: '买房'
      }
    ],
    pickerProDataf1: [
      {
        name: '请选择'
      },
      {
        name: '已推荐'
      },
      {
        name: '看房中'
      },
      {
        name: '代签'
      },
      {
        name: '草签'
      },
      {
        name: '签约'
      },
      {
        name: '交易完成'
      },
    ],
    pickerProDataf2: [
      {
        name: '请选择'
      },
      {
        name: '1年'
      },
      {
        name: '2年'
      },
      {
        name: '3年'
      },
      {
        name: '4年'
      },
      {
        name: '5年'
      }
    ],
    pickerProDataf3: [
      {
        name: '请选择'
      },
      {
        name: '微信'
      },
      {
        name: '支付宝'
      }
    ],
    pickerProDataf4: [
      {
        name: '请选择'
      },
      {
        name: '男'
      },
      {
        name: '女'
      }
    ],
    biaolist:[
      {
        id:1,
        ischenak:false,
        name:'学区'
      },
      {
        id:2,
        ischenak:false,
        name:'旅居'
      },
      {
        id:3,
        ischenak:false,
        name:'升级'
      },
      {
        id:4,
        ischenak:false,
        name:'投资'
      },
      {
        id:5,
        ischenak:false,
        name:'环京'
      },
    ],
    biaolist_list:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    this.setData({
      height: wx.getSystemInfoSync().windowHeight,
      shequdelit: wx.getStorageSync('shequdelit' ),
      companyId:wx.getStorageSync('companyId' ),
     })
    if(options.id){
      this.setData({
        customerId:options.id
      })
      var that = this;
      var url = app.globalData.host + '/customer/viewCustomer';
      let data = {
        customerId:options.id
      };
      console.log(data)
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        if (res.success) {
          if(res.data.intention){
            var biaolist_list = []
            var biaolist = this.data.biaolist
            var intention = res.data.intention.split(',')
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
            this.setData({
              biaolist_list:biaolist_list,
              biaolist:biaolist
            })
          }
          console.log(this.data.biaolist_list)
          console.log(this.data.biaolist)
          // intention:that.data.biaolist_list,
          // recommender:that.data.recommender
        that.setData({
          list_ct:res.data,
          recommender:res.data.recommender?res.data.recommender:'',
          user_real_name:res.data.userRealName,
          user_phone:res.data.userPhone,
          age:res.data.age,
          user_budget:res.data.userBudget,
          countryIndex:res.data.userIntention,
          receptionist:res.data.receptionist,
          countryIndex1:res.data.userStatus,
          countryIndex2:res.data.leaseTerm,
          countryIndex3:res.data.paymentMethod,
          countryIndex4:res.data.userSex,
          user_comment:res.data.userComment,
          date_time:res.data.recivDate,
          qidate_time:res.data.startingTime,
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
    }
  
  },
  clickcctab:function(e){
    
    var _index = e.currentTarget.dataset.index
		var listhu = this.data.biaolist
		var list_hu = []
		for(var index in listhu){
			if(_index== index){
        listhu[index].ischenak = listhu[index].ischenak?false:true
        if(listhu[index].ischenak){
          if(this.data.biaolist_list.length>=3){
            listhu[index].ischenak = false
            wx.showToast({
              title: '只能最多选择3个标签',
              icon:'none'
            })
            return
          }
        }
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
  user_phone:function(e){
    this.setData({
      user_phone:e.detail.value
    })
  },
  user_real_name:function(e){
    this.setData({
      user_real_name:e.detail.value
    })
  },
  user_budget:function(e){
    this.setData({
      user_budget:e.detail.value
    })
  },
  user_comment:function(e){
    this.setData({
      user_comment:e.detail.value
    })
  },
  changeDate(e) {
    console.log(e)
    this.setData({ date_time: e.detail.value });
  },
  changeDate1(e) {
    console.log(e)
    this.setData({ qidate_time: e.detail.value });
  },
  receptionist:function(e){
    this.setData({
      receptionist:e.detail.value
    })
  },
  age:function(e){
    this.setData({
      age:e.detail.value
    })
  },
  recommender:function(e){
    this.setData({
      recommender:e.detail.value
    })
  },  
  submit:function(e){
    // if(!this.data.date_time){
    //   wx.showToast({
    //     title: '请选择接待日期',
    //   })
    //   return
    // }
    if(!this.data.user_real_name){
      wx.showToast({
        title: '请填写客户姓名',
      })
      return
    }
    if(this.data.countryIndex4==0){
      wx.showToast({
        title: '请填写客户性别',
      })
      return
    }
    if(!this.data.user_phone){
      wx.showToast({
        title: '请填写手机号',
      })
      return
    }
    // if(!this.data.receptionist){
    //   wx.showToast({
    //     title: '请填写接待人',
    //   })
    //   return
    // }
    if(this.data.countryIndex==0){
      wx.showToast({
        title: '请选择客户意向',
      })
      return
    }
    // if(this.data.countryIndex1==0){
    //   wx.showToast({
    //     title: '请选择客户状态',
    //   })
    //   return
    // }
    if(!this.data.user_budget){
      wx.showToast({
        title: '请填写预算资金',
      })
      return
    }
    // if(!this.data.qidate_time){
    //   wx.showToast({
    //     title: '请选择起租时间',
    //   })
    //   return
    // }
    // if(!this.data.countryIndex2){
    //   wx.showToast({
    //     title: '请选择租期',
    //   })
    //   return
    // }
    // if(!this.data.countryIndex3){
    //   wx.showToast({
    //     title: '请选择支付方式',
    //   })
    //   return
    // }
    if(this.data.customerId){
      var that = this;
      var url = app.globalData.host + '/customer/modifyCustomer';
      let data = {
        id: that.data.customerId,
        agentId: app.globalData.user_id,
        userPhone:that.data.user_phone,
        useLevel:'',
        age:that.data.age?that.data.age:'',
        userType:'',
        userRealName:that.data.user_real_name,
        userIntention:that.data.countryIndex,
        userBudget:that.data.user_budget,
        userStatus:that.data.countryIndex1?that.data.countryIndex1:'',
        userComment:that.data.user_comment,
        paymentMethod:that.data.countryIndex3,
        receptionist:that.data.receptionist?that.data.receptionist:'',
        startingTime:that.data.qidate_time?that.data.qidate_time:'',
        leaseTerm:that.data.countryIndex2?that.data.countryIndex2:'',
        recivDate:that.data.date_time?that.data.date_time:'',
        companyId: that.data.companyId,
        userSex:that.data.countryIndex4,
        intention:that.data.biaolist_list,
        recommender:that.data.recommender
      };
      console.log(data)
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        if (res.success) {
          wx.showToast({
            title: '提交成功',
          })
          setTimeout(function(e){
            wx.navigateBack({
              delta: 1,
            })
          },800)
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
      var that = this;
      var url = app.globalData.host + '/customer/saveCustomer';
      let data = {
        id: app.globalData.user_id,
        userPhone:that.data.user_phone,
        useLevel:'',
        age:that.data.age?that.data.age:'',
        userType:'',
        userRealName:that.data.user_real_name,
        userIntention:that.data.countryIndex,
        userBudget:that.data.user_budget,
        userStatus:that.data.countryIndex1?that.data.countryIndex1:'',
        userComment:that.data.user_comment,
        paymentMethod:that.data.countryIndex3,
        receptionist:that.data.receptionist?that.data.receptionist:'',
        startingTime:that.data.qidate_time?that.data.qidate_time:'',
        leaseTerm:that.data.countryIndex2?that.data.countryIndex2:'',
        recivDate:that.data.date_time?that.data.date_time:'',
        companyId: that.data.companyId,
        userSex:that.data.countryIndex4,
        intention:that.data.biaolist_list,
        recommender:that.data.recommender
      };
      console.log(data)
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        if (res.success) {
          wx.showToast({
            title: '提交成功',
          })
          setTimeout(function(e){
            wx.navigateBack({
              delta: 1,
            })
          },800)
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
    }

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
  pickerProChangef4: function (e) {
    this.setData({ countryIndex4: e.detail.value });
    console.log(this.data.countryIndex4)
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