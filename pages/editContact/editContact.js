// pages/editContact/editContact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    mobile: '',
    id: 0
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
  edit:function(){
    var _this = this
    wx.showModal({
      title: '修改联系人',
      content: '你确定要修改吗？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          wx.request({
            url: 'https://whyx.siancms.cn/wx/Contacts/edit',
            data: {
              id: _this.data.id,
              name: _this.data.name,
              mobile: _this.data.mobile,
            },
            success(res) {
              console.log(res.data)
              wx.showToast({
                title: res.data.msg,
                icon: 'success',
                duration: 2000,
                success() {
                  setTimeout(() => {
                    wx.navigateBack()
                  }, 2000)

                }
              });
            }
          })
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },
  openDeletConfirm: function (e) {
    var _this = this
    wx.showModal({
      title: '删除联系人',
      content: '你确定要删除该联系人吗？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          wx.request({
            url: 'https://whyx.siancms.cn/wx/Contacts/del',
            data: {
              id: _this.data.id
            },
            success(res) {
              console.log(res.data)
              wx.showToast({
                title: res.data.msg,
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
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    console.log(options.id)
    wx.request({
      url: 'https://whyx.siancms.cn/wx/Contacts/look?id=' + options.id,
      success(res) {
        console.log(res.data.data)
        _this.setData({
          name: res.data.data.name,
          mobile: res.data.data.mobile,
          id: res.data.data.id
        })
      }
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