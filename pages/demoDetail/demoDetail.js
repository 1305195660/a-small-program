Page({
  data: {
    id: '',
    show:'',
    show1: '',
    shouchangUrl1: "/images/zhenrong/shoucang.png ",
    dianzanUrl1:"/images/zhenrong/dianzan.png",
    xuhao: '',
    shoucang: [],
    dianzan:[]
  },

  onLoad: function (e) {
    this.setData({
      _id: e.id
    })
    var id = e.id;
    wx.cloud.database().collection('zhenrong').doc(id).get().then(res => {
      console.log('收藏内容', res.data.shoucang)
      console.log('点赞内容', res.data.dianzan)
      this.setData({
        shoucang: res.data.shoucang,
        dianzan:res.data.dianzan,
        detail: res.data,
        id: res.data._id
      })
      wx.cloud.callFunction({
        name: 'logins', //云函数名称 
        complete: res => {
          console.log("用户的openid", res.result.openid)
          var shoucang = this.data.shoucang;
          var dianzan = this.data.dianzan;
          var openid = res.result.openid;
          if (shoucang.indexOf(openid) > -1) {
            this.setData({
              shouchangUrl1: "/images/zhenrong/shoucang1.png",
              show1: 1
              
            })

            console.log('收藏存在')
          } else {
            this.setData({
              shouchangUrl1: "/images/zhenrong/shoucang.png",
              show1: 0
            })
            console.log('收藏不存在')
          }

          if (dianzan.indexOf(openid) > -1) {
            this.setData({
              dianzanUrl1: "/images/zhenrong/dianzan1.png",
              show: 1
              
            })

            console.log('已点赞')
          } else {
            this.setData({
              dianzanUrl1: "/images/zhenrong/dianzan.png",
              show: 0
            })
            console.log('未点赞')
          }
        }
      })
    })
  },




  //收藏
  clickMe1() {
    if (this.data.show1 == 0) {
      wx.cloud.callFunction({
        name: 'logins', //云函数名称 
        complete: res => {
          console.log(res.result.openid)
          var openid = res.result.openid;
          var xuhao = this.data._id;
          const _ = wx.cloud.database().command
          wx.cloud.database().collection('zhenrong').doc(xuhao).update({
            data: {
              shoucang: _.addToSet(openid)
            }

          })
        }
      })
      this.setData({
        shouchangUrl1: "/images/zhenrong/shoucang1.png",
        show1: 1
      })
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 2000
      })
    } else {

      wx.cloud.callFunction({
        name: 'logins',
        complete: res => {
          console.log('云函数获取到的openid: ', res.result.openid)
          var openid = res.result.openid;
          var xuhao = this.data._id
          var _ = wx.cloud.database().command
          wx.cloud.database().collection('zhenrong').doc(xuhao).update({
            data: {
              shoucang: _.pull(openid)
            }
          })
        }
      })

      this.setData({
        shouchangUrl1: "/images/zhenrong/shoucang.png",
        show1: 0
      })

      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        duration: 2000
      })

    }
  },

//点赞
  clickMe2() {
    if (this.data.show == 0) {
      wx.cloud.callFunction({
        name: 'logins', //云函数名称 
        complete: res => {
          console.log(res.result.openid)
          var openid = res.result.openid;
          var xuhao = this.data._id;
          const _ = wx.cloud.database().command
          wx.cloud.database().collection('zhenrong').doc(xuhao).update({
            data: {
              dianzan: _.addToSet(openid)
            }

          })
        }
      })
      this.setData({
        dianzanUrl1: "/images/zhenrong/dianzan1.png",
        show: 1
      })
      wx.showToast({
        title: '点赞成功',
        icon: 'success',
        duration: 2000
      })
    } else {

      wx.cloud.callFunction({
        name: 'logins',
        complete: res => {
          console.log('云函数获取到的openid: ', res.result.openid)
          var openid = res.result.openid;
          var xuhao = this.data._id
          var _ = wx.cloud.database().command
          wx.cloud.database().collection('zhenrong').doc(xuhao).update({
            data: {
              dianzan: _.pull(openid)
            }
          })
        }
      })

      this.setData({
        dianzanUrl1: "/images/zhenrong/dianzan.png",
        show: 0
      })

      wx.showToast({
        title: '取消点赞',
        icon: 'success',
        duration: 2000
      })

    }
  },


})