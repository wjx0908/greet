//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  tonow: function () {
    wx.navigateTo({
      url: '../greetNow/greetNow',
    })
  },
  toyear: function () {
    wx.navigateTo({
      url: '../year/year',
    })
  },
  tomonth: function () {
    wx.navigateTo({
      url: '../month/month',
    })

  },
  toweek: function () {
    wx.navigateTo({
      url: '../week/week',
    })
  },
  today: function () {
    wx.navigateTo({
      url: '../day/day',
    })
  },

  onLoad: function () {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.redirectTo({
            url: '../loading/loading',
          })
        }
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

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
            var nickname = res.data.nickname, sex = res.data.sex, avatar = res.data.image
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
          }
        })
      }
    });
  }

})
