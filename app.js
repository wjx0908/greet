//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // // 登录
    // this.getOpenId()
    // this.getUserInfo()
    // 获取用户信息
    wx.getSetting({
      success: res => {
       
      }
    })
  },
  // getOpenId: function (cb) {
  //   var that = this
  //   if (this.globalData.openid) {
  //     typeof cb == "function" && cb(this.globalData.openid)
  //   } else {
  //     wx.login({
  //       success: function (res) {
  //         // console.log(res.code);//(1)如果登录成功打印code值
  //         if (res.code) {
  //           //发起网络请求
  //           wx.request({
  //             url: 'https://whyx.siancms.cn/index.php/wx/Wechat/auth',
  //             data: {
  //               code: res.code//将code值传入php中
  //             },
  //             success: function (result) {
  //               console.log(result);//传入成功code值返回过来
  //               var res = result.data.data
  //               that.globalData.openid = res.openid
  //               that.globalData.session_key = res.session_key

  //               typeof cb == "function" && cb(that.globalData.openid);
  //               typeof cb == "function" && cb(that.globalData.session_key);
  //             }
  //           })
  //         } else {
  //           conso1e.log('获取用户登录态失败!' + res.errM3g)
  //         }
  //       }
  //     });
  //   }
  // },
  // getUserInfo: function (cb) {
  //   var that = this
  //   if (this.globalData.userInfo) {
  //     typeof cb == "function" && cb(this.globalData.userInfo)
  //   } else {
  //     //调用登录接口
  //     wx.login({
  //       success: function () {
  //         wx.getUserInfo({
  //           success: function (res) {
  //             console.log(res)
  //             var userInfo = res.userInfo
  //             that.globalData.userInfo = res.userInfo;
  //             typeof cb == "function" && cb(that.globalData.userInfo);
  //           }
  //         })
  //       }
  //     })
  //   }
  // },
  globalData: {
    userInfo: null
  }
})