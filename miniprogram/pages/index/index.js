// 获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    motto: '欢迎参加实验！请选择您的组别类型：',
    userInfo: {},
    openid: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') ,// 如需尝试获取用户信息可改为false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function() {
    var userInfo = wx.getStorageSync("userInfo")
    console.log("打印userInfo")
    console.log(userInfo)
    if (userInfo=='') {
    wx.showModal({
      title: '温馨提示',
      content: '系统正在请求您的个人信息',
      success(res) {
        if (res.confirm) {
          wx.getUserProfile({
          desc: "获取你的昵称、头像、地区及性别",
          success: res => {
            console.log(res)
            wx.showToast({
              title: '登陆成功',
            });
            wx.cloud.callFunction({
              name:'userLogin',
              data: res.userInfo,
              success:function(res){
                //写入缓存
                wx.setStorageSync('userInfo', res.result.data)
                console.log(res)
              }
            })
          },
          fail: res => {
             //拒绝授权
             wx.showToast({
               title: '您拒绝了系统的请求',
               icon:"none"
             })
            return;
          }
        })} else if (res.cancel) {
          //拒绝授权 showErrorModal是自定义的提示
          wx.showToast({
            title: '您拒绝了系统的请求',
            icon:"none"
          })
          return;
        }
      }
    })
  }
  else{
    wx.navigateTo({url: "../room/room" })
  }},

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
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