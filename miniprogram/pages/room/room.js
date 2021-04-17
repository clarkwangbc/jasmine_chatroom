const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: null,
    logged: false,
    takeSession: false,
    requestResult: '',
    // chatRoomEnvId: 'release-f8415a',
    chatRoomCollection: 'chatroom',
    chatRoomGroupId: 'demo',
    chatRoomGroupName: '聊天室',
 
    // functions for used in chatroom components
    onGetUserInfo: null,
    getOpenID: null
    },


  onLoad: function() {
    var userGroup = wx.getStorageSync("userGroup")
    console.log("打印userGroup")
    console.log(userGroup)
    if (userGroup=='') {
    var that=this;
    wx.cloud.callFunction({
      name:'getGroupid',
      data: {},
      success:function(res){
      console.log("写入导航栏")
      that.setData({navbarData:{showCapsule: 1,title:res.result.data.groupID}})
    //将团队编号写入缓存
    wx.setStorageSync('userGroup', res.result.data.groupID)
        },
        fail:function(res){
          console.log(res)
        }
            }) 
          }
          else{
            this.setData({navbarData:{showCapsule: 1,title:userGroup}})
          }
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })

    this.setData({
      onGetUserInfo: this.onGetUserInfo,
      getOpenID: this.getOpenID,
    })

    wx.getSystemInfo({
      success: res => {
        console.log('system info', res)
        if (res.safeArea) {
          const { top, bottom } = res.safeArea
          this.setData({
            containerStyle: `padding-top: ${(/ios/i.test(res.system) ? 10 : 20) + top}px; padding-bottom: ${20 + res.windowHeight - bottom}px`,
          })
        }
      },
    })
  },

  getOpenID: async function() {
    if (this.openid) {
      return this.openid
    }

    const { result } = await wx.cloud.callFunction({
      name: 'login',
    })

    return result.openid
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onShareAppMessage() {
    return {
      title: '即时通信 Demo',
      path: '/pages/im/room/room',
    }
  },
})
//zhu

