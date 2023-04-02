// pages/person/person.js
Page({
  dz: function() {
    wx.navigateTo({
      url: '/pages/xxjm/dz/dz',
    })
  },

  sc: function() {
    wx.navigateTo({
      url: '/pages/xxjm/sc/sc',
    })
  },

  yszczy: function() {
    wx.navigateTo({
      url: '/pages/xxjm/yszczy/yszczy',
    })
  },

  qsnshms: function() {
    wx.navigateTo({
      url: '/pages/xxjm/yszczy/yszczy',
    })
  },

  qxsq: function() {
    wx.navigateTo({
      url: '/pages/xxjm/qxsq/qxsq',
    })
  },

  sz: function() {
    wx.navigateTo({
      url: '/pages/xxjm/sz/sz',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    messageList:[
      '欢迎来到C KX的微信小程序',
      '此处可以插播一条广告',
    ]
  },
  onLoad(){
    let user=wx.getStorageSync('user')
    console.log('进入小程序的页面获取缓存',user)
    this.setData({
      userInfo:user
    })
  },
  //授权登录
  login(){
    wx.getUserProfile({
      desc: '用于完善会员资料',//声明获取用户个人信息后的用途，后续会展示在弹窗中
      success:res =>{
        let user = res.userInfo
        //把用户信息缓存到本地
        wx.setStorageSync('user', user)
        console.log("用户信息",user)
        this.setData({
          userInfo:user
        })
      },
      fail: res=>{
        console.log('授权失败',res)
      }
    })
  },
  //退出登录
  loginOut(){
    this.setData({
      userInfo:''
    })
    wx.setStorageSync('user', null)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})