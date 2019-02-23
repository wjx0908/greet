// pages/loading/loading.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
   
    wx.login({
      success: function (res) {
        var code = res.code;
        wx.request({
          url: 'https://whyx.siancms.cn/index.php/wx/Wechat/auth',
          data: {
            "code": code,
            "encryptedData": e.detail.encryptedData,
            "iv": e.detail.iv
          },
          success: function (res) {
            console.log(res)
            var nickname = res.data.nickname, sex = res.data.sex, avatar = res.data.image, openId = res.data.openid
            console.log(openId)
            //储存用户信息
            wx.setStorage({
              key: 'nickname',
              data: nickname,
            })
            wx.setStorage({
              key: 'sex',
              data: sex,
            })
            wx.setStorage({
              key: 'avatar',
              data: avatar,
            })
            //储存用户openId
            wx.setStorageSync('openId',openId)
            //判断是否授权
            wx.getSetting({
              success(res) {
                if (res.authSetting['scope.userInfo']) {
                  
                  wx.authorize({
                    scope: 'scope.userInfo',
                    success() {
                     
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 2000,
                        success() {
                          setTimeout(() => {
                            wx.switchTab({
                              url: '../index/index',
                            })
                          }, 2000)
                        }
                      });
                    }
                  })
                }
              }
            })
            
          }
        })
      }
    });
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