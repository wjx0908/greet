// pages/chooseDate/chooseDate.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["阳历", "阴历"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    dataList: [
      { id: 0, dataName: '春节' },
      { id: 1, dataName: '国庆节' },
      { id: 2, dataName: '劳动节' },
      { id: 3, dataName: '情人节' },
      { id: 4, dataName: '端午节' },
      { id: 5, dataName: '中秋节' },
      { id: 6, dataName: '劳动节' },
      { id: 7, dataName: '情人节' },
      { id: 8, dataName: '中秋节' },
    ]
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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