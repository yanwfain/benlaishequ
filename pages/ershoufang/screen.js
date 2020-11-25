// pages/ershoufang/screen.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		listhu:[
			{
				name:'毛坯',
				id:1,
				chenkishow:false,
			},
			{
				name:'简装',
				id:2,
				chenkishow:false,
			},
			{
				name:'精装',
				id:3,
				chenkishow:false,
			},
		],
		listshe:[
			{
				name:'电视',
				id:1,
				chenkishow:false,
			},
			{
				name:'衣柜',
				id:2,
				chenkishow:false,
			},
			{
				name:'冰箱',
				id:3,
				chenkishow:false,
			},
			{
				name:'空调',
				id:4,
				chenkishow:false,
			},
			{
				name:'宽带',
				id:5,
				chenkishow:false,
			},
			{
				name:'床',
				id:6,
				chenkishow:false,
			},
			{
				name:'暖气',
				id:7,
				chenkishow:false,
			},
			{
				name:'热水器',
				id:8,
				chenkishow:false,
			},
			{
				name:'天然气',
				id:9,
				chenkishow:false,
			},
			{
				name:'洗衣机',
				id:10,
				chenkishow:false,
			},
		],
		listmian:[
			{
				name:'0-80',
				id:1,
				chenkishow:false,
			},
			{
				name:'80-120',
				id:2,
				chenkishow:false,
			},
			{
				name:'120-150',
				id:3,
				chenkishow:false,
			},
			{
				name:'150-200',
				id:4,
				chenkishow:false,
			},
			{
				name:'200-300',
				id:5,
				chenkishow:false,
			},
			{
				name:'300以上',
				id:6,
				chenkishow:false,
			},
		],
		listgong:[
			{
				name:'不限',
				id:0,
				chenkishow:false,
			},
			{
				name:'商品',
				id:1,
				chenkishow:false,
			},
			{
				name:'公房',
				id:2,
				chenkishow:false,
			},
			{
				name:'经适',
				id:3,
				chenkishow:false,
			},
			{
				name:'其他',
				id:4,
				chenkishow:false,
			}
		],
		listyong:[
		
			{
				name:'普通住宅',
				id:1,
				chenkishow:false,
			},
			{
				name:'商业',
				id:2,
				chenkishow:false,
			},
			{
				name:'别墅',
				id:3,
				chenkishow:false,
			},
			{
				name:'其他',
				id:4,
				chenkishow:false,
			}
		],
		listdian:[
		
			{
				name:'有',
				id:1,
				chenkishow:false,
			},
			{
				name:'无',
				id:2,
				chenkishow:false,
			}
		],
		classid:1
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			classid:options.classid
		})
	},
	changeDate(e) {
    console.log(e)
    this.setData({ date_time: e.detail.value });
  },
	chengecity:function(e){
		// if(this.data.classid==1){
		// 	wx.navigateTo({
		// 		url: '/pages/zufang/index',
		// 	})
		// }
		// if(this.data.classid==2){
		// 	wx.navigateTo({
		// 		url: '/pages/ershoufang/index',
		// 	})
		// }
    console.log(e)
    var that = this
    let pages = getCurrentPages(); //获取当前页面pages里的所有信息。
    let prevPage = pages[pages.length - 2]; //prevPage 是获取上一个页面的js里面的pages的所有信息。-2 是上一个页面，-3是上上个页面以此类推。                                                           
    prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
			classid:  e.currentTarget.dataset.text,
			list_gong:that.data.list_gong?that.data.list_gong:[],
			list_mian:that.data.list_mian?that.data.list_mian:[],
			list_hu:that.data.list_hu?that.data.list_hu:[],
			list_yong:that.data.list_yong?that.data.list_yong:[],
			list_she:that.data.list_she?that.data.list_she:[],
			list_dian:that.data.list_dian?that.data.list_dian:[],
			date_time:that.data.date_time?that.data.date_time:'',

			classid:that.data.classid
    })//上一个页面内执行setData操作，将我们想要的信息保存住。当我们返回去的时候，页面已经处理完毕。
    //最后就是返回上一个页面。
    wx.navigateBack({
      delta: 1,  // 返回上一级页面。
      success: function () {
        console.log('成功！')
      }
    })
  },
	clickFn:function(e){
		this.setData({
			classid:e.currentTarget.dataset.id
		})
		this.funlist()
	},
	default:function(e){
		this.funlist()
	},
	funlist:function(e){
		var listhu = this.data.listhu 
		var listmian = this.data.listmian
		var listgong = this.data.listgong
		var listyong = this.data.listyong
		var listdian = this.data.listdian
		var listshe = this.data.listshe
		for(var index in listhu){
				listhu[index].chenkishow = false
		}
		for(var index in listmian){
			listmian[index].chenkishow = false
		}
		for(var index in listgong){
			listgong[index].chenkishow = false
		}
		for(var index in listyong){
			listyong[index].chenkishow = false
		}
		for(var index in listdian){
			listdian[index].chenkishow = false
		}
		for(var index in listshe){
			listshe[index].chenkishow = false
		}
		this.setData({
			listhu:listhu,
			listmian:listmian,
			listgong:listgong,
			listyong:listyong,
			listdian:listdian,
			listshe:listshe,
			list_she:[],
			list_gong:[], //权属
			list_mian:[], // 面积
			list_hu:[], //装修
			list_yong:[],//用途
			list_dian:[], //电梯,
			date_time:''//入住时间
		})
	},
	// 装修
	huFn:function(e){
		var _index = e.currentTarget.dataset.index
		var listhu = this.data.listhu
		var list_hu = []
		for(var index in listhu){
			if(_index== index){
				listhu[index].chenkishow = listhu[index].chenkishow?false:true
			}
			if(listhu[index].chenkishow){
				list_hu.push(listhu[index].id)
			}
		}
		this.setData({
			listhu:listhu,
			list_hu:list_hu
		})
		console.log(list_hu)
	},
	sheFn:function(e){
		var _index = e.currentTarget.dataset.index
		var listshe = this.data.listshe
		var list_she = []
		for(var index in listshe){
			if(_index== index){
				listshe[index].chenkishow = listshe[index].chenkishow?false:true
			}
			if(listshe[index].chenkishow){
				list_she.push(listshe[index].id)
			}
		}
		this.setData({
			listshe:listshe,
			list_she:list_she
		})
	},
	// 面积
	mianFn:function(e){
		var _index = e.currentTarget.dataset.index
		var listmian = this.data.listmian
		var list_mian = []
		for(var index in listmian){
			if(_index== index){
				listmian[index].chenkishow = listmian[index].chenkishow?false:true
			}
			if(listmian[index].chenkishow){
				list_mian.push(listmian[index].id)
			}
		}
		this.setData({
			listmian:listmian,
			list_mian:list_mian
		})
		console.log(list_mian)
	},
	//权属
	gongFn:function(e){
		
		var _index = e.currentTarget.dataset.index
		var listgong = this.data.listgong
		var list_gong = []
		for(var index in listgong){
			if(_index==0){ 
					listgong[0].chenkishow = true
					if(listgong[0].chenkishow = true){
						listgong[index].chenkishow = false
					}
					this.setData({
						list_gong:[]
					})
				
			}else{
			
				if(_index== index){
					listgong[index].chenkishow = listgong[index].chenkishow?false:true
					listgong[0].chenkishow =false
				}
				if(listgong[index].chenkishow){
					list_gong.push(listgong[index].id)
				}
			}
		
		}
		this.setData({
			listgong:listgong,
			list_gong:list_gong
		})
		console.log(list_gong)
	},
	// 用途
	yongFn:function(e){
		var _index = e.currentTarget.dataset.index
		var listyong = this.data.listyong
		var list_yong = []
		for(var index in listyong){
			if(_index== index){
				listyong[index].chenkishow = listyong[index].chenkishow?false:true
			}
			if(listyong[index].chenkishow){
				list_yong.push(listyong[index].id)
			}
		}
		this.setData({
			listyong:listyong,
			list_yong:list_yong
		})
		console.log(list_yong)
	},
	// 电梯
	dianFn:function(e){
		var _index = e.currentTarget.dataset.index
		var listdian = this.data.listdian
		var list_dian = []
		for(var index in listdian){
			if(_index== index){
				listdian[index].chenkishow = listdian[index].chenkishow?false:true
			}
			if(listdian[index].chenkishow){
				list_dian.push(listdian[index].id)
			}
		}
		this.setData({
			listdian:listdian,
			list_dian:list_dian
		})
		console.log(list_dian)
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