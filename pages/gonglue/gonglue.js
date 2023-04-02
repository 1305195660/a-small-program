// pages/gonglue/gonglue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //模糊搜索返回的数组
    resultArr: [],
    //输入框的值
    inputValue: ''
  },

  goDetail(res) {
    console.log('点击了',res.currentTarget.dataset.item)
    let id = res.currentTarget.dataset.item._id
    wx.navigateTo({
      url: '/pages/demoDetail/demoDetail?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
    wx.cloud.init()
    wx.cloud.database().collection("zhenrong").get()
    .then(res=>{
      console.log('阵容列表',res.data)
      this.setData({
        list:res.data
      })
    })
  },

  monitorInput: function (e) {
    var inputValue = e.detail.value;
    if (inputValue == "") {
      this.setData({
        inputValue: '',
        resultArr: []
      })
    } else {
      this.setData({
        inputValue: inputValue
      })
      wx.cloud.init()
      const db = wx.cloud.database()
      db.collection('zhenrong').where({
        title: db.RegExp({
          regexp: inputValue,
          options: 'i',
        })
      }).get().then(res => {
        console.log(res)
        this.setData({
          resultArr: res.data,
        })
      })
    }

  },

  //输入框失去焦点时
  blurInput: function () {
    // console.log('失去焦点')
    if (this.data.inputValue == "") {
      this.setData({
        resultArr: [],
        inputValue: ''
      })
    }
  },
})