// pages/xxjm/sc/sc.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    shou: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.cloud.callFunction({
      name: 'logins',
      complete: res => {
        console.log('云函数获取到的openid: ', res.result.openid)
        var openid = res.result.openid;
        const db = wx.cloud.database()
        db.collection('zhenrong').where({
          shoucang: openid
        }).get({
          success: res => {
            console.log(res.data[0]);
            this.setData({
              shou: res.data
            })
          }
        })
      }
    })
  },

  goDetail(res) {
    console.log('点击了',res.currentTarget.dataset.item)
    let id = res.currentTarget.dataset.item._id
    wx.navigateTo({
      url: '/pages/demoDetail/demoDetail?id=' + id,
    })
  },
})