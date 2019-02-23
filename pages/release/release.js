// pages/release/release.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["已处理", "等待发送"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    sendList:[],
    waitList: [],
    id:0,
   
  },
  
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  waitToggle: function (e) {

    var id = e.currentTarget.id, list = this.data.waitList;
    // console.log(e)
    for (var i = 0, len = list.length; i < len; i++) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    console.log(list)
    this.setData({
      waitList: list
    });
  },
  listToggle: function (e) {
    
    var id = e.currentTarget.id, list = this.data.sendList;
    // console.log(list[0].open)
    for (var i = 0, len = list.length; i < len; i++) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    // console.log(list)
    this.setData({
      sendList: list
    });
  },
  openDeletConfirm: function (e) {
    var _this = this    
    var id = e.currentTarget.dataset.id, list = this.data.sendList, index = e.currentTarget.dataset.index
    wx.showModal({
      title: '删除记录',
      content: '你确定要删除这条记录吗？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          wx.request({
            url: 'https://whyx.siancms.cn/wx/Del/de',
            data: {
              id: id
            },
            success(res) {
              list.splice(index, 1);
              _this.setData({
                sendList: list
              })
            }

          })
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },
  openCancelConfirm: function (e) {
    console.log(e)
    var _this=this
    var id = e.currentTarget.dataset.id, list = this.data.waitList, index = e.currentTarget.dataset.index
   
    wx.showModal({
      title: '取消发送',
      content: '你确定要取消发送吗？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(_this.data.id)
        if (res.confirm) {
          wx.request({
            url: 'https://whyx.siancms.cn/wx/Cancel/ca',
            data:{
              id:id
            },
            success(res){
             list.splice(index,1);
             _this.setData({
               waitList:list
             })
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
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
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
    var _this=this
    wx.request({
      url: 'https://whyx.siancms.cn/wx/Wait/wa',
      data: {
        openid: wx.getStorageSync('openId')//直接获取同步储存的openId
      },
      success(res) {
        // console.log(res.data.data)

        _this.setData({
          waitList: res.data.data
        })
      }
    })
    wx.request({
      url: 'https://whyx.siancms.cn/wx/Send/se',
      data: {
        openid: wx.getStorageSync('openId')//直接获取同步储存的openId
      },
      success(res) {
        console.log(res.data.data)
        _this.setData({
          sendList: res.data.data
        })
      }
    })
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
  
  },
 
})