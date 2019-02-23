// pages/editContact/editContact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      contactListL:[],
      name:'',
      mobile :''
  },
  bindname: function (e) {
    this.setData({
      name: e.detail.value,
    })
  },
  bindmobile: function (e) {
    this.setData({
      mobile: e.detail.value,
    })
  },
  addContact:function(){
    var _this=this
    wx.request({
      url: 'https://whyx.siancms.cn/wx/Contacts/ct',
      data:{
        openid:wx.getStorageSync('openId'),
        name:this.data.name,
        mobile: this.data.mobile
      },
      success(res){
        console.log(res.data)
        _this.setData({
          name:'',
          mobile:''
        })
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000,
          success(){
            setTimeout(()=>{
              wx.navigateBack()
            },2000)
          }
        });
      }
    })
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