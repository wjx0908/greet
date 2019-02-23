// pages/year/phone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    phoneNums:''
  },
  bindTextAreaBlur: function (e) {
    var num = e.detail.value.toString().length
    this.setData({
      phoneNums: e.detail.value,
      num: num
    })
  },    
  toPage: function () {
    if (this.data.id == 0) {
      wx.setStorage({
        key: 'yearphone',
        data: this.data.phoneNums,
      })
    }
    if (this.data.id == 1) {
      wx.setStorage({
        key: 'monthphone',
        data: this.data.phoneNums,
      })
    }
    if(this.data.id==2){
      wx.setStorage({
        key: 'weekphone',
        data: this.data.phoneNums,
      })
    }
    if (this.data.id == 3) {
      wx.setStorage({
        key: 'dayPhone',
        data: this.data.phoneNums,
      })
    }
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id)
    this.setData({
      id: options.id,
    })
   
    
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
    var _this=this
    if (this.data.id == 3) {
      wx.getStorage({
        key: 'dayPhone',
        success: function (res) {
          _this.setData({
            phoneNums: res.data,
          })
        },
      })
    }
    if (this.data.id == 2) {
      wx.getStorage({
        key: 'weekphone',
        success: function (res) {
          _this.setData({
            phoneNums: res.data,
          })
        },
      })
    }
    if (this.data.id == 1) {
      wx.getStorage({
        key: 'monthphone',
        success: function (res) {
          _this.setData({
            phoneNums: res.data,
          })
        },
      })
    }
    if (this.data.id == 0) {
      wx.getStorage({
        key: 'yearphone',
        success: function (res) {
          _this.setData({
            phoneNums: res.data,
          })
        },
      })
    }
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