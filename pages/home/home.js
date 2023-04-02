var that
Page({
  ss: function() {
    wx.navigateTo({
      url: '/pages/ss/ss',
    })
  },
    data: {
      item: 0,
      tab: 0,

        imgUrl:[
            '/images/haibao/1.jpg',
            '/images/haibao/2.jpg',
            '/images/haibao/3.jpg',
            '/images/haibao/4.jpg',
        ],
        list:[],

        autoplay: false, 
        circular: true, 
        indicatorDots: true,
        scrollTop: '', 
        navFixed: false, 
        currentData: 0,
    },

      // 页面切换
  changeItem: function(e) {
    this.setData({
      item: e.target.dataset.item,
    })
  },
  
  // tab切换
  changeTab: function(e) {
    this.setData({
      tab: e.detail.current
    })
  },

  goDetail(res) {
    console.log('点击了',res.currentTarget.dataset.item)
    let id = res.currentTarget.dataset.item._id
    wx.navigateTo({
      url: '/pages/zixunnext/zixunnext?id=' + id,
    })
  },

  onLoad:function(options) {
    wx.cloud.init()
    wx.cloud.database().collection("zixun").where({
      'classification': 'zx'
    }).get()
    .then(res=>{
      console.log('资讯列表',res.data)
      this.setData({
        zxlist:res.data
      })
    })


    wx.cloud.database().collection("zixun").where({
      'classification': 'gg'
    }).get()
    .then(res=>{
      console.log('公告列表',res.data)
      this.setData({
        gglist:res.data
      })
    })



  },




})
