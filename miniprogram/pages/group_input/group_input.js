Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  loginForm: function(data) {
    console.log(data.detail.value)
    console.log("加入群聊")
    var groupID = data.detail.value;
    //将输入的编号写入缓存
    wx.setStorageSync('userGroup', data.detail.value)
    //在user表中加入团队编号
      wx.cloud.callFunction({
      name:'addGroupid',
      data: groupID,
      success:function(res){
      console.log(res)
              },
        fail:function(res){
          console.log(res)
        }
            })
      //将成员信息更新到group表
      wx.cloud.callFunction({
      name:'groupUpdate',
      data: groupID,
      success:function(res){
      console.log(res)
      wx.showToast({
        title: '加入群聊成功',
      })
        },
        fail:function(res){
          console.log(res)
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