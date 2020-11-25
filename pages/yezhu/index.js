// pages/yezhu/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tid:1,
    region:[],
    pickerProDataf: [
      {
        name: '请选择'
      },
      {
        name: '整租'
      },
      {
        name: '转租'
      },
      {
        name: '合租'
      },
    ],
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
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  clickFn:function(e){
    this.setData({
      tid:e.currentTarget.dataset.id
    })
  },
  community:function(e){
    this.setData({
      community:e.detail.value
    })
  },
  house_name:function(e){
    this.setData({
      house_name:e.detail.value
    })
  },
  amount:function(e){
    this.setData({
      amount:e.detail.value
    })
  },
  owner_name:function(e){
    this.setData({
      owner_name:e.detail.value
    })
  },
  owner_phone:function(e){
    this.setData({
      owner_phone:e.detail.value
    })
  },
  submit:function(e){
    if(this.data.tid==1){
      if(!this.data.region[0]){
        wx.showToast({
          title: '请选择城市',
          icon:'none'
        })
        return
      }
      if(!this.data.community){
        wx.showToast({
          title: '请输入所在小区',
          icon:'none'
        })
        return
      }
      if(!this.data.house_name){
        wx.showToast({
          title: '请输入门牌号',
          icon:'none'
        })
        return
      }
      if(!this.data.amount){
        wx.showToast({
          title: '请填写金额',
          icon:'none'
        })
        return
      }
      if(this.data.countryIndex==0){
        wx.showToast({
          title: '请选择出租方式',
          icon:'none'
        })
        return
      }
      if(!this.data.owner_name){
        wx.showToast({
          title: '请填写称呼',
          icon:'none'
        })
        return
      }
      if(!this.data.owner_phone){
        wx.showToast({
          title: '请填写联系方式',
          icon:'none'
        })
        return
      }
    
    }
    if(this.data.tid==2){
      if(!this.data.region[0]){
        wx.showToast({
          title: '请选择城市',
          icon:'none'
        })
        return
      }
      if(!this.data.community){
        wx.showToast({
          title: '请输入所在小区',
          icon:'none'
        })
        return
      }
      if(!this.data.house_name){
        wx.showToast({
          title: '请输入门牌号',
          icon:'none'
        })
        return
      }
      if(!this.data.amount){
        wx.showToast({
          title: '请填写金额',
          icon:'none'
        })
        return
      }

      if(!this.data.owner_name){
        wx.showToast({
          title: '请填写称呼',
          icon:'none'
        })
        return
      }
      if(!this.data.owner_phone){
        wx.showToast({
          title: '请填写联系方式',
          icon:'none'
        })
        return
      }
 
    }
 
    var that = this;
    var url = app.globalData.host + '/entrust/saveEntrust';
    if(this.data.tid==1){
    
      let data = {
        userId: app.globalData.user_id,
        city:this.data.region[0] + this.data.region[1] +this.data.region[2],
        businessType: this.data.tid,
        userId: app.globalData.user_id,
        community:this.data.community,
        house_name:this.data.house_name,
        amount:this.data.amount,
        lease_type:this.data.countryIndex,
        owner_name:this.data.owner_name,
        owner_phone:this.data.owner_phone
      };
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
    if(this.data.tid==2){
      let data = {
        userId: app.globalData.user_id,
        city:this.data.region[0] + this.data.region[1] +this.data.region[2],
        businessType: this.data.tid,
        userId: app.globalData.user_id,
        community:this.data.community,
        house_name:this.data.house_name,
        amount:this.data.amount*10000,
        owner_name:this.data.owner_name,
        owner_phone:this.data.owner_phone
      };
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