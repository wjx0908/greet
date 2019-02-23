const app = getApp()
const date = new Date()
const months = []
const days = []
let n=0
for (let i = 1; i <= 12; i++) {
  months.push(i)
}
for (let i = 1; i <= 31; i++) {
  days.push(i)
}
// pages/dzwh/dzwh.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    
    time: "12:00",
    months: months,
    month: 1,
    m: 1,
    days: days,
    day: 1,
    d: 1,
    value: [0, 0],
    hide: true,
    toDoList: [],
    words:'',
    num:0,
    phoneNums:'',
    nums: [],
    i: 0
  },
  bindTextAreaBlur: function (e) {
    var num = e.detail.value.length
    this.setData({
      words: e.detail.value,
      num: num
    })
  },
  openConfirm: function (e) {
    var id = e.currentTarget.id
    var _this=this
    wx.showModal({
      title: '删除问候',
      content: '你确定要删除定制的问候吗？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          var newArry = _this.removeByVal(_this.data.toDoList, id)
          _this.setData({
            toDoList: newArry
          })
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },
  addList: function () {
    var arr = this.data.phoneNums.split(','), arr2 = this.data.nums
    arr2.push(arr.length)
    console.log(arr2)
    this.setData({
      nums: arr2
    })
    var time = this.data.time
    var list = this.data.toDoList
    var mon,da
    mon = this.data.month;
    da = this.data.day;
    if(mon<10){
      mon="0"+mon
    }
    if(da<10){
      da = "0" + da
    }
    var date = mon + '月' + da + '日'
    console.log(date)
    var listItem = {}
    listItem.time = time
    listItem.date = date
    listItem.id = n;
    n++;
    listItem.words = this.data.words
    listItem.phoneNums = this.data.phoneNums
    //如果value为空弹出提示
    if (this.data.words == "" || this.data.phoneNums == "") {
      wx.showModal({
        content: '请输入你想要发送的内容',
        showCancel: false,
        success: function (res) {
        }
      });
    } else {
      console.log(listItem)
      list.push(listItem)
      this.setData({
        toDoList: list,
        words: "",
        num: 0,
        month:1,
        day:1,
        time:"12:00"
      })
    }
  },
  subLists: function () {
    //求和计算发送短信条数
    var n = this.sum(this.data.nums)
    // console.log(n)
    this.setData({
      i: n
    })
    var _this = this
    //发送提示
    //如果为空，则弹出提示
    if (this.data.toDoList.length == 0) {
      wx.showModal({
        content: '请您至少输入一个定制方案',
        showCancel: false,
        success: function (res) {}
      });
    } else {
      //弹出充值提示
      wx.showModal({
        title: '友情提示',
        content: '本方案365天内预计发送' + this.data.i +'条短信，当前帐户余额可发送12条，帐户余额不足会导致信息发送不成功',
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
      wx.removeStorage({
        key: 'yearphone'
        
      })
      var lists = this.data.toDoList
      console.log(lists)
      //发送请求
      wx.request({
        url: 'https://whyx.siancms.cn/wx/Year/ye',
        data: {
          list: lists,
          openid: wx.getStorageSync('openId')//直接获取同步储存的openId
        },
        success: function (res) {
          console.log(res)
        }
      })
      //让文字全部为空
      this.setData({
        time:"12:00",
        month:1,
        day:1,
        phoneNums: '',
        words: "",
        num: 0,
        toDoList: [],
        i:0
      })
      n = 0
    }
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
    var _this = this
    wx.getStorage({
      key: 'yearphone',
      success: function (res) {
        // console.log(res.data)
        _this.setData({
          phoneNums: res.data
        })
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
    wx.removeStorage({ key: 'yearphone' });
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
  open: function () {
    var hide = this.data.hide
    if (!hide) {
      hide = !hide
    } else {
      hide = false
    }
    this.setData({
      hide: hide,

    })
  },
  taphide: function () {
    var hide = this.data.hide
    if (!hide) {
      hide = !hide
    } else {
      hide = false
    }
    console.log(hide)

    this.setData({
      hide: hide,
      month: this.data.m,
      day: this.data.d
      
    })
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      // year: this.data.years[val[0]],
      m: this.data.months[val[0]],
      d: this.data.days[val[1]]
    })
  },
  
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  removeByVal: function (array, val) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].id == val) {
        array.splice(i, 1);
        return array

      }
    }
  },
  sum: function (arr) {
    var s = 0;
    for (var i = arr.length - 1; i >= 0; i--) {
      s += arr[i];
    }
    return s;
  }
})