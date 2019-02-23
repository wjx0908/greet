
// pages/dzwh/dzwh.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    months: ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日', '21日', '22日', '23日', '24日', '25日', '26日', '27日', '28日', '29日', '30日', '31日'],
    index:0,
    time: "12:00",
    val:'',
    list: [],
    cont: '',
    length: 0,
    openId:'',
    num:[],
    n:0
  },
  watchPassWord: function (event) {
    this.setData({
      length: event.detail.value.length,
      cont: event.detail.value
    })
  },  
  openToast: function () {
    //求和计算发送短信条数
    var n = this.sum(this.data.num)
    // console.log(n)
    this.setData({
      n: n * 12
    })
    var _this=this;
    var list=_this.data.list;
    if(list.length==0){
      wx.showModal({
        content: '请您至少输入一个定制方案',
        showCancel: false,
        success: function (res) {
        }
      });
      return false;
    }
    //弹出充值提示
    wx.showModal({
      title: '友情提示',
      content: '本方案365天内预计发送'+this.data.n+'条短信，当前帐户余额可发送12条，帐户余额不足会导致信息发送不成功',
      confirmText: "立即充值",
      cancelText: "稍后充值",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          wx.redirectTo({
            url: '../recharge/recharge',
          })
        } else {
          wx.showToast({
            title: '已加入发送列队',
            icon: 'success',
            duration: 2000,
            success: function () {
              setTimeout(function () {
                wx.switchTab({
                  url: '../release/release',
                })
              }, 2000)
            }
          });
        }
      }
    });
    //清除号码缓存
    wx.removeStorage({key:'monthphone'});
   
    //发送请求
    wx.request({
      url: 'https://whyx.siancms.cn/wx/month/Mt',
      data: {
        list: list,
        openid: wx.getStorageSync('openId')//直接获取同步储存的openId
      },
      success: function (res) {
        console.log(res)
      }
    })
    //让文字全部为空
    this.setData({
      index: 0,
      time: "12:00",
      val: '',
      list: [],
      cont: '',
      length: 0,
      n:0
    })
  },
  openConfirm: function (e) {
    var index = e.currentTarget.dataset.index;
    var _this=this;
    wx.showModal({
      title: '删除问候',
      content: '你确定要删除定制的问候吗？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          var newArry = _this.data.list;
          newArry.splice(index, 1);
          _this.setData({
            list: newArry
          })
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },
  bindmonthChange:function(e){
    this.setData({
      index: e.detail.value
    })
  },
 
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  }, 
  submit: function () {
    var that = this;
    var month = that.data.index;
    var d, a = {};
    d = that.data.months;
    var time = that.data.time;
    var cont = that.data.cont;
    var val=that.data.val;
    var monthIndex=that.data.index;
    var length = that.data.length;
    var array = that.data.list;
    if(cont==''){
      wx.showModal({
        content: '请输入你想要发送的内容',
        showCancel: false,
        success: function (res) {
        }
      });
      return false;
    }
    if (val == '') {
      wx.showModal({
        content: '请输入你想要发送的手机号码',
        showCancel: false,
        success: function (res) {
        }
      });
      return false;
    }
    a.time = time;
    a.cont = cont;
    a.month = d[month];
    a.phone = val;
    a.monthIndex = monthIndex;
    a.length = length;
    array.push(a);
    var arr = val.split(','), arr2 = this.data.num
    arr2.push(arr.length)
    console.log(arr2)
    that.setData({
      num:arr2,
      list: array,
      cont:'',
      index:0,
      length:0,
      time:'12:00'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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
    var _this = this;
    wx.getStorage({
      key: 'monthphone',
      success: function (res) {
        _this.setData({
          val: res.data
        });
      },
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
    wx.removeStorage({key:'monthphone'});
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
  sum: function (arr) {
    var s = 0;
    for (var i = arr.length - 1; i >= 0; i--) {
      s += arr[i];
    }
    return s;
  }
})